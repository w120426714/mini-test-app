import { describe, expect, it } from 'vitest'
import type { TestDefinition, TestQuestion } from '../types/test'
import { validateCatalog } from '../data/catalogValidation'
import { tests } from '../data/tests'
import { compressSelectionCandidates, selectQuestionsForRun } from './questionPicker'

function makeQuestion(index: number): TestQuestion {
  return {
    id: `q${index}`,
    testId: 'sample',
    title: `Question ${index}`,
    options: [
      { id: `q${index}-a`, label: 'A', scores: { logic: 1 } },
      { id: `q${index}-b`, label: 'B', scores: { logic: 2 } }
    ]
  }
}

function createLcg(seed: number) {
  let state = seed & 0x7fffffff
  return () => {
    state = (Math.imul(1103515245, state) + 12345) & 0x7fffffff
    return state / 0x80000000
  }
}

function makeCatalogQuestion(
  index: number,
  domain: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  templateId: string
): TestQuestion {
  const id = `joint-q-${index}`
  return {
    id,
    templateId,
    testId: 'joint-balance',
    title: `Joint balance scenario ${index}`,
    domain,
    difficulty,
    options: [
      { id: `${id}-a`, label: 'A', scores: { [domain]: 1 } },
      { id: `${id}-b`, label: 'B', scores: { [domain]: 2 } }
    ]
  }
}

const sampleTest: TestDefinition = {
  id: 'sample',
  title: 'Sample',
  subtitle: 'Sample',
  category: 'iq',
  description: 'Sample',
  questionCount: 3,
  estimatedMinutes: 2,
  popularity: '1w',
  coverTone: 'sunset',
  dimensions: [{ key: 'logic', label: 'Logic' }],
  questions: [1, 2, 3, 4, 5].map(makeQuestion),
  resultRanges: []
}

describe('selectQuestionsForRun', () => {
  it('skips duplicate templates and still fills the configured count when alternatives exist', () => {
    const questions = [
      { ...makeQuestion(1), templateId: 'template-a' },
      { ...makeQuestion(2), templateId: 'template-a' },
      { ...makeQuestion(3), templateId: 'template-b' },
      { ...makeQuestion(4), templateId: 'template-c' }
    ]

    const selected = selectQuestionsForRun(
      { ...sampleTest, questionCount: 3, questions },
      () => 0.99
    )

    expect(selected).toHaveLength(3)
    expect(new Set(selected.map((question) => question.templateId))).toEqual(
      new Set(['template-a', 'template-b', 'template-c'])
    )
  })

  it('selects eight distinct seed templates for an expanded assessment run', () => {
    const expanded = tests.find((test) => test.id === 'focus-lab')

    expect(expanded).toBeDefined()
    const selected = selectQuestionsForRun(expanded as TestDefinition, () => 0.99)
    expect(selected).toHaveLength(8)
    expect(new Set(selected.map((question) => question.templateId)).size).toBe(8)
  })

  it('covers multiple difficulties for every expanded assessment with deterministic randomness', () => {
    const expandedTests = tests.filter((test) => test.minimumSemanticTemplates === 40)

    expect(expandedTests).toHaveLength(6)
    for (const test of expandedTests) {
      const selected = selectQuestionsForRun(test, () => 0.99)
      const difficulties = new Set(selected.map((question) => question.difficulty))

      expect(selected).toHaveLength(test.questionCount)
      expect(difficulties.size, test.id).toBeGreaterThanOrEqual(3)
      expect(difficulties, test.id).not.toEqual(new Set([1]))
    }
  })

  it('guarantees three difficulties for expanded runs across deterministic LCG sequences', () => {
    const expandedTests = tests.filter((test) => test.minimumSemanticTemplates === 40)

    for (const seed of [1760, 369]) {
      for (const test of expandedTests) {
        const selected = selectQuestionsForRun(test, createLcg(seed))
        const difficulties = new Set(selected.map((question) => question.difficulty))
        const domainCounts = selected.reduce<Record<string, number>>((counts, question) => {
          const domain = question.domain || 'missing'
          counts[domain] = (counts[domain] || 0) + 1
          return counts
        }, {})

        expect(selected).toHaveLength(test.questionCount)
        expect(new Set(selected.map((question) => question.id)).size).toBe(test.questionCount)
        expect(new Set(selected.map((question) => question.templateId)).size).toBe(test.questionCount)
        expect(difficulties.size, `${test.id}/seed-${seed}`).toBeGreaterThanOrEqual(3)
        expect(Math.max(...Object.values(domainCounts)) - Math.min(...Object.values(domainCounts))).toBeLessThanOrEqual(1)
      }
    }
  })

  it('fills short runs without requiring three difficulties', () => {
    const questions = [1, 2, 3].map((index) => ({
      ...makeQuestion(index),
      domain: index % 2 === 0 ? 'spatial' : 'logic',
      difficulty: index as 1 | 2 | 3,
      templateId: `short-${index}`
    }))

    const selected = selectQuestionsForRun(
      { ...sampleTest, questionCount: 2, questions },
      createLcg(1760)
    )

    expect(selected).toHaveLength(2)
  })

  it('fills the run when the bank contains fewer than three difficulties', () => {
    const questions = [1, 2, 3, 4, 5, 6].map((index) => ({
      ...makeQuestion(index),
      domain: ['logic', 'spatial', 'memory'][index % 3],
      difficulty: (index % 2 === 0 ? 1 : 2) as 1 | 2,
      templateId: `limited-${index}`
    }))

    const selected = selectQuestionsForRun(
      { ...sampleTest, questionCount: 4, questions },
      createLcg(1760)
    )

    expect(selected).toHaveLength(4)
    expect(new Set(selected.map((question) => question.difficulty)).size).toBe(2)
  })

  it('finds a feasible three-difficulty selection when templates conflict', () => {
    const questions = [
      { ...makeQuestion(1), domain: 'logic', difficulty: 1 as const, templateId: 'shared' },
      { ...makeQuestion(2), domain: 'logic', difficulty: 1 as const, templateId: 'difficulty-one' },
      { ...makeQuestion(3), domain: 'spatial', difficulty: 2 as const, templateId: 'shared' },
      { ...makeQuestion(4), domain: 'memory', difficulty: 3 as const, templateId: 'difficulty-three' }
    ]

    const selected = selectQuestionsForRun(
      { ...sampleTest, questionCount: 3, questions },
      () => 0.99
    )

    expect(selected).toHaveLength(3)
    expect(new Set(selected.map((question) => question.templateId)).size).toBe(3)
    expect(new Set(selected.map((question) => question.difficulty)).size).toBe(3)
  })

  it('jointly satisfies domain balance and difficulty diversity for a valid 500-question bank', () => {
    const questions = [
      makeCatalogQuestion(1, 'logic', 1, 'shared-with-memory'),
      makeCatalogQuestion(2, 'logic', 1, 'logic-one'),
      makeCatalogQuestion(3, 'memory', 2, 'shared-with-memory'),
      makeCatalogQuestion(4, 'spatial', 3, 'spatial-three'),
      makeCatalogQuestion(5, 'spatial', 2, 'spatial-two'),
      makeCatalogQuestion(6, 'logic', 3, 'logic-three'),
      ...Array.from({ length: 494 }, (_, offset) => {
        const index = offset + 7
        return makeCatalogQuestion(
          index,
          offset % 2 === 0 ? 'logic' : 'spatial',
          offset % 2 === 0 ? 4 : 5,
          `filler-${index}`
        )
      })
    ]
    const test: TestDefinition = {
      ...sampleTest,
      id: 'joint-balance',
      questionCount: 4,
      bankSize: 500,
      bankSource: 'Original non-clinical regression fixture',
      dimensions: [
        { key: 'logic', label: 'Logic' },
        { key: 'memory', label: 'Memory' },
        { key: 'spatial', label: 'Spatial' }
      ],
      questions,
      resultRanges: [
        { id: 'all', min: 0, max: 8, title: 'All', tagline: 'All', description: 'All', suggestions: ['One', 'Two'] }
      ]
    }

    expect(validateCatalog([test])).toEqual([])

    const selected = selectQuestionsForRun(test, () => 0.99)
    const domainCounts = test.dimensions.map(({ key }) => (
      selected.filter((question) => question.domain === key).length
    ))

    expect(selected).toHaveLength(4)
    expect(new Set(selected.map((question) => question.id)).size).toBe(4)
    expect(new Set(selected.map((question) => question.templateId)).size).toBe(4)
    expect(new Set(selected.map((question) => question.difficulty)).size).toBeGreaterThanOrEqual(3)
    expect(domainCounts.sort()).toEqual([1, 1, 2])
  })

  it('compresses clone candidates by template, difficulty, and domain before search', () => {
    const clones = Array.from({ length: 500 }, (_, index) => ({
      ...makeQuestion(index + 1),
      templateId: `template-${index % 2}`,
      domain: `domain-${index % 3}`,
      difficulty: ((index % 2) + 1) as 1 | 2
    }))

    const compressed = compressSelectionCandidates(clones)

    expect(compressed).toHaveLength(6)
    expect(new Set(compressed.map((question) => question.id)).size).toBe(6)
  })

  it('selects the configured number of unique questions', () => {
    const questions = selectQuestionsForRun(sampleTest, () => 0.9)

    expect(questions).toHaveLength(3)
    expect(new Set(questions.map((question) => question.id)).size).toBe(3)
  })

  it('returns all questions when the configured count is larger than the bank', () => {
    const questions = selectQuestionsForRun({ ...sampleTest, questionCount: 9 }, () => 0.1)

    expect(questions.map((question) => question.id).sort()).toEqual(['q1', 'q2', 'q3', 'q4', 'q5'])
  })

  it('does not mutate the original question bank', () => {
    const before = sampleTest.questions.map((question) => question.id)

    selectQuestionsForRun(sampleTest, () => 0.75)

    expect(sampleTest.questions.map((question) => question.id)).toEqual(before)
  })

  it('balances questions across domains when metadata is available', () => {
    const balancedQuestions = [
      ...[1, 2, 3, 4, 5, 6, 7, 8].map((index) => ({ ...makeQuestion(index), domain: 'logic', difficulty: 1 })),
      ...[9, 10].map((index) => ({ ...makeQuestion(index), domain: 'spatial', difficulty: 3 })),
      ...[11, 12].map((index) => ({ ...makeQuestion(index), domain: 'memory', difficulty: 5 }))
    ] as unknown as TestQuestion[]

    const questions = selectQuestionsForRun(
      { ...sampleTest, questionCount: 3, questions: balancedQuestions },
      () => 0.99
    )

    expect(new Set(questions.map((question) => question.domain))).toEqual(
      new Set(['logic', 'spatial', 'memory'])
    )
  })
})
