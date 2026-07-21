import type { QuestionDifficulty, TestOption, TestQuestion } from '../types/test'

interface BankInput {
  testId: string
  seedQuestions: TestQuestion[]
  targetCount?: number
  domains: string[]
}

const SCENARIOS = [
  '日常选择',
  '朋友聊天',
  '团队协作',
  '独处复盘',
  '压力时刻',
  '新机会出现',
  '计划被打乱',
  '需要做决定',
  '收到反馈',
  '长期目标推进'
]

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function difficultyFor(index: number): QuestionDifficulty {
  return ((index % 5) + 1) as QuestionDifficulty
}

function withOptionIds(questionId: string, options: TestOption[]) {
  return options.map((option, index) => ({
    ...option,
    id: `${questionId}-${LETTERS[index].toLowerCase()}`
  }))
}

function normalizeTitle(title: string) {
  return title.replace(/[？?。.]$/, '')
}

export function buildAssessmentBank({
  testId,
  seedQuestions,
  targetCount = 500,
  domains
}: BankInput): TestQuestion[] {
  if (seedQuestions.length === 0 || targetCount <= 0) {
    return []
  }

  return Array.from({ length: targetCount }, (_, index) => {
    const seed = seedQuestions[index % seedQuestions.length]
    const domain = seed.domain ?? domains[index % domains.length]
    const scenario = SCENARIOS[Math.floor(index / seedQuestions.length) % SCENARIOS.length]
    const questionId = `${testId}-bank-${String(index + 1).padStart(3, '0')}`

    return {
      ...seed,
      id: questionId,
      testId,
      title: index < seedQuestions.length
        ? seed.title
        : `${scenario}：${normalizeTitle(seed.title)}？`,
      options: withOptionIds(questionId, seed.options),
      domain,
      difficulty: difficultyFor(index),
      discrimination: 0.85 + (index % 4) * 0.1,
      source: index < seedQuestions.length ? 'curated' : 'generated'
    }
  })
}

function option(questionId: string, key: string, label: string, correct: boolean, dimension: string): TestOption {
  return {
    id: `${questionId}-${key}`,
    label,
    scores: correct ? { [dimension]: 4 } : { [dimension]: 0 }
  }
}

function buildNumberSequence(testId: string, index: number): TestQuestion {
  const difficulty = difficultyFor(index)
  const start = 2 + (index % 9)
  const step = difficulty + 1
  const sequence = Array.from({ length: 5 }, (_, itemIndex) => start + itemIndex * step)
  const answer = start + 5 * step
  const questionId = `${testId}-iq-${String(index + 1).padStart(3, '0')}`

  return {
    id: questionId,
    testId,
    title: `数列 ${sequence.join('、')}、? 下一项更可能是？`,
    options: [
      option(questionId, 'a', String(answer - step), false, 'pattern'),
      option(questionId, 'b', String(answer), true, 'pattern'),
      option(questionId, 'c', String(answer + difficulty), false, 'pattern'),
      option(questionId, 'd', String(answer + step), false, 'pattern')
    ],
    domain: 'pattern',
    difficulty,
    kind: 'number-sequence',
    correctOptionId: `${questionId}-b`,
    discrimination: 0.9 + difficulty * 0.08,
    explanation: `每一项增加 ${step}。`,
    source: 'public-domain-inspired'
  }
}

function buildLogicQuestion(testId: string, index: number): TestQuestion {
  const difficulty = difficultyFor(index)
  const questionId = `${testId}-iq-${String(index + 1).padStart(3, '0')}`
  const subjects = ['甲', '乙', '丙', '丁', '戊']
  const first = subjects[index % subjects.length]
  const second = subjects[(index + 1) % subjects.length]
  const third = subjects[(index + 2) % subjects.length]

  return {
    id: questionId,
    testId,
    title: `如果${first}比${second}高，${second}比${third}高，那么谁最高？`,
    options: [
      option(questionId, 'a', first, true, 'logic'),
      option(questionId, 'b', second, false, 'logic'),
      option(questionId, 'c', third, false, 'logic'),
      option(questionId, 'd', '无法判断', false, 'logic')
    ],
    domain: 'logic',
    difficulty,
    kind: 'deduction',
    correctOptionId: `${questionId}-a`,
    discrimination: 0.95 + difficulty * 0.06,
    explanation: `${first} > ${second} > ${third}。`,
    source: 'public-domain-inspired'
  }
}

function buildSpatialQuestion(testId: string, index: number): TestQuestion {
  const difficulty = difficultyFor(index)
  const questionId = `${testId}-iq-${String(index + 1).padStart(3, '0')}`
  const turns = ['顺时针 90 度', '逆时针 90 度', '旋转 180 度']
  const answers = ['右', '左', '下']
  const turnIndex = index % turns.length

  return {
    id: questionId,
    testId,
    title: `一个箭头原本朝上，如果${turns[turnIndex]}，箭头会朝向哪里？`,
    options: [
      option(questionId, 'a', '上', answers[turnIndex] === '上', 'spatial'),
      option(questionId, 'b', '右', answers[turnIndex] === '右', 'spatial'),
      option(questionId, 'c', '下', answers[turnIndex] === '下', 'spatial'),
      option(questionId, 'd', '左', answers[turnIndex] === '左', 'spatial')
    ],
    domain: 'spatial',
    difficulty,
    kind: 'mental-rotation',
    correctOptionId: `${questionId}-${['a', 'b', 'c', 'd'][['上', '右', '下', '左'].indexOf(answers[turnIndex])]}`,
    discrimination: 0.9 + difficulty * 0.07,
    explanation: `按${turns[turnIndex]}旋转即可得到方向。`,
    source: 'public-domain-inspired'
  }
}

function buildMemoryQuestion(testId: string, index: number): TestQuestion {
  const difficulty = difficultyFor(index)
  const questionId = `${testId}-iq-${String(index + 1).padStart(3, '0')}`
  const sequence = Array.from({ length: 4 + difficulty }, (_, itemIndex) => (index + itemIndex * 3) % 10)
  const target = sequence[sequence.length - 2]

  return {
    id: questionId,
    testId,
    title: `观察序列 ${sequence.join('-')}，倒数第二个数字是？`,
    options: [
      option(questionId, 'a', String((target + 1) % 10), false, 'memory'),
      option(questionId, 'b', String(target), true, 'memory'),
      option(questionId, 'c', String((target + 3) % 10), false, 'memory'),
      option(questionId, 'd', String((target + 5) % 10), false, 'memory')
    ],
    domain: 'memory',
    difficulty,
    kind: 'working-memory',
    correctOptionId: `${questionId}-b`,
    discrimination: 0.85 + difficulty * 0.08,
    explanation: `倒数第二个数字是 ${target}。`,
    source: 'public-domain-inspired'
  }
}

export function buildIqQuestionBank(seedQuestions: TestQuestion[], targetCount = 500): TestQuestion[] {
  const generated = Array.from({ length: Math.max(0, targetCount - seedQuestions.length) }, (_, index) => {
    const absoluteIndex = seedQuestions.length + index

    switch (absoluteIndex % 4) {
      case 0:
        return buildNumberSequence('brain-spark', absoluteIndex)
      case 1:
        return buildLogicQuestion('brain-spark', absoluteIndex)
      case 2:
        return buildSpatialQuestion('brain-spark', absoluteIndex)
      default:
        return buildMemoryQuestion('brain-spark', absoluteIndex)
    }
  })

  return [
    ...seedQuestions.map((question, index) => ({
      ...question,
      domain: question.domain || ['logic', 'pattern', 'spatial', 'memory'][index % 4],
      difficulty: question.difficulty || difficultyFor(index),
      correctOptionId: question.correctOptionId || question.options.reduce((best, option) => {
        const bestScore = Object.values(best.scores).reduce((sum, value) => sum + value, 0)
        const optionScore = Object.values(option.scores).reduce((sum, value) => sum + value, 0)
        return optionScore > bestScore ? option : best
      }, question.options[0]).id,
      discrimination: question.discrimination || 1,
      source: question.source || 'curated'
    })),
    ...generated
  ].slice(0, targetCount)
}
