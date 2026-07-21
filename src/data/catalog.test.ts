import { describe, expect, it } from 'vitest'
import type { TestDefinition } from '../types/test'
import { filterTests } from './catalog'
import { tests } from './tests'

describe('filterTests', () => {
  it('finds tests by dimension label', () => {
    const result = filterTests(tests, {
      query: '逻辑',
      category: 'all',
      duration: 'all'
    })

    expect(result.map((test) => test.id)).toContain('brain-spark')
  })

  it('combines category and quick-duration filters', () => {
    const result = filterTests(tests, {
      query: '',
      category: 'eq',
      duration: 'quick'
    })

    expect(result.length).toBeGreaterThan(0)
    expect(result.every((test) => test.category === 'eq' && test.estimatedMinutes <= 3)).toBe(true)
  })

  it('trims queries and compares searchable text without case sensitivity', () => {
    const englishTitleItems: TestDefinition[] = [
      { ...tests[0], title: 'Logic Focus' }
    ]

    expect(filterTests(tests, {
      query: '  逻辑  ',
      category: 'all',
      duration: 'all'
    }).map((test) => test.id)).toContain('brain-spark')
    expect(filterTests(englishTitleItems, {
      query: 'logic',
      category: 'all',
      duration: 'all'
    })).toEqual(englishTitleItems)
  })

  it('lets the all category include tests from different categories', () => {
    const result = filterTests(tests, {
      query: '',
      category: 'all',
      duration: 'all'
    })

    expect(new Set(result.map((test) => test.category)).size).toBeGreaterThan(1)
  })

  it('treats durations over three minutes as standard', () => {
    const result = filterTests(tests, {
      query: '',
      category: 'all',
      duration: 'standard'
    })

    expect(result.length).toBeGreaterThan(0)
    expect(result.every((test) => test.estimatedMinutes > 3)).toBe(true)
  })

  it('preserves input order without mutating the input', () => {
    const input = [tests[2], tests[0], tests[1]]
    const snapshot = [...input]

    const result = filterTests(input, {
      query: '',
      category: 'all',
      duration: 'all'
    })

    expect(result.map((test) => test.id)).toEqual(input.map((test) => test.id))
    expect(input).toEqual(snapshot)
    expect(result).not.toBe(input)
  })
})
