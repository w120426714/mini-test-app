import { describe, expect, it } from 'vitest'
import type { TestDefinition, TestQuestion } from '../types/test'
import { validateCatalog } from './catalogValidation'
import { tests } from './tests'

function makeQuestion(index: number): TestQuestion {
  const id = `sample-q-${index + 1}`

  return {
    id,
    testId: 'sample-test',
    title: `Sample scenario ${index % 50}: choice ${index + 1}`,
    domain: index % 2 === 0 ? 'focus' : 'memory',
    difficulty: ((index % 5) + 1) as 1 | 2 | 3 | 4 | 5,
    options: [
      { id: `${id}-a`, label: 'Choose a measured response', scores: { focus: 1, memory: 0 } },
      { id: `${id}-b`, label: 'Choose a deliberate response', scores: { focus: 2, memory: 1 } }
    ]
  }
}

function makeValidTest(overrides: Partial<TestDefinition> = {}): TestDefinition {
  return {
    id: 'sample-test',
    title: 'Sample test',
    subtitle: 'A valid catalog fixture',
    category: 'iq',
    description: 'A fixture used to exercise catalog validation.',
    questionCount: 8,
    bankSize: 500,
    estimatedMinutes: 3,
    popularity: '1w',
    coverTone: 'forest',
    bankSource: 'Original non-clinical fixture',
    dimensions: [
      { key: 'focus', label: 'Focus' },
      { key: 'memory', label: 'Memory' }
    ],
    questions: Array.from({ length: 500 }, (_, index) => makeQuestion(index)),
    resultRanges: [
      { id: 'low', min: 0, max: 9, title: 'Low', tagline: 'Low range', description: 'Low description', suggestions: ['One', 'Two'] },
      { id: 'mid', min: 10, max: 19, title: 'Mid', tagline: 'Mid range', description: 'Mid description', suggestions: ['One', 'Two'] },
      { id: 'high', min: 20, max: 30, title: 'High', tagline: 'High range', description: 'High description', suggestions: ['One', 'Two'] }
    ],
    ...overrides
  }
}

function expectIssue(test: TestDefinition, issue: string) {
  expect(validateCatalog([test])).toContain(issue)
}

describe('published assessment catalog', () => {
  const resultDisclaimer = '仅供娱乐和自我反思，不构成临床、财务或职业诊断'
  const expandedTestIds = [
    'focus-lab',
    'social-signal',
    'resilience-map',
    'attachment-weather',
    'spending-style',
    'career-values'
  ]

  it('contains twelve tests and six thousand candidate questions', () => {
    expect(tests).toHaveLength(12)
    expect(tests.reduce((total, test) => total + test.questions.length, 0)).toBe(6000)
  })

  it('contains two tests in every category', () => {
    expect(Object.fromEntries(
      ['iq', 'eq', 'personality', 'romance', 'wealth', 'workplace'].map((category) => [
        category,
        tests.filter((test) => test.category === category).length
      ])
    )).toEqual({ iq: 2, eq: 2, personality: 2, romance: 2, wealth: 2, workplace: 2 })
  })

  it('passes the complete catalog integrity check', () => {
    expect(validateCatalog(tests)).toEqual([])
  })

  it('keeps every question domain represented by its option score dimensions', () => {
    expect(tests.every((test) => test.questions.every((question) => (
      Boolean(question.domain)
      && question.options.some((option) => question.domain && question.domain in option.scores)
    )))).toBe(true)
  })

  it('identifies every expanded bank as original and non-clinical', () => {
    const expanded = tests.filter((test) => expandedTestIds.includes(test.id))

    expect(expanded).toHaveLength(6)
    expect(expanded.every((test) => test.bankSource?.includes('原创'))).toBe(true)
    expect(expanded.every((test) => test.bankSource?.includes('非临床'))).toBe(true)
  })

  it('adds an explicit entertainment and non-diagnostic disclaimer to every expanded result', () => {
    const expanded = tests.filter((test) => expandedTestIds.includes(test.id))

    expect(expanded.every((test) => test.resultRanges.every((range) => (
      range.description.includes(resultDisclaimer)
    )))).toBe(true)
  })

  it('enables normalized dimension scores for every expanded assessment', () => {
    const expanded = tests.filter((test) => expandedTestIds.includes(test.id))
    expect(expanded.every((test) => test.normalizeDimensionScores === true)).toBe(true)
  })

  it('uses continuous expanded result ranges covering raw sum scores 0 through 24', () => {
    const expanded = tests.filter((test) => expandedTestIds.includes(test.id))

    expect(expanded.every((test) => {
      const ranges = [...test.resultRanges].sort((left, right) => left.min - right.min)
      return ranges[0].min === 0
        && ranges[ranges.length - 1].max === 24
        && ranges.every((range, index) => index === 0 || range.min === ranges[index - 1].max + 1)
    })).toBe(true)
  })
})

describe('validateCatalog', () => {
  it('reports duplicate test ids', () => {
    const valid = makeValidTest()
    expect(validateCatalog([valid, { ...valid }])).toContain('duplicate test id: sample-test')
  })

  it('reports a bank that does not contain exactly 500 questions', () => {
    expectIssue(
      makeValidTest({ questions: makeValidTest().questions.slice(0, 499) }),
      'sample-test: expected 500 questions, received 499'
    )
  })

  it('reports a declared bank size other than 500 even when 500 questions exist', () => {
    expectIssue(
      makeValidTest({ bankSize: 499 }),
      'sample-test: expected bankSize 500, received 499'
    )
  })

  it('reports duplicate question ids inside a test', () => {
    const questions = makeValidTest().questions
    questions[1] = { ...questions[1], id: questions[0].id }
    expectIssue(makeValidTest({ questions }), 'sample-test: duplicate question id: sample-q-1')
  })

  it('reports questions with fewer than two options', () => {
    const questions = makeValidTest().questions
    questions[0] = { ...questions[0], options: questions[0].options.slice(0, 1) }
    expectIssue(makeValidTest({ questions }), 'sample-test/sample-q-1: expected at least 2 options')
  })

  it('reports duplicate option ids inside a question', () => {
    const questions = makeValidTest().questions
    questions[0] = {
      ...questions[0],
      options: [questions[0].options[0], { ...questions[0].options[1], id: questions[0].options[0].id }]
    }
    expectIssue(makeValidTest({ questions }), 'sample-test/sample-q-1: duplicate option id: sample-q-1-a')
  })

  it('reports a correct option reference that does not exist', () => {
    const questions = makeValidTest().questions
    questions[0] = { ...questions[0], correctOptionId: 'missing-option' }
    expectIssue(makeValidTest({ questions }), 'sample-test/sample-q-1: invalid correctOptionId: missing-option')
  })

  it('reports an empty result range list', () => {
    expectIssue(
      makeValidTest({ resultRanges: [] }),
      'sample-test: expected at least 1 result range'
    )
  })

  it('reports duplicate result range ids', () => {
    const resultRanges = makeValidTest().resultRanges
    resultRanges[1] = { ...resultRanges[1], id: resultRanges[0].id }

    expectIssue(
      makeValidTest({ resultRanges }),
      'sample-test: duplicate result range id: low'
    )
  })

  it('reports an inverted result range', () => {
    const test = makeValidTest({
      resultRanges: [
        { id: 'low', min: 0, max: 9, title: 'Low', tagline: 'Low', description: 'Low', suggestions: ['One', 'Two'] },
        { id: 'backward', min: 15, max: 10, title: 'Backward', tagline: 'Backward', description: 'Backward', suggestions: ['One', 'Two'] },
        { id: 'high', min: 20, max: 30, title: 'High', tagline: 'High', description: 'High', suggestions: ['One', 'Two'] }
      ]
    })

    expectIssue(test, 'sample-test: inverted result range: backward (15-10)')
  })

  it('reports discontinuous result ranges', () => {
    const resultRanges = makeValidTest().resultRanges
    resultRanges[1] = { ...resultRanges[1], min: 11 }

    expectIssue(
      makeValidTest({ resultRanges }),
      'sample-test: discontinuous result ranges between low and mid'
    )
  })

  it('reports sum result ranges that miss the reachable minimum score', () => {
    const resultRanges = makeValidTest().resultRanges
    resultRanges[0] = { ...resultRanges[0], min: 9 }

    expectIssue(
      makeValidTest({ resultRanges }),
      'sample-test: result ranges do not cover reachable scores 8-24 (covered 9-30)'
    )
  })

  it('reports sum result ranges that miss the reachable maximum score', () => {
    const resultRanges = makeValidTest().resultRanges
    resultRanges[2] = { ...resultRanges[2], max: 23 }

    expectIssue(
      makeValidTest({ resultRanges }),
      'sample-test: result ranges do not cover reachable scores 8-24 (covered 0-23)'
    )
  })

  it('requires iq-standard result ranges to cover 55 through 145', () => {
    expectIssue(
      makeValidTest({
        scoringModel: 'iq-standard',
        resultRanges: [
          { id: 'low', min: 56, max: 89, title: 'Low', tagline: 'Low', description: 'Low', suggestions: ['One', 'Two'] },
          { id: 'mid', min: 90, max: 114, title: 'Mid', tagline: 'Mid', description: 'Mid', suggestions: ['One', 'Two'] },
          { id: 'high', min: 115, max: 145, title: 'High', tagline: 'High', description: 'High', suggestions: ['One', 'Two'] }
        ]
      }),
      'sample-test: result ranges do not cover reachable scores 55-145 (covered 56-145)'
    )
  })

  it('reports a question with no domain', () => {
    const questions = makeValidTest().questions
    questions[0] = { ...questions[0], domain: undefined }
    expectIssue(makeValidTest({ questions }), 'sample-test/sample-q-1: missing domain')
  })

  it('reports a question whose domain is not a configured dimension', () => {
    const questions = makeValidTest().questions
    questions[0] = { ...questions[0], domain: 'unknown' }
    expectIssue(makeValidTest({ questions }), 'sample-test/sample-q-1: unknown domain: unknown')
  })

  it('reports a question whose domain is absent from all option score keys', () => {
    const questions = makeValidTest().questions
    questions[0] = {
      ...questions[0],
      options: questions[0].options.map((option) => ({ ...option, scores: { memory: 1 } }))
    }
    expectIssue(makeValidTest({ questions }), 'sample-test/sample-q-1: domain missing from option scores: focus')
  })

  it('reports a question with no difficulty', () => {
    const questions = makeValidTest().questions
    questions[0] = { ...questions[0], difficulty: undefined }
    expectIssue(makeValidTest({ questions }), 'sample-test/sample-q-1: invalid difficulty: undefined')
  })

  it.each([0, 6])('reports difficulty %i outside the 1-5 range', (difficulty) => {
    const questions = makeValidTest().questions
    questions[0] = {
      ...questions[0],
      difficulty: difficulty as TestQuestion['difficulty']
    }
    expectIssue(makeValidTest({ questions }), `sample-test/sample-q-1: invalid difficulty: ${difficulty}`)
  })

  it('reports too few unique templates for one run', () => {
    const questions = makeValidTest().questions.map((question, index) => ({
      ...question,
      templateId: `template-${index % 7}`
    }))

    expectIssue(
      makeValidTest({ questions }),
      'sample-test: expected at least 8 unique question templates, received 7'
    )
  })

  it('reports configured dimensions that no question covers', () => {
    const questions = makeValidTest().questions.map((question) => ({ ...question, domain: 'focus' }))
    expectIssue(makeValidTest({ questions }), 'sample-test: dimension has no question domain: memory')
  })

  it('reports missing difficulty levels from one through five', () => {
    const questions = makeValidTest().questions.map((question) => ({ ...question, difficulty: 1 as const }))
    expectIssue(makeValidTest({ questions }), 'sample-test: missing difficulty levels: 2,3,4,5')
  })

  it('reports normalized title diversity below ten percent', () => {
    const questions = makeValidTest().questions.map((question) => ({ ...question, title: '  SAME   TITLE  ' }))
    expectIssue(makeValidTest({ questions }), 'sample-test: normalized title diversity below 10% (1/500)')
  })
})
