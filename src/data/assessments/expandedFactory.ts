import type {
  TestCategory,
  TestDefinition,
  TestQuestion,
  TestResultRange
} from '../../types/test'
import { buildAssessmentBank } from '../questionBanks'

type CoverTone = TestDefinition['coverTone']
type ChoiceLabels = readonly [string, string, string]

interface ExpandedAssessmentInput {
  id: string
  title: string
  subtitle: string
  category: TestCategory
  description: string
  popularity: string
  coverTone: CoverTone
  bankSource: string
  dimensions: readonly [
    { key: string; label: string },
    { key: string; label: string },
    { key: string; label: string }
  ]
  seedQuestions: TestQuestion[]
  resultRanges: readonly [TestResultRange, TestResultRange, TestResultRange]
}

export function createSeedQuestion(
  testId: string,
  index: number,
  title: string,
  domain: string,
  choices: ChoiceLabels
): TestQuestion {
  const questionId = `${testId}-seed-${index}`

  return {
    id: questionId,
    testId,
    title,
    domain,
    options: choices.map((label, optionIndex) => ({
      id: `${questionId}-${String.fromCharCode(97 + optionIndex)}`,
      label,
      scores: { [domain]: optionIndex + 1 }
    }))
  }
}

export function createExpandedAssessment(input: ExpandedAssessmentInput): TestDefinition {
  const domains = input.dimensions.map((dimension) => dimension.key)

  return {
    id: input.id,
    title: input.title,
    subtitle: input.subtitle,
    category: input.category,
    description: input.description,
    questionCount: 8,
    estimatedMinutes: 3,
    popularity: input.popularity,
    coverTone: input.coverTone,
    scoringModel: 'sum',
    bankSize: 500,
    bankSource: input.bankSource,
    dimensions: [...input.dimensions],
    questions: buildAssessmentBank({
      testId: input.id,
      seedQuestions: input.seedQuestions,
      targetCount: 500,
      domains
    }),
    resultRanges: [...input.resultRanges]
  }
}
