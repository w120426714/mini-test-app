import { describe, expect, it } from 'vitest'
import type { TestDefinition, TestQuestion } from '../types/test'
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
})
