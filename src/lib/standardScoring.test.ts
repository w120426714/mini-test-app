import { describe, expect, it } from 'vitest'
import type { TestDefinition } from '../types/test'
import { calculateStandardScore } from './standardScoring'

const iqFixture = {
  id: 'iq-fixture',
  title: 'IQ Fixture',
  subtitle: 'Fixture',
  category: 'iq',
  description: 'Fixture',
  questionCount: 4,
  estimatedMinutes: 2,
  popularity: '1w',
  coverTone: 'ocean',
  dimensions: [{ key: 'logic', label: 'Logic' }],
  questions: [
    {
      id: 'q1',
      testId: 'iq-fixture',
      title: 'Easy',
      domain: 'logic',
      difficulty: 1,
      discrimination: 0.8,
      correctOptionId: 'q1-a',
      options: [
        { id: 'q1-a', label: 'A', scores: { logic: 4 } },
        { id: 'q1-b', label: 'B', scores: { logic: 0 } }
      ]
    },
    {
      id: 'q2',
      testId: 'iq-fixture',
      title: 'Medium',
      domain: 'logic',
      difficulty: 3,
      discrimination: 1,
      correctOptionId: 'q2-a',
      options: [
        { id: 'q2-a', label: 'A', scores: { logic: 4 } },
        { id: 'q2-b', label: 'B', scores: { logic: 0 } }
      ]
    },
    {
      id: 'q3',
      testId: 'iq-fixture',
      title: 'Hard',
      domain: 'logic',
      difficulty: 5,
      discrimination: 1.2,
      correctOptionId: 'q3-a',
      options: [
        { id: 'q3-a', label: 'A', scores: { logic: 4 } },
        { id: 'q3-b', label: 'B', scores: { logic: 0 } }
      ]
    },
    {
      id: 'q4',
      testId: 'iq-fixture',
      title: 'Harder',
      domain: 'logic',
      difficulty: 5,
      discrimination: 1.2,
      correctOptionId: 'q4-a',
      options: [
        { id: 'q4-a', label: 'A', scores: { logic: 4 } },
        { id: 'q4-b', label: 'B', scores: { logic: 0 } }
      ]
    }
  ],
  resultRanges: []
} as TestDefinition

describe('calculateStandardScore', () => {
  it('maps weighted correctness to a bounded IQ-like score', () => {
    const result = calculateStandardScore(iqFixture, {
      q1: 'q1-a',
      q2: 'q2-a',
      q3: 'q3-b',
      q4: 'q4-b'
    })

    expect(result.correctCount).toBe(2)
    expect(result.score).toBeGreaterThanOrEqual(55)
    expect(result.score).toBeLessThanOrEqual(145)
    expect(result.score).toBeGreaterThan(90)
    expect(result.score).toBeLessThan(115)
  })
})

