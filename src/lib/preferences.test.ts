import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getFavoriteIds, getTheme, setFavorite, setTheme } from './preferences'

const store = new Map<string, unknown>()
let getStorageShouldThrow = false
let setStorageShouldThrow = false
let setStorageCallCount = 0

vi.mock('@tarojs/taro', () => ({
  default: {
    getStorageSync: (key: string) => {
      if (getStorageShouldThrow) {
        throw new Error('read failed')
      }

      return store.get(key)
    },
    setStorageSync: (key: string, value: unknown) => {
      setStorageCallCount += 1
      if (setStorageShouldThrow) {
        throw new Error('write failed')
      }

      store.set(key, value)
    }
  }
}))

describe('preferences storage', () => {
  beforeEach(() => {
    store.clear()
    getStorageShouldThrow = false
    setStorageShouldThrow = false
    setStorageCallCount = 0
  })

  it('returns almond when no valid theme is stored', () => {
    expect(getTheme()).toBe('almond')
  })

  it('returns almond when an unsupported theme is stored', () => {
    store.set('mini-test-app:theme:v1', 'violet')

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

  it('filters and deduplicates stored favorite IDs in their original order', () => {
    store.set('mini-test-app:favorites:v1', ['brain-spark', 12, 'night-owl', 'brain-spark'])

    expect(getFavoriteIds()).toEqual(['brain-spark', 'night-owl'])
  })

  it('returns no favorites when the stored value is not an array', () => {
    store.set('mini-test-app:favorites:v1', 'brain-spark')

    expect(getFavoriteIds()).toEqual([])
  })

  it('returns almond when theme storage cannot be read', () => {
    getStorageShouldThrow = true

    expect(getTheme()).toBe('almond')
  })

  it('returns no favorites when favorite storage cannot be read', () => {
    getStorageShouldThrow = true

    expect(getFavoriteIds()).toEqual([])
  })

  it('returns false when theme storage cannot be written', () => {
    setStorageShouldThrow = true

    expect(setTheme('dusk')).toBe(false)
  })

  it('returns false when favorite storage cannot be written', () => {
    setStorageShouldThrow = true

    expect(setFavorite('brain-spark', true)).toBe(false)
  })

  it('does not write favorites when their current value cannot be read', () => {
    getStorageShouldThrow = true

    expect(setFavorite('brain-spark', true)).toBe(false)
    expect(setStorageCallCount).toBe(0)
  })
})
