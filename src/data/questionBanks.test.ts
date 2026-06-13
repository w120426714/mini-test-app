import { describe, expect, it } from 'vitest'
import type { TestQuestion } from '../types/test'
import { buildAssessmentBank } from './questionBanks'
import { tests } from './tests'

const seedQuestions: TestQuestion[] = [
  {
    id: 'seed-1',
    testId: 'sample',
    title: 'Seed question 1',
    options: [
      { id: 'seed-1-a', label: 'A', scores: { focus: 1 } },
      { id: 'seed-1-b', label: 'B', scores: { focus: 3 } }
    ]
  },
  {
    id: 'seed-2',
    testId: 'sample',
    title: 'Seed question 2',
    options: [
      { id: 'seed-2-a', label: 'A', scores: { empathy: 2 } },
      { id: 'seed-2-b', label: 'B', scores: { empathy: 4 } }
    ]
  }
]

describe('buildAssessmentBank', () => {
  it('expands curated seeds into a stable unique question bank with metadata', () => {
    const bank = buildAssessmentBank({
      testId: 'sample',
      seedQuestions,
      targetCount: 24,
      domains: ['focus', 'empathy']
    })

    expect(bank).toHaveLength(24)
    expect(new Set(bank.map((question) => question.id)).size).toBe(24)
    expect(new Set(bank.map((question) => question.domain))).toEqual(new Set(['focus', 'empathy']))
    expect(bank.every((question) => question.difficulty && question.difficulty >= 1 && question.difficulty <= 5)).toBe(true)
  })

  it('provides about 500 candidate questions for every published test', () => {
    expect(tests.every((test) => test.questions.length >= 500)).toBe(true)
    expect(tests.every((test) => (test.bankSize || test.questions.length) >= 500)).toBe(true)
  })
})
