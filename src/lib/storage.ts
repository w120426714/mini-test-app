import Taro from '@tarojs/taro'
import type { TestHistoryItem } from '../types/test'

const HISTORY_KEY = 'mini-test-app:history'
const MAX_HISTORY_ITEMS = 20

export function getHistory(): TestHistoryItem[] {
  try {
    const value = Taro.getStorageSync(HISTORY_KEY)
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function saveHistoryItem(item: TestHistoryItem) {
  try {
    const nextHistory = [item, ...getHistory().filter((history) => history.id !== item.id)]
      .slice(0, MAX_HISTORY_ITEMS)
    Taro.setStorageSync(HISTORY_KEY, nextHistory)
    return true
  } catch {
    return false
  }
}

export function getHistoryItem(historyId: string | undefined) {
  if (!historyId) {
    return undefined
  }

  return getHistory().find((item) => item.id === historyId)
}

export function clearHistory() {
  try {
    Taro.removeStorageSync(HISTORY_KEY)
    return true
  } catch {
    return false
  }
}
