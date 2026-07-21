import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getFavoriteIds, getTheme, setFavorite, setTheme } from './preferences'

const store = new Map<string, unknown>()

vi.mock('@tarojs/taro', () => ({
  default: {
    getStorageSync: (key: string) => store.get(key),
    setStorageSync: (key: string, value: unknown) => store.set(key, value)
  }
}))

describe('preferences storage', () => {
  beforeEach(() => {
    store.clear()
  })

  it('returns almond when no valid theme is stored', () => {
    expect(getTheme()).toBe('almond')
  })

  it('persists a selected theme', () => {
    expect(setTheme('mist')).toBe(true)
    expect(getTheme()).toBe('mist')
  })

  it('adds favorites without duplicates and removes them', () => {
    setFavorite('brain-spark', true)
    setFavorite('brain-spark', true)

    expect(getFavoriteIds()).toEqual(['brain-spark'])

    setFavorite('brain-spark', false)

    expect(getFavoriteIds()).toEqual([])
  })
})
