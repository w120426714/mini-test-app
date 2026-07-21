# Mini Test App Experience Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a polished, themeable, one-stop assessment experience with 12 assessments, 6,000 candidate questions, search, favorites, resumable quizzes, richer reports, and verified WeChat/H5/Alipay builds.

**Architecture:** Keep the app frontend-only. Split discovery metadata from assessment data, place persistence behind focused modules, and keep pages as composition layers over pure catalog, scoring, and session APIs. Preserve the existing history schema while adding optional session, favorite, and theme records under versioned storage keys.

**Tech Stack:** Taro 4.2, React 18, TypeScript, Sass, Vitest, synchronous Taro local storage.

---

## File Structure

- `src/types/test.ts`: shared catalog, session, theme, and report types.
- `src/data/assessments/core.ts`: the six existing assessment definitions, moved without content changes.
- `src/data/assessments/expanded.ts`: the six new assessment definitions and seed content.
- `src/data/assessments/expandedFactory.ts`: converts explicit secondary-assessment configs into 500-question banks.
- `src/data/tests.ts`: the stable public catalog facade used by pages.
- `src/data/catalog.ts`: pure search, filtering, sorting, and recommendation logic.
- `src/data/catalog.test.ts`: catalog behavior tests.
- `src/data/catalogValidation.ts`: catalog integrity validation.
- `src/data/catalogValidation.test.ts`: count, ID, range, domain, and difficulty validation tests.
- `src/lib/preferences.ts`: favorites and theme persistence.
- `src/lib/preferences.test.ts`: preference persistence tests.
- `src/lib/quizSession.ts`: active quiz session persistence and recovery.
- `src/lib/quizSession.test.ts`: session persistence and corruption tests.
- `src/lib/storage.ts`: existing report history plus full local-data clearing.
- `src/lib/storage.test.ts`: legacy history and clearing tests.
- `src/lib/theme.ts`: theme metadata and page class application.
- `src/components/SearchField/*`: controlled catalog search input.
- `src/components/CategoryShortcuts/*`: compact goal/category entry points.
- `src/components/ThemePicker/*`: the three approved skins.
- `src/components/AssessmentRow/*`: flat assessment list row with favorite state.
- `src/components/ResumeBanner/*`: one-tap resume entry.
- `src/components/EmptyState/*`: reusable empty/error/recovery presentation.
- `src/components/TestCard/*`: updated featured-assessment presentation.
- `src/pages/home/*`: recommendation, search entry, quick goals, resume, and popular list.
- `src/pages/test-list/*`: searchable/filterable assessment library.
- `src/pages/test-detail/*`: start/resume validation and assessment facts.
- `src/pages/quiz/*`: persisted navigation, answer editing, and safe completion.
- `src/pages/result/*`: dimension interpretation and objective explanations.
- `src/pages/profile/*`: reports, favorites, unfinished sessions, themes, and data clearing.
- `src/app.scss`: cross-platform design tokens and global typography.
- `README.md`: updated feature, test, build, and safety documentation.

## Task 1: Establish Shared Types and Verification Commands

**Files:**
- Modify: `src/types/test.ts`
- Modify: `package.json`

- [ ] **Step 1: Add a type-check script**

Add this script beside `test`:

```json
"typecheck": "tsc --noEmit"
```

- [ ] **Step 2: Add the new shared types**

Append these definitions to `src/types/test.ts`:

```ts
export type ThemeName = 'almond' | 'mist' | 'dusk'

export type DurationFilter = 'all' | 'quick' | 'standard'

export interface CatalogFilters {
  query: string
  category: TestCategory | 'all'
  duration: DurationFilter
}

export interface QuizSession {
  version: 1
  testId: string
  questionIds: string[]
  answers: Record<string, string>
  currentIndex: number
  updatedAt: string
}
```

- [ ] **Step 3: Run type checking**

Run: `npm run typecheck`

Expected: exit code 0 with no TypeScript diagnostics.

- [ ] **Step 4: Commit**

```bash
git add package.json src/types/test.ts
git commit -m "chore: add expansion types and typecheck"
```

## Task 2: Add Theme and Favorite Persistence

**Files:**
- Create: `src/lib/preferences.ts`
- Create: `src/lib/preferences.test.ts`

- [ ] **Step 1: Write failing preference tests**

Create `src/lib/preferences.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getFavoriteIds, getTheme, setFavorite, setTheme } from './preferences'

const store = new Map<string, unknown>()

vi.mock('@tarojs/taro', () => ({
  default: {
    getStorageSync: (key: string) => store.get(key),
    setStorageSync: (key: string, value: unknown) => store.set(key, value)
  }
}))

describe('preferences', () => {
  beforeEach(() => store.clear())

  it('uses almond when no valid theme is stored', () => {
    expect(getTheme()).toBe('almond')
  })

  it('persists a supported theme', () => {
    expect(setTheme('mist')).toBe(true)
    expect(getTheme()).toBe('mist')
  })

  it('adds and removes favorite ids without duplicates', () => {
    setFavorite('brain-spark', true)
    setFavorite('brain-spark', true)
    expect(getFavoriteIds()).toEqual(['brain-spark'])
    setFavorite('brain-spark', false)
    expect(getFavoriteIds()).toEqual([])
  })
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npx vitest run src/lib/preferences.test.ts`

Expected: FAIL because `./preferences` does not exist.

- [ ] **Step 3: Implement preferences**

Create `src/lib/preferences.ts`:

```ts
import Taro from '@tarojs/taro'
import type { ThemeName } from '../types/test'

const THEME_KEY = 'mini-test-app:theme:v1'
const FAVORITES_KEY = 'mini-test-app:favorites:v1'
const THEMES: ThemeName[] = ['almond', 'mist', 'dusk']

export function getTheme(): ThemeName {
  try {
    const value = Taro.getStorageSync(THEME_KEY)
    return THEMES.includes(value) ? value : 'almond'
  } catch {
    return 'almond'
  }
}

export function setTheme(theme: ThemeName) {
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

export function setFavorite(testId: string, favorite: boolean) {
  try {
    const current = getFavoriteIds()
    const next = favorite
      ? Array.from(new Set([...current, testId]))
      : current.filter((id) => id !== testId)
    Taro.setStorageSync(FAVORITES_KEY, next)
    return true
  } catch {
    return false
  }
}
```

- [ ] **Step 4: Run the preference tests**

Run: `npx vitest run src/lib/preferences.test.ts`

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/preferences.ts src/lib/preferences.test.ts
git commit -m "feat: persist themes and favorites"
```

## Task 3: Add Resumable Quiz Sessions

**Files:**
- Create: `src/lib/quizSession.ts`
- Create: `src/lib/quizSession.test.ts`

- [ ] **Step 1: Write failing session tests**

Create `src/lib/quizSession.test.ts` with tests for save, load, remove, and corrupt data:

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { QuizSession } from '../types/test'
import { clearQuizSession, getQuizSession, saveQuizSession } from './quizSession'

const store = new Map<string, unknown>()

vi.mock('@tarojs/taro', () => ({
  default: {
    getStorageSync: (key: string) => store.get(key),
    setStorageSync: (key: string, value: unknown) => store.set(key, value),
    removeStorageSync: (key: string) => store.delete(key)
  }
}))

const session: QuizSession = {
  version: 1,
  testId: 'brain-spark',
  questionIds: ['q-1', 'q-2'],
  answers: { 'q-1': 'q-1-a' },
  currentIndex: 1,
  updatedAt: '2026-07-21T00:00:00.000Z'
}

describe('quiz session storage', () => {
  beforeEach(() => store.clear())

  it('round-trips a valid session', () => {
    expect(saveQuizSession(session)).toBe(true)
    expect(getQuizSession('brain-spark')).toEqual(session)
  })

  it('rejects a corrupt session', () => {
    store.set('mini-test-app:quiz-session:v1:brain-spark', { testId: 'brain-spark' })
    expect(getQuizSession('brain-spark')).toBeUndefined()
  })

  it('clears one assessment session', () => {
    saveQuizSession(session)
    clearQuizSession('brain-spark')
    expect(getQuizSession('brain-spark')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npx vitest run src/lib/quizSession.test.ts`

Expected: FAIL because `./quizSession` does not exist.

- [ ] **Step 3: Implement validated session storage**

Create `src/lib/quizSession.ts` with these public functions:

```ts
import Taro from '@tarojs/taro'
import type { QuizSession } from '../types/test'

const keyFor = (testId: string) => `mini-test-app:quiz-session:v1:${testId}`

function isQuizSession(value: unknown): value is QuizSession {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<QuizSession>
  return item.version === 1
    && typeof item.testId === 'string'
    && Array.isArray(item.questionIds)
    && item.questionIds.every((id) => typeof id === 'string')
    && item.answers !== null
    && typeof item.answers === 'object'
    && Number.isInteger(item.currentIndex)
    && typeof item.updatedAt === 'string'
}

export function getQuizSession(testId: string) {
  try {
    const value = Taro.getStorageSync(keyFor(testId))
    return isQuizSession(value) ? value : undefined
  } catch {
    return undefined
  }
}

export function saveQuizSession(session: QuizSession) {
  try {
    Taro.setStorageSync(keyFor(session.testId), session)
    return true
  } catch {
    return false
  }
}

export function clearQuizSession(testId: string) {
  try {
    Taro.removeStorageSync(keyFor(testId))
    return true
  } catch {
    return false
  }
}
```

- [ ] **Step 4: Run session and existing storage tests**

Run: `npx vitest run src/lib/quizSession.test.ts src/lib/storage.test.ts`

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/quizSession.ts src/lib/quizSession.test.ts
git commit -m "feat: persist resumable quiz sessions"
```

## Task 4: Split the Catalog and Add Discovery Helpers

**Files:**
- Move: `src/data/tests.ts` to `src/data/assessments/core.ts`
- Create: `src/data/tests.ts`
- Create: `src/data/catalog.ts`
- Create: `src/data/catalog.test.ts`

- [ ] **Step 1: Write failing catalog tests**

Create `src/data/catalog.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { filterTests } from './catalog'
import { tests } from './tests'

describe('catalog discovery', () => {
  it('matches title and dimension labels case-insensitively', () => {
    expect(filterTests(tests, { query: '逻辑', category: 'all', duration: 'all' })
      .some((test) => test.id === 'brain-spark')).toBe(true)
  })

  it('combines category and quick-duration filters', () => {
    const result = filterTests(tests, { query: '', category: 'eq', duration: 'quick' })
    expect(result.every((test) => test.category === 'eq' && test.estimatedMinutes <= 3)).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npx vitest run src/data/catalog.test.ts`

Expected: FAIL because `filterTests` does not exist.

- [ ] **Step 3: Move the existing data module**

Run:

```bash
git mv src/data/tests.ts src/data/assessments/core.ts
```

In `core.ts`, change imports to `../../types/test` and `../questionBanks`, rename `tests` to `coreTests`, and remove the three lookup functions at the bottom.

- [ ] **Step 4: Create the facade and filter implementation**

Create `src/data/tests.ts`:

```ts
import type { TestCategory } from '../types/test'
import { coreTests } from './assessments/core'
import { expandedTests } from './assessments/expanded'

export const categoryLabels: Record<TestCategory, string> = {
  iq: '智商', eq: '情商', personality: '性格', romance: '恋爱', wealth: '财富', workplace: '职场'
}

export const tests = [...coreTests, ...expandedTests]
export const getTestById = (testId: string | undefined) => tests.find((test) => test.id === testId)
export const getTestsByCategory = (category: TestCategory) => tests.filter((test) => test.category === category)
export const getRecommendedTest = () => tests[0]
```

Create `src/data/catalog.ts`:

```ts
import type { CatalogFilters, TestDefinition } from '../types/test'

export function filterTests(items: TestDefinition[], filters: CatalogFilters) {
  const query = filters.query.trim().toLocaleLowerCase()
  return items.filter((test) => {
    const searchable = [test.title, test.subtitle, ...test.dimensions.map((item) => item.label)]
      .join(' ')
      .toLocaleLowerCase()
    const categoryMatch = filters.category === 'all' || test.category === filters.category
    const durationMatch = filters.duration === 'all'
      || (filters.duration === 'quick' && test.estimatedMinutes <= 3)
      || (filters.duration === 'standard' && test.estimatedMinutes > 3)
    return categoryMatch && durationMatch && (!query || searchable.includes(query))
  })
}
```

Temporarily create `src/data/assessments/expanded.ts` containing `export const expandedTests = []` until Task 5 fills it.

- [ ] **Step 5: Run tests and commit**

Run: `npx vitest run src/data/catalog.test.ts src/data/questionBanks.test.ts`

Expected: all tests pass.

```bash
git add src/data
git commit -m "refactor: split assessment catalog"
```

## Task 5: Expand to 12 Validated Assessments

**Files:**
- Modify: `src/data/assessments/expanded.ts`
- Create: `src/data/assessments/expandedFactory.ts`
- Create: `src/data/catalogValidation.ts`
- Create: `src/data/catalogValidation.test.ts`

- [ ] **Step 1: Write failing catalog integrity tests**

Create `src/data/catalogValidation.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { tests } from './tests'
import { validateCatalog } from './catalogValidation'

describe('assessment catalog integrity', () => {
  it('contains twelve assessments and six thousand candidate questions', () => {
    expect(tests).toHaveLength(12)
    expect(tests.reduce((sum, test) => sum + test.questions.length, 0)).toBe(6000)
  })

  it('has no validation errors', () => {
    expect(validateCatalog(tests)).toEqual([])
  })
})
```

- [ ] **Step 2: Run the integrity test and verify failure**

Run: `npx vitest run src/data/catalogValidation.test.ts`

Expected: FAIL because only six assessments exist and `validateCatalog` is missing.

- [ ] **Step 3: Implement the validator**

Create `src/data/catalogValidation.ts` with deterministic error messages:

```ts
import type { TestDefinition } from '../types/test'

export function validateCatalog(tests: TestDefinition[]) {
  const errors: string[] = []
  const testIds = new Set<string>()
  for (const test of tests) {
    if (testIds.has(test.id)) errors.push(`duplicate test id: ${test.id}`)
    testIds.add(test.id)
    if (test.questions.length !== 500) errors.push(`${test.id}: expected 500 questions`)
    const questionIds = new Set<string>()
    for (const question of test.questions) {
      if (questionIds.has(question.id)) errors.push(`${test.id}: duplicate question ${question.id}`)
      questionIds.add(question.id)
      if (question.options.length < 2) errors.push(`${question.id}: expected at least two options`)
      if (question.correctOptionId && !question.options.some((option) => option.id === question.correctOptionId)) {
        errors.push(`${question.id}: invalid correct option`)
      }
    }
    const ranges = [...test.resultRanges].sort((left, right) => left.min - right.min)
    ranges.forEach((range, index) => {
      if (index > 0 && range.min !== ranges[index - 1].max + 1) {
        errors.push(`${test.id}: result ranges are not continuous`)
      }
    })
  }
  return errors
}
```

- [ ] **Step 4: Implement the expanded-assessment factory**

Create `expandedFactory.ts` with `ExpandedAssessmentConfig` and `createExpandedAssessment(config): TestDefinition`. Each prompt produces three options: option A scores 3 on the first domain and 1 on the second, option B scores 3 on the second domain, and option C scores 2 on the third domain. The factory calls `buildAssessmentBank` with `targetCount: 500`, uses `questionCount: 8`, `estimatedMinutes: 3`, and creates these continuous ranges:

```ts
import type { TestCategory, TestDefinition, TestQuestion } from '../../types/test'
import { buildAssessmentBank } from '../questionBanks'

type DomainConfig = [key: string, label: string]

export interface ExpandedAssessmentConfig {
  id: string
  category: TestCategory
  title: string
  subtitle: string
  domains: [DomainConfig, DomainConfig, DomainConfig]
  prompts: string[]
  resultTitles: [string, string, string]
  suggestions: [[string, string], [string, string], [string, string]]
}

export function createExpandedAssessment(config: ExpandedAssessmentConfig): TestDefinition {
  const [first, second, third] = config.domains
  const seeds: TestQuestion[] = config.prompts.map((title, index) => {
    const id = `${config.id}-seed-${index + 1}`
    return {
      id,
      testId: config.id,
      title,
      domain: config.domains[index % config.domains.length][0],
      difficulty: ((index % 5) + 1) as 1 | 2 | 3 | 4 | 5,
      options: [
        { id: `${id}-a`, label: '先观察和整理，再决定下一步', scores: { [first[0]]: 3, [second[0]]: 1 } },
        { id: `${id}-b`, label: '根据当下感受快速调整', scores: { [second[0]]: 3 } },
        { id: `${id}-c`, label: '先确认长期影响和真实价值', scores: { [third[0]]: 2 } }
      ]
    }
  })
  const range = (suffix: string, min: number, max: number, title: string, suggestions: [string, string]) => ({
    id: `${config.id}-${suffix}`,
    min,
    max,
    title,
    tagline: `你的${title}特征值得继续观察。`,
    description: '结果用于娱乐和自我反思，不构成临床、财务或职业诊断。',
    suggestions
  })
  return {
    id: config.id,
    title: config.title,
    subtitle: config.subtitle,
    category: config.category,
    description: `${config.subtitle}。每次从原创情境题库中分层随机抽取题目。`,
    questionCount: 8,
    estimatedMinutes: 3,
    popularity: '新上线',
    coverTone: 'forest',
    bankSize: 500,
    bankSource: '原创日常情境题库，结果仅供娱乐和自我反思',
    dimensions: config.domains.map(([key, label]) => ({ key, label })),
    questions: buildAssessmentBank({ testId: config.id, seedQuestions: seeds, domains: config.domains.map(([key]) => key), targetCount: 500 }),
    resultRanges: [
      range('emerging', 0, 21, config.resultTitles[0], config.suggestions[0]),
      range('balanced', 22, 27, config.resultTitles[1], config.suggestions[1]),
      range('strong', 28, 40, config.resultTitles[2], config.suggestions[2])
    ]
  }
}
```

- [ ] **Step 5: Add the six explicit content configs**

Create `expanded.ts` with these complete content inputs and map them through `createExpandedAssessment`:

```ts
const configs: ExpandedAssessmentConfig[] = [
  {
    id: 'focus-lab', category: 'iq', title: '专注力实验室',
    subtitle: '观察你的注意、记忆与反应节奏',
    domains: [['attention', '注意控制'], ['memory', '工作记忆'], ['speed', '反应速度']],
    prompts: [
      '阅读一段较长说明时，你通常如何抓住重点？',
      '连续处理多个数字时，你最常采用什么方法？',
      '环境里突然出现声音时，你会怎样继续当前任务？',
      '需要记住临时验证码时，你通常怎么做？',
      '面对限时选择题时，你更接近哪种节奏？',
      '任务被消息打断后，你通常如何回来？',
      '发现题目中有干扰信息时，你会怎么处理？',
      '连续完成相似任务时，你如何保持准确？'
    ],
    resultTitles: ['节奏观察者', '稳定专注者', '高效聚焦者'],
    suggestions: [['减少同时进行的任务', '用短时段练习持续注意'], ['保持固定复盘节奏', '为高负荷任务预留休息'], ['尝试更复杂的工作记忆训练', '避免用速度替代检查']]
  },
  {
    id: 'social-signal', category: 'eq', title: '社交信号测试',
    subtitle: '读懂共情、边界与表达方式',
    domains: [['empathy', '共情'], ['boundary', '边界'], ['expression', '表达']],
    prompts: [
      '朋友回复变短时，你通常先做什么？',
      '群聊中出现分歧时，你更可能怎样回应？',
      '别人向你提出不舒服的请求时，你会怎么做？',
      '需要拒绝熟人时，你倾向怎样表达？',
      '同事明显情绪低落时，你会如何靠近？',
      '被误解后，你通常先解释事实还是感受？',
      '讨论敏感话题时，你如何确认对方状态？',
      '关系出现沉默时，你更可能采取什么行动？'
    ],
    resultTitles: ['信号探索者', '关系协调者', '清晰连接者'],
    suggestions: [['先确认事实再判断情绪', '练习简短表达需求'], ['保持共情与边界平衡', '在冲突后主动复盘'], ['为对方保留回应空间', '避免替别人承担全部情绪']]
  },
  {
    id: 'resilience-map', category: 'personality', title: '心理韧性地图',
    subtitle: '看看你如何恢复、期待与适应变化',
    domains: [['recovery', '恢复'], ['optimism', '积极预期'], ['adaptation', '适应']],
    prompts: [
      '计划失败后的第一天，你通常如何安排自己？',
      '收到负面反馈时，你最先关注什么？',
      '长期目标进展缓慢时，你会怎样调整？',
      '进入陌生环境时，你如何建立安全感？',
      '连续遇到小挫折时，你更可能怎么做？',
      '重要机会落空后，你如何看待下一步？',
      '生活节奏突然变化时，你会先改变什么？',
      '压力过去后，你通常会不会复盘？'
    ],
    resultTitles: ['柔性恢复者', '稳步调节者', '韧性成长者'],
    suggestions: [['建立可重复的恢复仪式', '把大问题拆成一天的行动'], ['记录有效的调整方式', '接受恢复速度有波动'], ['给自己安排真正的停顿', '帮助别人前先确认自身余量']]
  },
  {
    id: 'attachment-weather', category: 'romance', title: '依恋天气测试',
    subtitle: '观察安全感、靠近与独立的平衡',
    domains: [['security', '安全感'], ['closeness', '亲密'], ['independence', '独立']],
    prompts: [
      '对方暂时没有回复时，你通常怎样理解？',
      '发生争执后，你希望多久开始修复？',
      '两个人兴趣不同时，你会如何安排时间？',
      '对方需要独处时，你通常怎么回应？',
      '关系进入平淡期时，你会做什么？',
      '表达脆弱感受时，你最在意什么？',
      '共同决定重要事项时，你希望怎样参与？',
      '亲密关系影响个人计划时，你会如何权衡？'
    ],
    resultTitles: ['靠近练习者', '稳定同行者', '自在连接者'],
    suggestions: [['把担心转换成具体请求', '练习保留个人生活节奏'], ['定期确认双方真实需求', '不要用沉默代替稳定'], ['在独立之外主动表达在乎', '冲突时先回应感受再解决问题']]
  },
  {
    id: 'spending-style', category: 'wealth', title: '消费决策画像',
    subtitle: '了解规划、冲动与价值判断',
    domains: [['planning', '规划'], ['impulse', '冲动控制'], ['value', '价值判断']],
    prompts: [
      '看到限时折扣时，你通常先确认什么？',
      '准备购买高价物品时，你会做哪些比较？',
      '预算快用完时出现聚会邀请，你会怎么选？',
      '买到不合适的东西后，你通常如何处理？',
      '面对新潮产品时，你更重视哪类信息？',
      '收入增加后，你最可能先调整什么？',
      '订阅服务自动续费前，你会不会检查？',
      '朋友推荐投资或消费机会时，你会怎么判断？'
    ],
    resultTitles: ['消费观察者', '理性平衡者', '价值规划者'],
    suggestions: [['建立二十四小时冷静清单', '每周查看一次小额支出'], ['保留弹性娱乐预算', '定期清理低使用率订阅'], ['避免因过度比较消耗时间', '为长期目标设置自动储蓄']]
  },
  {
    id: 'career-values', category: 'workplace', title: '职业价值观测试',
    subtitle: '定位成长、自主与影响力偏好',
    domains: [['growth', '成长'], ['autonomy', '自主'], ['impact', '影响']],
    prompts: [
      '选择新项目时，你最先看重什么？',
      '工作方法被严格规定时，你会有什么感受？',
      '获得晋升机会时，你最期待哪种变化？',
      '团队目标与你的成长方向冲突时，你会怎么做？',
      '完成一项工作后，什么最让你有成就感？',
      '面对重复性任务时，你通常如何保持投入？',
      '选择合作伙伴时，你最重视哪种特质？',
      '规划下一阶段职业路径时，你先考虑什么？'
    ],
    resultTitles: ['价值探索者', '路径建造者', '方向驱动者'],
    suggestions: [['记录让你投入的工作场景', '用小项目验证职业偏好'], ['把成长目标写进季度计划', '与团队明确自主决策范围'], ['补充细节执行和反馈机制', '让影响力建立在可持续节奏上']]
  }
]

export const expandedTests = configs.map(createExpandedAssessment)
```

- [ ] **Step 6: Run integrity and full business tests**

Run: `npm test`

Expected: catalog count is 12, total generated questions are 6,000, validator returns no errors, and all existing tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/data/assessments/expanded.ts src/data/assessments/expandedFactory.ts src/data/catalogValidation.ts src/data/catalogValidation.test.ts
git commit -m "feat: expand validated assessment catalog"
```

## Task 6: Implement the Three-Skin Design System

**Files:**
- Create: `src/lib/theme.ts`
- Create: `src/components/ThemePicker/index.tsx`
- Create: `src/components/ThemePicker/index.scss`
- Modify: `src/app.ts`
- Modify: `src/app.scss`

- [ ] **Step 1: Add theme metadata**

Create `src/lib/theme.ts`:

```ts
import type { ThemeName } from '../types/test'

export const themes: Array<{ id: ThemeName; label: string }> = [
  { id: 'almond', label: '杏仁暖白' },
  { id: 'mist', label: '晨雾青' },
  { id: 'dusk', label: '暮色蓝' }
]

export const themeClassName = (theme: ThemeName) => `theme-${theme}`
```

- [ ] **Step 2: Apply persisted theme at app startup**

Update `src/app.ts` so `useLaunch` reads `getTheme()` and calls `Taro.getCurrentInstance().page?.setData` only if required by the target; otherwise pages use a root `theme-${getTheme()}` class. Keep storage access inside `preferences.ts`.

- [ ] **Step 3: Build the theme picker**

`ThemePicker` receives `value: ThemeName` and `onChange: (theme: ThemeName) => void`, renders the three labels from `themes`, and marks the active item with `is-active`.

- [ ] **Step 4: Replace global hard-coded colors with tokens**

Define `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-primary`, `--color-primary-soft`, `--radius-card`, `--space-page`, and three theme overrides in `app.scss`. Use the approved system font stack for body text and `Noto Serif SC`, `Songti SC`, serif only on `.display-title`.

- [ ] **Step 5: Verify and commit**

Run: `npm run typecheck`

Expected: no diagnostics.

```bash
git add src/app.ts src/app.scss src/lib/theme.ts src/components/ThemePicker
git commit -m "feat: add persistent three-skin design system"
```

## Task 7: Build Reusable Discovery Components and Redesign Home

**Files:**
- Create: `src/components/SearchField/index.tsx`
- Create: `src/components/SearchField/index.scss`
- Create: `src/components/CategoryShortcuts/index.tsx`
- Create: `src/components/CategoryShortcuts/index.scss`
- Create: `src/components/ResumeBanner/index.tsx`
- Create: `src/components/ResumeBanner/index.scss`
- Modify: `src/components/TestCard/index.tsx`
- Modify: `src/components/TestCard/index.scss`
- Modify: `src/pages/home/index.tsx`
- Modify: `src/pages/home/index.scss`

- [ ] **Step 1: Implement controlled, accessible component contracts**

Use these props exactly:

```ts
interface SearchFieldProps { value: string; placeholder: string; onChange: (value: string) => void; onConfirm?: () => void }
interface CategoryShortcutsProps { onSelect: (category: TestCategory) => void }
interface ResumeBannerProps { test: TestDefinition; progressText: string; onResume: () => void }
```

- [ ] **Step 2: Flatten TestCard visual structure**

Keep one surface, one badge, title, subtitle, compact metadata, and one action label. Remove decorative pseudo-elements and nested pill groups that compete with the primary action.

- [ ] **Step 3: Compose the approved Home hierarchy**

Render in this order: brand/search row, editorial recommendation hero, four shortcuts, resume banner when a valid session exists, and two popular assessment rows. Search confirmation switches to the test-list tab with a query parameter.

- [ ] **Step 4: Verify two-action start paths**

Manually verify:

1. Home → recommendation → Start.
2. Home → category shortcut → assessment.
3. Home → Resume → current question.

Expected: each path reaches a quiz start or resume action in no more than two taps after the initial Home view.

- [ ] **Step 5: Build and commit**

Run: `npm run build:weapp`

Expected: successful compilation with no missing component or Sass errors.

```bash
git add src/components/SearchField src/components/CategoryShortcuts src/components/ResumeBanner src/components/TestCard src/pages/home
git commit -m "feat: redesign one-stop home discovery"
```

## Task 8: Build the Searchable Assessment Library

**Files:**
- Create: `src/components/AssessmentRow/index.tsx`
- Create: `src/components/AssessmentRow/index.scss`
- Create: `src/components/EmptyState/index.tsx`
- Create: `src/components/EmptyState/index.scss`
- Modify: `src/pages/test-list/index.tsx`
- Modify: `src/pages/test-list/index.scss`
- Modify: `src/pages/test-detail/index.tsx`
- Modify: `src/pages/test-detail/index.scss`

- [ ] **Step 1: Add a flat assessment row contract**

```ts
interface AssessmentRowProps {
  test: TestDefinition
  favorite: boolean
  progressText?: string
  onOpen: () => void
  onToggleFavorite: () => void
}
```

- [ ] **Step 2: Wire library filters to `filterTests`**

Initialize filters as `{ query: '', category: 'all', duration: 'all' }`. Render search, category chips, duration controls, then filtered results. Update favorite state only after `setFavorite` succeeds.

- [ ] **Step 3: Add empty and recovery states**

When no results match, show `EmptyState` with “没有找到匹配的测评” and a reset action that restores the initial filters. Unknown detail IDs return to the library.

- [ ] **Step 4: Add start-or-resume logic to detail**

If `getQuizSession(test.id)` returns a valid session, show separate “继续测评” and “重新开始” actions. “重新开始” clears the existing session before navigating.

- [ ] **Step 5: Verify and commit**

Run: `npm run typecheck && npm run build:weapp`

Expected: both commands succeed.

```bash
git add src/components/AssessmentRow src/components/EmptyState src/pages/test-list src/pages/test-detail
git commit -m "feat: add searchable assessment library"
```

## Task 9: Integrate Safe Quiz Resume and Answer Revision

**Files:**
- Modify: `src/pages/quiz/index.tsx`
- Modify: `src/pages/quiz/index.scss`
- Modify: `src/lib/questionPicker.test.ts`

- [ ] **Step 1: Add a restoration test for stable question IDs**

Extend `questionPicker.test.ts` to assert that mapping saved IDs through a test's questions preserves saved order and excludes missing IDs.

- [ ] **Step 2: Initialize from a saved session or create a new one**

On first render:

1. Read `getQuizSession(test.id)`.
2. Restore questions by `questionIds` when every saved ID resolves.
3. Otherwise call `selectQuestionsForRun(test)` and create version 1 session state.

- [ ] **Step 3: Persist after every navigation change**

Save `testId`, ordered question IDs, answers, bounded current index, and a new ISO timestamp after selecting an option or moving backward. Show a toast if persistence fails, but keep in-memory answers.

- [ ] **Step 4: Make completion explicit and safe**

Do not auto-submit on the final option tap. Show a summary action on the last question. If `Object.keys(answers).length !== runQuestions.length`, navigate to the first unanswered question. Save the report first, then clear the session, then navigate to the result.

- [ ] **Step 5: Run tests and commit**

Run: `npm test`

Expected: all tests pass, including session and question-order cases.

```bash
git add src/pages/quiz src/lib/questionPicker.test.ts
git commit -m "feat: add safe resumable quiz flow"
```

## Task 10: Enrich Reports and Make Profile the One-Stop Hub

**Files:**
- Modify: `src/components/ResultPanel/index.tsx`
- Modify: `src/components/ResultPanel/index.scss`
- Modify: `src/pages/result/index.tsx`
- Modify: `src/pages/result/index.scss`
- Modify: `src/pages/profile/index.tsx`
- Modify: `src/pages/profile/index.scss`
- Modify: `src/lib/storage.ts`
- Modify: `src/lib/storage.test.ts`

- [ ] **Step 1: Add full-data clearing tests**

Extend the Taro mock with `getStorageInfoSync`. Add a test proving `clearAllLocalData()` removes history, theme, favorites, and every key beginning with `mini-test-app:quiz-session:v1:` while leaving unrelated keys untouched.

- [ ] **Step 2: Implement scoped local-data clearing**

Add `clearAllLocalData()` to `storage.ts`. Enumerate storage keys, remove only keys beginning with `mini-test-app:`, return `false` on any exception, and keep `clearHistory()` for report-only clearing.

- [ ] **Step 3: Expand ResultPanel**

Render score context, dimension bars based on the maximum observed dimension value, result description, actionable suggestions, and the non-clinical disclaimer. For objective questions with `explanation`, render a collapsed explanation list controlled locally by the result page.

- [ ] **Step 4: Rebuild Profile sections**

Render unfinished session, favorite assessments, saved reports, ThemePicker, “clear reports,” and “clear all local data.” Report rows navigate to `/pages/result/index?historyId=<id>`. Both destructive actions use `Taro.showModal` confirmation.

- [ ] **Step 5: Run tests, build, and commit**

Run: `npm test && npm run typecheck && npm run build:weapp`

Expected: all commands succeed.

```bash
git add src/components/ResultPanel src/pages/result src/pages/profile src/lib/storage.ts src/lib/storage.test.ts
git commit -m "feat: enrich reports and profile hub"
```

## Task 11: Documentation, Cross-Platform Verification, and Delivery

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README**

Document the 12 assessments, 6,000 generated candidates, three skins, search, favorites, resume behavior, local-only data model, non-clinical policy, and these commands:

```bash
npm test
npm run typecheck
npm run build:weapp
npm run build:h5
npm run build:alipay
```

- [ ] **Step 2: Run the full automated verification suite**

Run: `npm test`

Expected: every Vitest suite passes.

Run: `npm run typecheck`

Expected: no TypeScript diagnostics.

- [ ] **Step 3: Run production builds**

Run: `npm run build:weapp`

Expected: WeChat production build succeeds.

Run: `npm run build:h5`

Expected: H5 production build succeeds.

Run: `npm run build:alipay`

Expected: Alipay production build succeeds.

- [ ] **Step 4: Perform the manual smoke matrix**

Check Home, Library, Detail, Quiz, Result, and Profile at narrow and standard mobile widths. Verify all three skins, long titles, empty search, unknown IDs, corrupt sessions, answer revision, restart resume, report reopening, and both confirmation dialogs.

- [ ] **Step 5: Inspect the final diff**

Run:

```bash
git status --short
git diff --check
git diff --stat origin/dev...HEAD
```

Expected: no whitespace errors, no generated `dist` files staged, and only intended source, test, and documentation changes.

- [ ] **Step 6: Commit documentation**

```bash
git add README.md
git commit -m "docs: document expanded assessment app"
```

- [ ] **Step 7: Push the verified branch**

Run: `git push origin dev`

Expected: remote `origin/dev` advances to the final verified commit.
