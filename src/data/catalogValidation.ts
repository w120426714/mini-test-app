import type { TestDefinition } from '../types/test'

const REQUIRED_BANK_SIZE = 500
const MINIMUM_TITLE_DIVERSITY = 0.1

function normalizeTitle(title: string): string {
  return title
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase()
    .replace(/[\p{P}\p{S}\s]+/gu, '')
}

export function validateCatalog(tests: TestDefinition[]): string[] {
  const issues: string[] = []
  const seenTestIds = new Set<string>()

  for (const test of tests) {
    if (seenTestIds.has(test.id)) {
      issues.push(`duplicate test id: ${test.id}`)
    } else {
      seenTestIds.add(test.id)
    }

    if (test.bankSize !== REQUIRED_BANK_SIZE) {
      issues.push(`${test.id}: expected bankSize 500, received ${String(test.bankSize)}`)
    }
    if (test.questions.length !== REQUIRED_BANK_SIZE) {
      issues.push(`${test.id}: expected 500 questions, received ${test.questions.length}`)
    }

    const seenQuestionIds = new Set<string>()
    const coveredDomains = new Set<string>()
    const coveredDifficulties = new Set<number>()
    const normalizedTitles = new Set<string>()

    for (const question of test.questions) {
      if (seenQuestionIds.has(question.id)) {
        issues.push(`${test.id}: duplicate question id: ${question.id}`)
      } else {
        seenQuestionIds.add(question.id)
      }

      if (question.options.length < 2) {
        issues.push(`${test.id}/${question.id}: expected at least 2 options`)
      }

      const seenOptionIds = new Set<string>()
      for (const option of question.options) {
        if (seenOptionIds.has(option.id)) {
          issues.push(`${test.id}/${question.id}: duplicate option id: ${option.id}`)
        } else {
          seenOptionIds.add(option.id)
        }
      }

      if (question.correctOptionId && !seenOptionIds.has(question.correctOptionId)) {
        issues.push(`${test.id}/${question.id}: invalid correctOptionId: ${question.correctOptionId}`)
      }

      if (question.domain) {
        coveredDomains.add(question.domain)
      }
      if (question.difficulty) {
        coveredDifficulties.add(question.difficulty)
      }
      normalizedTitles.add(normalizeTitle(question.title))
    }

    for (const dimension of test.dimensions) {
      if (!coveredDomains.has(dimension.key)) {
        issues.push(`${test.id}: dimension has no question domain: ${dimension.key}`)
      }
    }

    const missingDifficulties = [1, 2, 3, 4, 5].filter((level) => !coveredDifficulties.has(level))
    if (missingDifficulties.length > 0) {
      issues.push(`${test.id}: missing difficulty levels: ${missingDifficulties.join(',')}`)
    }

    const minimumUniqueTitles = Math.ceil(test.questions.length * MINIMUM_TITLE_DIVERSITY)
    if (normalizedTitles.size < minimumUniqueTitles) {
      issues.push(`${test.id}: normalized title diversity below 10% (${normalizedTitles.size}/${test.questions.length})`)
    }

    const sortedRanges = [...test.resultRanges].sort((left, right) => left.min - right.min)
    sortedRanges.forEach((range, index) => {
      if (range.min > range.max) {
        issues.push(`${test.id}: inverted result range: ${range.id} (${range.min}-${range.max})`)
      }

      const previous = sortedRanges[index - 1]
      if (previous && range.min !== previous.max + 1) {
        issues.push(`${test.id}: discontinuous result ranges between ${previous.id} and ${range.id}`)
      }
    })
  }

  return issues
}
