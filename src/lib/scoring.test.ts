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
