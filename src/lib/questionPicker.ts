import type { TestDefinition, TestQuestion } from '../types/test'

export type RandomSource = () => number

export function selectQuestionsForRun(
  test: TestDefinition,
  random: RandomSource = Math.random
): TestQuestion[] {
  const desiredCount = Math.max(0, Math.min(test.questionCount, test.questions.length))
  const shuffled = [...test.questions]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }

  return shuffled.slice(0, desiredCount)
}
