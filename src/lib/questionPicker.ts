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

  return shuffle(test.questions, random).slice(0, desiredCount)
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
  const shuffledGroups = domainKeys.map((key) =>
    shuffle(groups[key], random).sort((left, right) => (left.difficulty || 3) - (right.difficulty || 3))
  )
  const selected: TestQuestion[] = []
  const usedIds = new Set<string>()

  while (selected.length < desiredCount && shuffledGroups.some((group) => group.length > 0)) {
    for (const group of shuffledGroups) {
      if (selected.length >= desiredCount) {
        break
      }

      const question = group.shift()

      if (question && !usedIds.has(question.id)) {
        selected.push(question)
        usedIds.add(question.id)
      }
    }
  }

  return selected
}
