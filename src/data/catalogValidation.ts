import type { TestDefinition } from '../types/test'
import { STANDARD_SCORE_MAX, STANDARD_SCORE_MIN } from '../lib/standardScoring'

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
    const templateIds = new Set<string>()
    const dimensionKeys = new Set(test.dimensions.map((dimension) => dimension.key))
    const coveredDomains = new Set<string>()
    const coveredDifficulties = new Set<number>()
    const normalizedTitles = new Set<string>()

    for (const question of test.questions) {
      templateIds.add(question.templateId || question.id)

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

      if (!question.domain) {
        issues.push(`${test.id}/${question.id}: missing domain`)
      } else if (!dimensionKeys.has(question.domain)) {
        issues.push(`${test.id}/${question.id}: unknown domain: ${question.domain}`)
      } else {
        coveredDomains.add(question.domain)
        const domainHasScore = question.options.some((option) => (
          Object.prototype.hasOwnProperty.call(option.scores, question.domain)
        ))
        if (!domainHasScore) {
          issues.push(`${test.id}/${question.id}: domain missing from option scores: ${question.domain}`)
        }
      }

      if (
        Number.isInteger(question.difficulty)
        && Number(question.difficulty) >= 1
        && Number(question.difficulty) <= 5
      ) {
        coveredDifficulties.add(Number(question.difficulty))
      } else {
        issues.push(`${test.id}/${question.id}: invalid difficulty: ${String(question.difficulty)}`)
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

    const minimumTemplateCount = test.normalizeDimensionScores ? 40 : test.questionCount
    if (templateIds.size < minimumTemplateCount) {
      const assessmentLabel = test.normalizeDimensionScores ? ' for expanded assessment' : ''
      issues.push(`${test.id}: expected at least ${minimumTemplateCount} unique question templates${assessmentLabel}, received ${templateIds.size}`)
    }

    const sortedRanges = [...test.resultRanges].sort((left, right) => left.min - right.min)
    if (sortedRanges.length === 0) {
      issues.push(`${test.id}: expected at least 1 result range`)
      continue
    }

    const seenResultIds = new Set<string>()
    sortedRanges.forEach((range, index) => {
      if (seenResultIds.has(range.id)) {
        issues.push(`${test.id}: duplicate result range id: ${range.id}`)
      } else {
        seenResultIds.add(range.id)
      }

      if (range.min > range.max) {
        issues.push(`${test.id}: inverted result range: ${range.id} (${range.min}-${range.max})`)
      }

      const previous = sortedRanges[index - 1]
      if (previous && range.min !== previous.max + 1) {
        issues.push(`${test.id}: discontinuous result ranges between ${previous.id} and ${range.id}`)
      }
    })

    let reachableMin: number | undefined
    let reachableMax: number | undefined
    if (test.scoringModel === 'iq-standard') {
      reachableMin = STANDARD_SCORE_MIN
      reachableMax = STANDARD_SCORE_MAX
    } else {
      const optionTotals: number[] = []
      for (const question of test.questions) {
        for (const option of question.options) {
          optionTotals.push(Object.values(option.scores).reduce((total, score) => total + score, 0))
        }
      }
      if (optionTotals.length > 0) {
        reachableMin = Math.min(...optionTotals) * test.questionCount
        reachableMax = Math.max(...optionTotals) * test.questionCount
      }
    }

    const coveredMin = sortedRanges[0].min
    const coveredMax = sortedRanges[sortedRanges.length - 1].max
    if (
      reachableMin !== undefined
      && reachableMax !== undefined
      && (coveredMin > reachableMin || coveredMax < reachableMax)
    ) {
      issues.push(`${test.id}: result ranges do not cover reachable scores ${reachableMin}-${reachableMax} (covered ${coveredMin}-${coveredMax})`)
    }
  }

  return issues
}
