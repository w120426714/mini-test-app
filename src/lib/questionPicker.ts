import type { TestDefinition, TestQuestion } from '../types/test'

export type RandomSource = () => number

export function selectQuestionsForRun(
  test: TestDefinition,
  random: RandomSource = Math.random
): TestQuestion[] {
  const desiredCount = Math.max(0, Math.min(test.questionCount, test.questions.length))
  const questionsWithDomains = test.questions.filter((question) => question.domain)

  if (questionsWithDomains.length > 0 && desiredCount > 1) {
    return selectBalancedQuestions(test.questions, desiredCount, random)
  }

  return selectUniqueTemplates(shuffle(test.questions, random), desiredCount)
}

function templateKey(question: TestQuestion): string {
  return question.templateId || question.id
}

function selectUniqueTemplates(questions: TestQuestion[], desiredCount: number): TestQuestion[] {
  const selected: TestQuestion[] = []
  const usedIds = new Set<string>()
  const usedTemplateIds = new Set<string>()

  for (const question of questions) {
    const templateId = templateKey(question)
    if (selected.length >= desiredCount) {
      break
    }
    if (!usedIds.has(question.id) && !usedTemplateIds.has(templateId)) {
      selected.push(question)
      usedIds.add(question.id)
      usedTemplateIds.add(templateId)
    }
  }

  return selected
}

function shuffle<T>(items: T[], random: RandomSource): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }

  return shuffled
}

function selectBalancedQuestions(
  questions: TestQuestion[],
  desiredCount: number,
  random: RandomSource
): TestQuestion[] {
  const groups = questions.reduce<Record<string, TestQuestion[]>>((acc, question) => {
    const key = question.domain || 'mixed'
    acc[key] = acc[key] || []
    acc[key].push(question)
    return acc
  }, {})

  const domainKeys = shuffle(Object.keys(groups), random)
  const shuffledGroups = domainKeys.map((key) => shuffle(groups[key], random))
  const selected: TestQuestion[] = []
  const usedIds = new Set<string>()
  const usedTemplateIds = new Set<string>()
  const domainCounts = domainKeys.map(() => 0)

  const difficultyOrder = shuffle(
    [...new Set(questions
      .map((question) => question.difficulty)
      .filter((difficulty): difficulty is NonNullable<TestQuestion['difficulty']> => (
        typeof difficulty === 'number' && Number.isInteger(difficulty)
      )))],
    random
  )
  const requiredDifficultyCount = Math.min(3, desiredCount, difficultyOrder.length)

  function acceptQuestion(question: TestQuestion, groupIndex: number): void {
    selected.push(question)
    usedIds.add(question.id)
    usedTemplateIds.add(templateKey(question))
    domainCounts[groupIndex] += 1
  }

  function findDifficultyRepresentatives(targetCount: number) {
    const representatives: Array<{ question: TestQuestion; groupIndex: number }> = []
    const representativeIds = new Set<string>()
    const representativeTemplates = new Set<string>()
    const representativeDomainCounts = domainKeys.map(() => 0)

    function search(difficultyIndex: number): boolean {
      if (representatives.length === targetCount) {
        return true
      }

      const needed = targetCount - representatives.length
      if (difficultyOrder.length - difficultyIndex < needed) {
        return false
      }

      const difficulty = difficultyOrder[difficultyIndex]
      const groupIndexes = shuffledGroups
        .map((_, index) => index)
        .sort((left, right) => (
          representativeDomainCounts[left] - representativeDomainCounts[right] || left - right
        ))

      for (const groupIndex of groupIndexes) {
        for (const question of shuffledGroups[groupIndex]) {
          const templateId = templateKey(question)
          if (
            question.difficulty !== difficulty
            || representativeIds.has(question.id)
            || representativeTemplates.has(templateId)
          ) {
            continue
          }

          representatives.push({ question, groupIndex })
          representativeIds.add(question.id)
          representativeTemplates.add(templateId)
          representativeDomainCounts[groupIndex] += 1

          if (search(difficultyIndex + 1)) {
            return true
          }

          representatives.pop()
          representativeIds.delete(question.id)
          representativeTemplates.delete(templateId)
          representativeDomainCounts[groupIndex] -= 1
        }
      }

      return search(difficultyIndex + 1)
    }

    return search(0) ? representatives : []
  }

  function takeQuestion(requiredDifficulty?: number): boolean {
    const groupIndexes = shuffledGroups
      .map((_, index) => index)
      .sort((left, right) => domainCounts[left] - domainCounts[right] || left - right)

    for (const groupIndex of groupIndexes) {
      const group = shuffledGroups[groupIndex]
      const questionIndex = group.findIndex((question) => {
        const templateId = templateKey(question)
        return (requiredDifficulty === undefined || question.difficulty === requiredDifficulty)
          && !usedIds.has(question.id)
          && !usedTemplateIds.has(templateId)
      })

      if (questionIndex >= 0) {
        const [question] = group.splice(questionIndex, 1)
        acceptQuestion(question, groupIndex)
        return true
      }
    }

    return false
  }

  let difficultyRepresentatives: Array<{ question: TestQuestion; groupIndex: number }> = []
  for (let targetCount = requiredDifficultyCount; targetCount > 0; targetCount -= 1) {
    difficultyRepresentatives = findDifficultyRepresentatives(targetCount)
    if (difficultyRepresentatives.length > 0) {
      break
    }
  }

  for (const { question, groupIndex } of difficultyRepresentatives) {
    const questionIndex = shuffledGroups[groupIndex].indexOf(question)
    shuffledGroups[groupIndex].splice(questionIndex, 1)
    acceptQuestion(question, groupIndex)
  }

  while (selected.length < desiredCount && takeQuestion()) {
    // Selection happens in takeQuestion; loop only fills the remaining slots.
  }

  return selected
}
