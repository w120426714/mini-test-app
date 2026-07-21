import { describe, expect, it } from 'vitest'
import type { TestDefinition, TestQuestion } from '../types/test'
import { tests } from '../data/tests'
import { selectQuestionsForRun } from './questionPicker'

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
