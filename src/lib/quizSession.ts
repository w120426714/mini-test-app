import Taro from '@tarojs/taro'

const QUIZ_SESSION_VERSION = 1

export interface QuizSession {
  version: typeof QUIZ_SESSION_VERSION
  testId: string
  questionIds: string[]
  answers: Record<string, string>
  currentIndex: number
  updatedAt: string
}

function getQuizSessionKey(testId: string): string {
  return `mini-test-app:quiz-session:v1:${testId}`
}

function isPlainStringRecord(value: unknown): value is Record<string, string> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  if (Object.getPrototypeOf(value) !== Object.prototype) {
    return false
  }

  return Object.entries(value).every(([key, answer]) => typeof key === 'string' && typeof answer === 'string')
}

function isQuizSession(value: unknown, testId: string): value is QuizSession {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  const session = value as Record<string, unknown>
  if (
    session.version !== QUIZ_SESSION_VERSION ||
    session.testId !== testId ||
    !Array.isArray(session.questionIds) ||
    !session.questionIds.every((questionId) => typeof questionId === 'string') ||
    !isPlainStringRecord(session.answers) ||
    !Number.isInteger(session.currentIndex) ||
    typeof session.updatedAt !== 'string'
  ) {
    return false
  }

  const currentIndex = session.currentIndex as number
  const questionIds = session.questionIds as unknown[]
  return questionIds.length === 0 ? currentIndex === 0 : currentIndex >= 0 && currentIndex < questionIds.length
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
