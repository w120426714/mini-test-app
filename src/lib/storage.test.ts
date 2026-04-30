import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { TestHistoryItem } from '../types/test'
import { clearHistory, getHistory, saveHistoryItem } from './storage'

const store = new Map<string, unknown>()

vi.mock('@tarojs/taro', () => ({
  default: {
    getStorageSync: (key: string) => store.get(key),
    setStorageSync: (key: string, value: unknown) => store.set(key, value),
    removeStorageSync: (key: string) => store.delete(key)
  }
}))

const historyItem: TestHistoryItem = {
  id: 'history-1',
  testId: 'emotional-radar',
  resultRangeId: 'steady-anchor',
  score: 28,
  dimensionScores: { empathy: 8, stability: 10, expression: 10 },
  completedAt: '2026-04-30T00:00:00.000Z'
}

describe('history storage', () => {
  beforeEach(() => {
    store.clear()
  })

  it('returns an empty array when no history exists', () => {
    expect(getHistory()).toEqual([])
  })

  it('saves newest history first', () => {
    saveHistoryItem(historyItem)
    saveHistoryItem({ ...historyItem, id: 'history-2', score: 18 })

    expect(getHistory().map((item) => item.id)).toEqual(['history-2', 'history-1'])
  })

  it('clears history', () => {
    saveHistoryItem(historyItem)
    clearHistory()

    expect(getHistory()).toEqual([])
  })
})
