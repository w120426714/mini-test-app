import type { TestDefinition, TestQuestion } from '../types/test'
import type { AnswerMap, ScoreResult } from './scoring'

export interface StandardScoreResult extends ScoreResult {
  correctCount: number
  answeredCount: number
  accuracy: number
}

export const STANDARD_SCORE_MIN = 55
export const STANDARD_SCORE_MAX = 145

function itemWeight(question: TestQuestion) {
  const difficulty = question.difficulty || 3
  const discrimination = question.discrimination || 1
  return (0.65 + difficulty * 0.22) * discrimination
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function calculateStandardScore(test: TestDefinition, answers: AnswerMap): StandardScoreResult {
  const dimensionScores = test.dimensions.reduce<Record<string, number>>((acc, dimension) => {
    acc[dimension.key] = 0
    return acc
  }, {})

  let earnedWeight = 0
  let totalWeight = 0
  let correctCount = 0
  let answeredCount = 0

  for (const question of test.questions) {
    const selectedOptionId = answers[question.id]
    const selectedOption = question.options.find((option) => option.id === selectedOptionId)
    const weight = itemWeight(question)

    totalWeight += weight

    if (!selectedOption) {
      continue
    }

    answeredCount += 1

    if (selectedOptionId === question.correctOptionId) {
      correctCount += 1
      earnedWeight += weight
    }

    for (const [dimensionKey, value] of Object.entries(selectedOption.scores)) {
      dimensionScores[dimensionKey] = (dimensionScores[dimensionKey] || 0) + value
    }
  }

  const accuracy = totalWeight > 0 ? earnedWeight / totalWeight : 0
  const scoreSpan = STANDARD_SCORE_MAX - STANDARD_SCORE_MIN
  const standardScore = Math.round(clamp(
    STANDARD_SCORE_MIN + Math.sqrt(accuracy) * scoreSpan,
    STANDARD_SCORE_MIN,
    STANDARD_SCORE_MAX
  ))

  return {
    score: standardScore,
    dimensionScores,
    correctCount,
    answeredCount,
    accuracy
  }
}
