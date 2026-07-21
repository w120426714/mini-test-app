import Taro from '@tarojs/taro'
import type { ThemeName } from '../types/test'

const THEME_KEY = 'mini-test-app:theme:v1'
const FAVORITES_KEY = 'mini-test-app:favorites:v1'
const themeNames: ThemeName[] = ['almond', 'mist', 'dusk']

export function getTheme(): ThemeName {
  try {
    const value = Taro.getStorageSync(THEME_KEY)
    return themeNames.includes(value as ThemeName) ? (value as ThemeName) : 'almond'
  } catch {
    return 'almond'
  }
}

export function setTheme(theme: ThemeName): boolean {
  try {
    Taro.setStorageSync(THEME_KEY, theme)
    return true
  } catch {
    return false
  }
}

export function getFavoriteIds(): string[] {
  try {
    const value = Taro.getStorageSync(FAVORITES_KEY)
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

export function setFavorite(testId: string, favorite: boolean): boolean {
  try {
    const favoriteIds = getFavoriteIds()
    const nextFavoriteIds = favorite
      ? [...new Set([...favoriteIds, testId])]
      : favoriteIds.filter((id) => id !== testId)
    Taro.setStorageSync(FAVORITES_KEY, nextFavoriteIds)
    return true
  } catch {
    return false
  }
}
