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
  it('copies a stable seed template id to every generated variant', () => {
    const seeds = [
      seedQuestions[0],
      { ...seedQuestions[1], templateId: 'custom-template' }
    ]
    const bank = buildAssessmentBank({
      testId: 'sample',
      seedQuestions: seeds,
      targetCount: 6,
      domains: ['focus', 'empathy']
    })

    expect(bank.map((question) => question.templateId)).toEqual([
      'seed-1', 'custom-template', 'seed-1', 'custom-template', 'seed-1', 'custom-template'
    ])
  })

  it('preserves each explicit seed domain throughout a 500-question expansion', () => {
    const domainSeeds: TestQuestion[] = [
      {
        ...seedQuestions[0],
        domain: 'empathy',
        options: seedQuestions[0].options.map((option) => ({
          ...option,
          scores: { empathy: option.scores.focus }
        }))
      },
      {
        ...seedQuestions[1],
        domain: 'focus',
        options: seedQuestions[1].options.map((option) => ({
          ...option,
          scores: { focus: option.scores.empathy }
        }))
      }
    ]

    const bank = buildAssessmentBank({
      testId: 'sample',
      seedQuestions: domainSeeds,
      targetCount: 500,
      domains: ['focus', 'empathy']
    })

    expect(bank).toHaveLength(500)
    expect(bank.every((question, index) => question.domain === domainSeeds[index % domainSeeds.length].domain)).toBe(true)
    expect(bank.every((question) => question.options.some((option) => question.domain && question.domain in option.scores))).toBe(true)
  })

  it('evenly rotates fallback domains when seeds do not declare a domain', () => {
    const bank = buildAssessmentBank({
      testId: 'sample',
      seedQuestions,
      targetCount: 500,
      domains: ['focus', 'empathy']
    })

    expect(bank.filter((question) => question.domain === 'focus')).toHaveLength(250)
    expect(bank.filter((question) => question.domain === 'empathy')).toHaveLength(250)
    expect(bank.slice(0, 6).map((question) => question.domain)).toEqual([
      'focus', 'empathy', 'focus', 'empathy', 'focus', 'empathy'
    ])
  })

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
