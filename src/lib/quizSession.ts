import Taro from '@tarojs/taro'
import type { QuizSession } from '../types/test'

function getQuizSessionKey(testId: string): string {
  return `mini-test-app:quiz-session:v1:${testId}`
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

function isPlainStringRecord(value: unknown): value is Record<string, string> {
  return isPlainObject(value) && Object.entries(value).every(([key, answer]) => typeof key === 'string' && typeof answer === 'string')
}

function isQuizSession(value: unknown, testId: string): value is QuizSession {
  if (!isPlainObject(value)) {
    return false
  }

  const session = value
  if (
    session.version !== 1 ||
    session.testId !== testId ||
    !Array.isArray(session.questionIds) ||
    session.questionIds.length === 0 ||
    !session.questionIds.every((questionId) => typeof questionId === 'string') ||
    new Set(session.questionIds).size !== session.questionIds.length ||
    !isPlainStringRecord(session.answers) ||
    !Number.isInteger(session.currentIndex) ||
    typeof session.updatedAt !== 'string'
  ) {
    return false
  }

  const currentIndex = session.currentIndex as number
  const questionIds = session.questionIds as string[]
  const answers = session.answers as Record<string, string>
  return currentIndex >= 0 && currentIndex < questionIds.length && Object.keys(answers).every((questionId) => questionIds.includes(questionId))
}

export function getQuizSession(testId: string): QuizSession | undefined {
  try {
    const value = Taro.getStorageSync(getQuizSessionKey(testId))
    return isQuizSession(value, testId) ? value : undefined
  } catch {
    return undefined
  }
}

export function saveQuizSession(session: QuizSession): boolean {
  try {
    Taro.setStorageSync(getQuizSessionKey(session.testId), session)
    return true
  } catch {
    return false
  }
}

export function clearQuizSession(testId: string): boolean {
  try {
    Taro.removeStorageSync(getQuizSessionKey(testId))
    return true
  } catch {
    return false
  }
}
