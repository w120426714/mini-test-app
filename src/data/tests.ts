import type { TestCategory, TestDefinition } from '../types/test'

export const categoryLabels: Record<TestCategory, string> = {
  iq: '智商',
  eq: '情商',
  personality: '性格',
  romance: '恋爱',
  wealth: '财富',
  workplace: '职场'
}

export const tests: TestDefinition[] = [
  {
    id: 'emotional-radar',
    title: '情绪雷达测试',
    subtitle: '看看你在人际关系里捕捉情绪风向的能力',
    category: 'eq',
    description: '这是一份轻松的情商倾向测试，会从共情、稳定和表达三个角度生成你的情绪雷达画像。',
    questionCount: 6,
    estimatedMinutes: 2,
    popularity: '8.6w',
    coverTone: 'forest',
    dimensions: [
      { key: 'empathy', label: '共情力' },
      { key: 'stability', label: '稳定感' },
      { key: 'expression', label: '表达力' }
    ],
    questions: [
      {
        id: 'er-q1',
        testId: 'emotional-radar',
        title: '朋友突然变得沉默，你第一反应是？',
        options: [
          { id: 'er-q1-a', label: '先观察气氛，等对方愿意开口', scores: { empathy: 3, stability: 2, expression: 1 } },
          { id: 'er-q1-b', label: '直接问是不是发生了什么', scores: { empathy: 2, stability: 1, expression: 3 } },
          { id: 'er-q1-c', label: '讲个轻松话题缓和一下', scores: { empathy: 1, stability: 2, expression: 2 } }
        ]
      },
      {
        id: 'er-q2',
        testId: 'emotional-radar',
        title: '遇到临时变动，你更像哪一种？',
        options: [
          { id: 'er-q2-a', label: '快速重排计划', scores: { empathy: 1, stability: 3, expression: 2 } },
          { id: 'er-q2-b', label: '先确认每个人是否能接受', scores: { empathy: 3, stability: 2, expression: 1 } },
          { id: 'er-q2-c', label: '把新安排说清楚，让大家别慌', scores: { empathy: 1, stability: 2, expression: 3 } }
        ]
      },
      {
        id: 'er-q3',
        testId: 'emotional-radar',
        title: '你表达不满时通常会？',
        options: [
          { id: 'er-q3-a', label: '整理好理由再说', scores: { empathy: 2, stability: 3, expression: 2 } },
          { id: 'er-q3-b', label: '尽量委婉，不想让对方难堪', scores: { empathy: 3, stability: 2, expression: 1 } },
          { id: 'er-q3-c', label: '当场说出来，避免积压', scores: { empathy: 1, stability: 1, expression: 3 } }
        ]
      },
      {
        id: 'er-q4',
        testId: 'emotional-radar',
        title: '别人夸你时，你最常见的反应是？',
        options: [
          { id: 'er-q4-a', label: '自然接受并回应感谢', scores: { empathy: 2, stability: 3, expression: 3 } },
          { id: 'er-q4-b', label: '有点不好意思，马上谦虚', scores: { empathy: 3, stability: 1, expression: 1 } },
          { id: 'er-q4-c', label: '顺势把功劳分给大家', scores: { empathy: 3, stability: 2, expression: 2 } }
        ]
      },
      {
        id: 'er-q5',
        testId: 'emotional-radar',
        title: '团队里有人意见很冲，你会？',
        options: [
          { id: 'er-q5-a', label: '先把争议点拆开', scores: { empathy: 1, stability: 3, expression: 2 } },
          { id: 'er-q5-b', label: '先照顾被冲击到的人', scores: { empathy: 3, stability: 2, expression: 1 } },
          { id: 'er-q5-c', label: '请大家轮流说完', scores: { empathy: 2, stability: 2, expression: 3 } }
        ]
      },
      {
        id: 'er-q6',
        testId: 'emotional-radar',
        title: '你希望别人如何理解你？',
        options: [
          { id: 'er-q6-a', label: '可靠，不容易被情绪带走', scores: { empathy: 1, stability: 3, expression: 1 } },
          { id: 'er-q6-b', label: '温柔，能接住别人的感受', scores: { empathy: 3, stability: 2, expression: 1 } },
          { id: 'er-q6-c', label: '坦率，想法不会藏太深', scores: { empathy: 1, stability: 1, expression: 3 } }
        ]
      }
    ],
    resultRanges: [
      {
        id: 'warm-listener',
        min: 0,
        max: 22,
        title: '温柔倾听者',
        tagline: '你的雷达很会接住微小情绪。',
        description: '你对别人的状态很敏感，擅长在细节里读懂空气。你不急着评判，更愿意先理解。',
        suggestions: ['练习把需求说得更直接', '别把所有人的情绪都扛在自己身上']
      },
      {
        id: 'steady-anchor',
        min: 23,
        max: 30,
        title: '稳定定海针',
        tagline: '你的情绪场像一张安全网。',
        description: '你能在变化里保持节奏，也愿意让身边人安心。你的优势是稳定、清晰和可靠。',
        suggestions: ['给自己保留放松出口', '在重要关系里多表达真实感受']
      },
      {
        id: 'bright-connector',
        min: 31,
        max: 54,
        title: '明亮连接者',
        tagline: '你擅长把感受变成连接。',
        description: '你愿意主动表达，也能用语言推动关系靠近。你的情绪影响力比你想象中更强。',
        suggestions: ['表达前先确认对方状态', '把热情用在真正值得的人身上']
      }
    ]
  },
  {
    id: 'brain-spark',
    title: '脑力火花测试',
    subtitle: '用几个生活场景测测你的观察和推理偏好',
    category: 'iq',
    description: '这不是严肃 IQ 评估，而是一份观察力、逻辑感和创造力的脑力风格测试。',
    questionCount: 5,
    estimatedMinutes: 2,
    popularity: '6.3w',
    coverTone: 'sunset',
    dimensions: [
      { key: 'observation', label: '观察力' },
      { key: 'logic', label: '逻辑感' },
      { key: 'creativity', label: '创造力' }
    ],
    questions: [
      {
        id: 'bs-q1',
        testId: 'brain-spark',
        title: '进入陌生咖啡馆，你最先注意到？',
        options: [
          { id: 'bs-q1-a', label: '动线和座位分布', scores: { observation: 3, logic: 2, creativity: 1 } },
          { id: 'bs-q1-b', label: '菜单结构和价格规律', scores: { observation: 1, logic: 3, creativity: 1 } },
          { id: 'bs-q1-c', label: '店里的氛围和设计巧思', scores: { observation: 2, logic: 1, creativity: 3 } }
        ]
      },
      {
        id: 'bs-q2',
        testId: 'brain-spark',
        title: '要解决一个新问题，你会先？',
        options: [
          { id: 'bs-q2-a', label: '收集线索', scores: { observation: 3, logic: 1, creativity: 1 } },
          { id: 'bs-q2-b', label: '画出因果链', scores: { observation: 1, logic: 3, creativity: 1 } },
          { id: 'bs-q2-c', label: '试几个不寻常方案', scores: { observation: 1, logic: 1, creativity: 3 } }
        ]
      },
      {
        id: 'bs-q3',
        testId: 'brain-spark',
        title: '拼图卡住时，你更可能？',
        options: [
          { id: 'bs-q3-a', label: '重新检查边角细节', scores: { observation: 3, logic: 2, creativity: 1 } },
          { id: 'bs-q3-b', label: '按颜色和形状分类', scores: { observation: 2, logic: 3, creativity: 1 } },
          { id: 'bs-q3-c', label: '换个角度摆一摆', scores: { observation: 1, logic: 1, creativity: 3 } }
        ]
      },
      {
        id: 'bs-q4',
        testId: 'brain-spark',
        title: '你喜欢哪类挑战？',
        options: [
          { id: 'bs-q4-a', label: '找不同和隐藏线索', scores: { observation: 3, logic: 1, creativity: 1 } },
          { id: 'bs-q4-b', label: '推理谜题和规则游戏', scores: { observation: 1, logic: 3, creativity: 1 } },
          { id: 'bs-q4-c', label: '开放式创意任务', scores: { observation: 1, logic: 1, creativity: 3 } }
        ]
      },
      {
        id: 'bs-q5',
        testId: 'brain-spark',
        title: '别人评价你的脑回路时，最像？',
        options: [
          { id: 'bs-q5-a', label: '细，很多东西逃不过你', scores: { observation: 3, logic: 1, creativity: 1 } },
          { id: 'bs-q5-b', label: '稳，讲得通才会相信', scores: { observation: 1, logic: 3, creativity: 1 } },
          { id: 'bs-q5-c', label: '跳，总能拐到新方向', scores: { observation: 1, logic: 1, creativity: 3 } }
        ]
      }
    ],
    resultRanges: [
      {
        id: 'detail-hunter',
        min: 0,
        max: 18,
        title: '细节猎人',
        tagline: '你靠线索点亮答案。',
        description: '你擅长从不起眼的信息里找到关键点，适合处理需要耐心和观察的任务。',
        suggestions: ['遇到复杂问题时先抓主线', '给直觉留一点试错空间']
      },
      {
        id: 'logic-builder',
        min: 19,
        max: 25,
        title: '逻辑搭桥人',
        tagline: '你喜欢把混乱整理成路径。',
        description: '你的优势是结构化和推理，能把看似零散的现象串成清楚的解释。',
        suggestions: ['别让规则限制所有想象', '尝试用草图表达你的推理']
      },
      {
        id: 'spark-maker',
        min: 26,
        max: 45,
        title: '灵感点火器',
        tagline: '你经常从旁路找到新解法。',
        description: '你不满足于标准答案，擅长把旧材料组合成新想法。',
        suggestions: ['落地前补一轮验证', '和逻辑型伙伴合作会很强']
      }
    ]
  },
  {
    id: 'inner-weather',
    title: '内在天气测试',
    subtitle: '测测你的性格天气是晴风、云层还是海雾',
    category: 'personality',
    description: '通过日常选择生成你的内在天气报告，看看你的能量、决策和社交倾向。',
    questionCount: 5,
    estimatedMinutes: 2,
    popularity: '9.1w',
    coverTone: 'ocean',
    dimensions: [
      { key: 'energy', label: '能量感' },
      { key: 'decision', label: '决策感' },
      { key: 'social', label: '社交感' }
    ],
    questions: [
      {
        id: 'iw-q1',
        testId: 'inner-weather',
        title: '周末醒来没有安排，你会？',
        options: [
          { id: 'iw-q1-a', label: '立刻约人出去', scores: { energy: 3, decision: 2, social: 3 } },
          { id: 'iw-q1-b', label: '看心情慢慢决定', scores: { energy: 2, decision: 1, social: 1 } },
          { id: 'iw-q1-c', label: '享受独处和充电', scores: { energy: 1, decision: 2, social: 0 } }
        ]
      },
      {
        id: 'iw-q2',
        testId: 'inner-weather',
        title: '面对选择，你通常？',
        options: [
          { id: 'iw-q2-a', label: '快速选一个先走起来', scores: { energy: 3, decision: 3, social: 1 } },
          { id: 'iw-q2-b', label: '列出利弊再判断', scores: { energy: 1, decision: 3, social: 1 } },
          { id: 'iw-q2-c', label: '问问朋友的看法', scores: { energy: 2, decision: 1, social: 3 } }
        ]
      },
      {
        id: 'iw-q3',
        testId: 'inner-weather',
        title: '社交聚会结束后，你感觉？',
        options: [
          { id: 'iw-q3-a', label: '更有电了', scores: { energy: 3, decision: 1, social: 3 } },
          { id: 'iw-q3-b', label: '开心，但需要安静一下', scores: { energy: 2, decision: 2, social: 2 } },
          { id: 'iw-q3-c', label: '消耗有点大', scores: { energy: 1, decision: 2, social: 0 } }
        ]
      },
      {
        id: 'iw-q4',
        testId: 'inner-weather',
        title: '计划被打乱时，你会？',
        options: [
          { id: 'iw-q4-a', label: '马上生成新计划', scores: { energy: 3, decision: 3, social: 1 } },
          { id: 'iw-q4-b', label: '先缓一缓再调整', scores: { energy: 1, decision: 2, social: 1 } },
          { id: 'iw-q4-c', label: '找人一起商量', scores: { energy: 2, decision: 1, social: 3 } }
        ]
      },
      {
        id: 'iw-q5',
        testId: 'inner-weather',
        title: '你最喜欢别人说你？',
        options: [
          { id: 'iw-q5-a', label: '很有感染力', scores: { energy: 3, decision: 1, social: 3 } },
          { id: 'iw-q5-b', label: '很有主见', scores: { energy: 2, decision: 3, social: 1 } },
          { id: 'iw-q5-c', label: '很舒服自在', scores: { energy: 1, decision: 2, social: 1 } }
        ]
      }
    ],
    resultRanges: [
      {
        id: 'sunny-breeze',
        min: 0,
        max: 17,
        title: '晴风型人格',
        tagline: '你像明亮但不刺眼的风。',
        description: '你给人的感觉轻盈、舒服，擅长在关系里制造自然的松弛感。',
        suggestions: ['重要机会来临时更主动一点', '把你的好状态留给自己一部分']
      },
      {
        id: 'steady-cloud',
        min: 18,
        max: 24,
        title: '稳定云层型人格',
        tagline: '你有自己的节奏和边界。',
        description: '你不急着被外界推着走，更相信稳定积累。你的魅力来自可靠和耐心。',
        suggestions: ['别把谨慎误认为拖延', '让亲近的人知道你的真实想法']
      },
      {
        id: 'bright-tide',
        min: 25,
        max: 45,
        title: '亮潮型人格',
        tagline: '你的能量会带动一片海面。',
        description: '你容易成为气氛里的推动者，决策和表达都带着明显的存在感。',
        suggestions: ['给低能量时刻留缓冲', '别急着替所有人决定方向']
      }
    ]
  }
]

export function getTestById(testId: string | undefined) {
  return tests.find((test) => test.id === testId)
}

export function getTestsByCategory(category: TestCategory) {
  return tests.filter((test) => test.category === category)
}

export function getRecommendedTest() {
  return tests[0]
}
