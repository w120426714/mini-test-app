export type TestCategory = 'iq' | 'eq' | 'personality' | 'romance' | 'wealth' | 'workplace'

export interface TestDimension {
  key: string
  label: string
}

export interface TestOption {
  id: string
  label: string
  scores: Record<string, number>
}

export type QuestionDifficulty = 1 | 2 | 3 | 4 | 5

export type QuestionSource = 'curated' | 'generated' | 'public-domain-inspired'

export interface TestQuestion {
  id: string
  testId: string
  title: string
  options: TestOption[]
  domain?: string
  difficulty?: QuestionDifficulty
  kind?: string
  correctOptionId?: string
  discrimination?: number
  explanation?: string
  source?: QuestionSource
}

export interface TestResultRange {
  id: string
  min: number
  max: number
  title: string
  tagline: string
  description: string
  suggestions: string[]
}

export interface TestDefinition {
  id: string
  title: string
  subtitle: string
  category: TestCategory
  description: string
  questionCount: number
  bankSize?: number
  estimatedMinutes: number
  popularity: string
  coverTone: 'forest' | 'sunset' | 'ocean'
  scoringModel?: 'sum' | 'iq-standard'
  bankSource?: string
  dimensions: TestDimension[]
  questions: TestQuestion[]
  resultRanges: TestResultRange[]
}

export interface TestHistoryItem {
  id: string
  testId: string
  resultRangeId: string
  score: number
  dimensionScores: Record<string, number>
  completedAt: string
}
