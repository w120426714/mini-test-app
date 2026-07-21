import { describe, expect, it } from 'vitest'
import type { TestDefinition } from '../types/test'
import { filterTests } from './catalog'
import { tests } from './tests'

describe('filterTests', () => {
  it('finds tests by dimension label', () => {
    const input = tests.filter((test) => ['brain-spark', 'emotional-radar'].includes(test.id))
    const result = filterTests(input, {
      query: '逻辑',
      category: 'all',
      duration: 'all'
    })

    expect(result.map((test) => test.id)).toEqual(['brain-spark'])
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

  it('trims queries before matching', () => {
    const input = tests.filter((test) => ['brain-spark', 'emotional-radar'].includes(test.id))

    expect(filterTests(input, {
      query: '  逻辑  ',
      category: 'all',
      duration: 'all'
    }).map((test) => test.id)).toEqual(['brain-spark'])
  })

  it('matches uppercase IQ text with a lowercase query', () => {
    const input: TestDefinition[] = [
      { ...tests[0], id: 'iq-title', title: 'Quick IQ Profile', subtitle: '', dimensions: [] },
      { ...tests[0], id: 'non-match', title: 'Emotional Balance', subtitle: '', dimensions: [] }
    ]

    expect(filterTests(input, {
      query: 'iq',
      category: 'all',
      duration: 'all'
    }).map((test) => test.id)).toEqual(['iq-title'])
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
