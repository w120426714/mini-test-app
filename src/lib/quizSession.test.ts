import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { QuizSession } from '../types/test'
import {
  clearQuizSession,
  getQuizSession,
  saveQuizSession
} from './quizSession'

const { store, getStorageSync, setStorageSync, removeStorageSync } = vi.hoisted(() => {
  const storage = new Map<string, unknown>()
  return {
    store: storage,
    getStorageSync: vi.fn((key: string) => storage.get(key)),
    setStorageSync: vi.fn((key: string, value: unknown) => storage.set(key, value)),
    removeStorageSync: vi.fn((key: string) => storage.delete(key))
  }
})

vi.mock('@tarojs/taro', () => ({
  default: { getStorageSync, setStorageSync, removeStorageSync }
}))

const testId = 'brain-spark'
const storageKey = 'mini-test-app:quiz-session:v1:brain-spark'
const session: QuizSession = {
  version: 1,
  testId,
  questionIds: ['q-1', 'q-2'],
  answers: { 'q-1': 'q-1-a' },
  currentIndex: 1,
  updatedAt: '2026-07-21T00:00:00.000Z'
}

describe('quiz session storage', () => {
  beforeEach(() => {
    store.clear()
    vi.clearAllMocks()
    getStorageSync.mockImplementation((key) => store.get(key))
    setStorageSync.mockImplementation((key, value) => store.set(key, value))
    removeStorageSync.mockImplementation((key) => store.delete(key))
  })

  it('round-trips a valid session', () => {
    expect(saveQuizSession(session)).toBe(true)
    expect(getQuizSession(testId)).toEqual(session)
    expect(setStorageSync).toHaveBeenCalledWith(storageKey, session)
  })

  it('returns undefined for a damaged session object', () => {
    store.set(storageKey, { testId })

    expect(getQuizSession(testId)).toBeUndefined()
  })

  it('returns undefined after clearing a session', () => {
    saveQuizSession(session)
    expect(clearQuizSession(testId)).toBe(true)

    expect(getQuizSession(testId)).toBeUndefined()
  })

  it.each([
    ['version is invalid', { ...session, version: 2 }],
    ['test id does not match the query', { ...session, testId: 'other-test' }],
    ['question ids contain a non-string', { ...session, questionIds: ['q-1', 2] }],
    ['question ids contain duplicates', { ...session, questionIds: ['q-1', 'q-1'] }],
    ['question ids are empty', { ...session, questionIds: [], currentIndex: 0 }],
    ['answers are an array', { ...session, answers: [] }],
    ['answers are null', { ...session, answers: null }],
    ['an answer is not a string', { ...session, answers: { 'q-1': 1 } }],
    ['an answer key is not a question id', { ...session, answers: { 'q-3': 'q-3-a' } }],
    ['current index is negative', { ...session, currentIndex: -1 }],
    ['current index is not an integer', { ...session, currentIndex: 0.5 }],
    ['current index equals question count', { ...session, currentIndex: 2 }],
    ['updatedAt is not a string', { ...session, updatedAt: 1 }]
  ])('returns undefined when %s', (_description, invalidSession) => {
    store.set(storageKey, invalidSession)

    expect(getQuizSession(testId)).toBeUndefined()
  })

  it('accepts null-prototype session and answers objects', () => {
    const nullPrototypeSession = Object.assign(Object.create(null), session, {
      answers: Object.assign(Object.create(null), session.answers)
    })
    store.set(storageKey, nullPrototypeSession)

    expect(getQuizSession(testId)).toEqual(session)
  })

  it('returns undefined for a non-plain root object', () => {
    class SessionRecord {}
    store.set(storageKey, Object.assign(new SessionRecord(), session))

    expect(getQuizSession(testId)).toBeUndefined()
  })

  it('returns undefined for non-plain answers', () => {
    class AnswersRecord {}
    store.set(storageKey, { ...session, answers: Object.assign(new AnswersRecord(), session.answers) })

    expect(getQuizSession(testId)).toBeUndefined()
  })

  it('returns safe values when storage operations throw', () => {
    getStorageSync.mockImplementation(() => {
      throw new Error('read failure')
    })
    expect(getQuizSession(testId)).toBeUndefined()

    setStorageSync.mockImplementation(() => {
      throw new Error('write failure')
    })
    expect(saveQuizSession(session)).toBe(false)

    removeStorageSync.mockImplementation(() => {
      throw new Error('delete failure')
    })
    expect(clearQuizSession(testId)).toBe(false)
  })
})
