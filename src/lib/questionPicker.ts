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

  while (selected.length < desiredCount && shuffledGroups.some((group) => group.length > 0)) {
    for (const group of shuffledGroups) {
      if (selected.length >= desiredCount) {
        break
      }

      const question = group.shift()

      const questionTemplate = question && templateKey(question)
      if (
        question
        && questionTemplate
        && !usedIds.has(question.id)
        && !usedTemplateIds.has(questionTemplate)
      ) {
        selected.push(question)
        usedIds.add(question.id)
        usedTemplateIds.add(questionTemplate)
      }
    }
  }

  return selected
}
