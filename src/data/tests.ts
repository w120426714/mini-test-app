import type { TestCategory, TestDefinition } from '../types/test'
import { coreTests } from './assessments/core'
import { expandedTests } from './assessments/expanded'

export const categoryLabels: Record<TestCategory, string> = {
  iq: '智商',
  eq: '情商',
  personality: '性格',
  romance: '恋爱',
  wealth: '财富',
  workplace: '职场'
}

export const tests: TestDefinition[] = [...coreTests, ...expandedTests]

export function getTestById(testId: string | undefined) {
  return tests.find((test) => test.id === testId)
}

export function getTestsByCategory(category: TestCategory) {
  return tests.filter((test) => test.category === category)
}

export function getRecommendedTest() {
  return tests[0]
}
