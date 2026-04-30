import type { TestDefinition, TestHistoryItem } from '../types/test'

export interface ScoreResult {
  score: number
  dimensionScores: Record<string, number>
}

export type AnswerMap = Record<string, string>

export function calculateScore(test: TestDefinition, answers: AnswerMap): ScoreResult {
  const dimensionScores = test.dimensions.reduce<Record<string, number>>((acc, dimension) => {
    acc[dimension.key] = 0
    return acc
  }, {})

  for (const question of test.questions) {
    const selectedOptionId = answers[question.id]
    const selectedOption = question.options.find((option) => option.id === selectedOptionId)

    if (!selectedOption) {
      continue
    }

    for (const [dimensionKey, value] of Object.entries(selectedOption.scores)) {
      dimensionScores[dimensionKey] = (dimensionScores[dimensionKey] || 0) + value
    }
  }

  const score = Object.values(dimensionScores).reduce((total, value) => total + value, 0)

  return { score, dimensionScores }
}

export function matchResultRange(test: TestDefinition, score: number) {
  return test.resultRanges.find((range) => score >= range.min && score <= range.max)
}

export function createHistoryItem(
  test: TestDefinition,
  resultRangeId: string,
  scoreResult: ScoreResult
): TestHistoryItem {
  return {
    id: `${test.id}-${Date.now()}`,
    testId: test.id,
    resultRangeId,
    score: scoreResult.score,
    dimensionScores: scoreResult.dimensionScores,
    completedAt: new Date().toISOString()
  }
}
