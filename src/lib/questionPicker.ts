import type { TestDefinition, TestQuestion } from '../types/test'

export type RandomSource = () => number

const MAX_SELECTION_SEARCH_STATES = 50_000
const MAX_DOMAIN_QUOTA_CONFIGURATIONS = 512

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

export function compressSelectionCandidates(questions: TestQuestion[]): TestQuestion[] {
  const seenSignatures = new Set<string>()

  return questions.filter((question) => {
    const signature = JSON.stringify([
      templateKey(question),
      question.difficulty ?? null,
      question.domain ?? null
    ])
    if (seenSignatures.has(signature)) {
      return false
    }

    seenSignatures.add(signature)
    return true
  })
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
  const shuffledGroups = domainKeys.map((key) => (
    compressSelectionCandidates(shuffle(groups[key], random))
  ))

  const availableDifficultyCount = new Set(
    shuffledGroups
      .reduce<TestQuestion[]>((allQuestions, group) => allQuestions.concat(group), [])
      .map((question) => question.difficulty)
      .filter((difficulty): difficulty is NonNullable<TestQuestion['difficulty']> => (
        typeof difficulty === 'number' && Number.isInteger(difficulty)
      ))
  ).size
  const requiredDifficultyCount = Math.min(3, desiredCount, availableDifficultyCount)

  const quotaConfigurations = buildBalancedDomainQuotas(domainKeys.length, desiredCount)
  for (let difficultyTarget = requiredDifficultyCount; difficultyTarget >= 0; difficultyTarget -= 1) {
    for (const quotas of quotaConfigurations) {
      const selection = findConstrainedSelection(shuffledGroups, quotas, difficultyTarget)
      if (selection) {
        return selection
      }
    }
  }

  return selectBalancedFallback(shuffledGroups, desiredCount)
}

function buildBalancedDomainQuotas(domainCount: number, desiredCount: number): number[][] {
  const baseCount = Math.floor(desiredCount / domainCount)
  const extraCount = desiredCount % domainCount
  const quotas = Array.from({ length: domainCount }, () => baseCount)
  const configurations: number[][] = []

  function chooseExtraDomains(startIndex: number, remaining: number): void {
    if (configurations.length >= MAX_DOMAIN_QUOTA_CONFIGURATIONS) {
      return
    }
    if (remaining === 0) {
      configurations.push([...quotas])
      return
    }

    for (let index = startIndex; index <= domainCount - remaining; index += 1) {
      quotas[index] += 1
      chooseExtraDomains(index + 1, remaining - 1)
      quotas[index] -= 1
    }
  }

  chooseExtraDomains(0, extraCount)
  return configurations
}

function findConstrainedSelection(
  groups: TestQuestion[][],
  quotas: number[],
  difficultyTarget: number
): TestQuestion[] | undefined {
  const selected: TestQuestion[] = []
  const selectedDifficulties = new Set<number>()
  const usedIds = new Set<string>()
  const usedTemplateIds = new Set<string>()
  const remainingQuotas = [...quotas]
  const nextIndexes = groups.map(() => 0)
  const desiredCount = quotas.reduce((total, quota) => total + quota, 0)
  let visitedStates = 0

  function eligibleIndexes(groupIndex: number): number[] {
    const eligible: number[] = []
    for (let index = nextIndexes[groupIndex]; index < groups[groupIndex].length; index += 1) {
      const question = groups[groupIndex][index]
      if (!usedIds.has(question.id) && !usedTemplateIds.has(templateKey(question))) {
        eligible.push(index)
      }
    }
    return eligible
  }

  function search(): boolean {
    visitedStates += 1
    if (visitedStates > MAX_SELECTION_SEARCH_STATES) {
      return false
    }
    if (selected.length === desiredCount) {
      return selectedDifficulties.size >= difficultyTarget
    }

    const candidatesByGroup = groups.map((_, groupIndex) => (
      remainingQuotas[groupIndex] > 0 ? eligibleIndexes(groupIndex) : []
    ))
    for (let groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
      if (candidatesByGroup[groupIndex].length < remainingQuotas[groupIndex]) {
        return false
      }
    }

    const possibleDifficulties = new Set(selectedDifficulties)
    candidatesByGroup.forEach((candidateIndexes, groupIndex) => {
      candidateIndexes.forEach((candidateIndex) => {
        const difficulty = groups[groupIndex][candidateIndex].difficulty
        if (difficulty !== undefined) {
          possibleDifficulties.add(difficulty)
        }
      })
    })
    if (possibleDifficulties.size < difficultyTarget) {
      return false
    }

    const groupIndex = remainingQuotas
      .map((remaining, index) => ({ index, remaining, candidates: candidatesByGroup[index].length }))
      .filter(({ remaining }) => remaining > 0)
      .sort((left, right) => (
        left.candidates / left.remaining - right.candidates / right.remaining || left.index - right.index
      ))[0].index

    for (const candidateIndex of candidatesByGroup[groupIndex]) {
      const question = groups[groupIndex][candidateIndex]
      const templateId = templateKey(question)
      const previousNextIndex = nextIndexes[groupIndex]
      const previousDifficultyCount = question.difficulty === undefined
        ? 0
        : selected.filter((item) => item.difficulty === question.difficulty).length

      selected.push(question)
      usedIds.add(question.id)
      usedTemplateIds.add(templateId)
      if (question.difficulty !== undefined) {
        selectedDifficulties.add(question.difficulty)
      }
      remainingQuotas[groupIndex] -= 1
      nextIndexes[groupIndex] = candidateIndex + 1

      if (search()) {
        return true
      }

      selected.pop()
      usedIds.delete(question.id)
      usedTemplateIds.delete(templateId)
      if (question.difficulty !== undefined && previousDifficultyCount === 0) {
        selectedDifficulties.delete(question.difficulty)
      }
      remainingQuotas[groupIndex] += 1
      nextIndexes[groupIndex] = previousNextIndex
    }

    return false
  }

  return search() ? selected : undefined
}

function selectBalancedFallback(groups: TestQuestion[][], desiredCount: number): TestQuestion[] {
  const selected: TestQuestion[] = []
  const usedIds = new Set<string>()
  const usedTemplateIds = new Set<string>()
  const domainCounts = groups.map(() => 0)

  while (selected.length < desiredCount) {
    const groupIndexes = groups
      .map((_, index) => index)
      .sort((left, right) => domainCounts[left] - domainCounts[right] || left - right)
    let found = false

    for (const groupIndex of groupIndexes) {
      const questionIndex = groups[groupIndex].findIndex((question) => (
        !usedIds.has(question.id) && !usedTemplateIds.has(templateKey(question))
      ))
      if (questionIndex >= 0) {
        const [question] = groups[groupIndex].splice(questionIndex, 1)
        selected.push(question)
        usedIds.add(question.id)
        usedTemplateIds.add(templateKey(question))
        domainCounts[groupIndex] += 1
        found = true
        break
      }
    }

    if (!found) {
      break
    }
  }

  return selected
}
