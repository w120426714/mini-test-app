import { describe, expect, it } from 'vitest'
import type { TestDefinition } from '../types/test'
import { calculateScore, createHistoryItem, matchResultRange } from './scoring'

const sampleTest: TestDefinition = {
  id: 'sample',
  title: 'Sample Test',
  subtitle: 'Small scoring fixture',
  category: 'eq',
  description: 'Fixture for scoring tests',
  questionCount: 2,
  estimatedMinutes: 1,
  popularity: '1.2w',
  coverTone: 'forest',
  dimensions: [
    { key: 'empathy', label: 'Empathy' },
    { key: 'logic', label: 'Logic' }
  ],
  questions: [
    {
      id: 'q1',
      testId: 'sample',
      title: 'Question 1',
      options: [
        { id: 'q1-a', label: 'A', scores: { empathy: 3, logic: 1 } },
        { id: 'q1-b', label: 'B', scores: { empathy: 1, logic: 3 } }
      ]
    },
    {
      id: 'q2',
      testId: 'sample',
      title: 'Question 2',
      options: [
        { id: 'q2-a', label: 'A', scores: { empathy: 2, logic: 2 } },
        { id: 'q2-b', label: 'B', scores: { empathy: 0, logic: 4 } }
      ]
    }
  ],
  resultRanges: [
    {
      id: 'low',
      min: 0,
      max: 5,
      title: 'Low',
      tagline: 'Low range',
      description: 'Low description',
      suggestions: ['Try again']
    },
    {
      id: 'high',
      min: 6,
      max: 10,
      title: 'High',
      tagline: 'High range',
      description: 'High description',
      suggestions: ['Share it']
    }
  ]
}

describe('calculateScore', () => {
  it('normalizes dimension scores across runs with different sampled question counts', () => {
    const questions = [1, 2, 3].map((index) => ({
      id: `normalized-q${index}`,
      testId: 'sample',
      title: `Normalized question ${index}`,
      options: [
        { id: `normalized-q${index}-half`, label: 'Half', scores: { empathy: 2 } },
        { id: `normalized-q${index}-full`, label: 'Full', scores: { empathy: 4 } }
      ]
    }))
    const threeQuestionRun = {
      ...sampleTest,
      normalizeDimensionScores: true,
      questionCount: 3,
      questions
    } as TestDefinition
    const twoQuestionRun = {
      ...threeQuestionRun,
      questionCount: 2,
      questions: questions.slice(0, 2)
    }

    const threeQuestionResult = calculateScore(threeQuestionRun, {
      'normalized-q1': 'normalized-q1-half',
      'normalized-q2': 'normalized-q2-half',
      'normalized-q3': 'normalized-q3-half'
    })
    const twoQuestionResult = calculateScore(twoQuestionRun, {
      'normalized-q1': 'normalized-q1-half',
      'normalized-q2': 'normalized-q2-half'
    })

    expect(threeQuestionResult).toEqual({ score: 6, dimensionScores: { empathy: 50, logic: 0 } })
    expect(twoQuestionResult).toEqual({ score: 4, dimensionScores: { empathy: 50, logic: 0 } })
  })

  it('sums total and dimension scores from selected option ids', () => {
    const result = calculateScore(sampleTest, {
      q1: 'q1-a',
      q2: 'q2-b'
    })

    expect(result.score).toBe(8)
    expect(result.dimensionScores).toEqual({ empathy: 3, logic: 5 })
  })

  it('ignores missing answers instead of throwing', () => {
    const result = calculateScore(sampleTest, {
      q1: 'q1-b'
    })

    expect(result.score).toBe(4)
    expect(result.dimensionScores).toEqual({ empathy: 1, logic: 3 })
  })
})

describe('matchResultRange', () => {
  it('matches inclusive lower and upper boundaries', () => {
    expect(matchResultRange(sampleTest, 5)?.id).toBe('low')
    expect(matchResultRange(sampleTest, 6)?.id).toBe('high')
  })

  it('returns undefined when no range matches', () => {
    expect(matchResultRange(sampleTest, 99)).toBeUndefined()
  })
})

describe('createHistoryItem', () => {
  it('creates a serializable history item with the matched result id', () => {
    const history = createHistoryItem(sampleTest, 'high', {
      score: 8,
      dimensionScores: { empathy: 3, logic: 5 }
    })

    expect(history.testId).toBe('sample')
    expect(history.resultRangeId).toBe('high')
    expect(history.score).toBe(8)
    expect(history.dimensionScores).toEqual({ empathy: 3, logic: 5 })
    expect(typeof history.id).toBe('string')
    expect(typeof history.completedAt).toBe('string')
  })
})
