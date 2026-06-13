import type { TestCategory, TestDefinition, TestOption, TestQuestion } from '../types/test'
import { buildAssessmentBank, buildIqQuestionBank } from './questionBanks'

type Tone = TestDefinition['coverTone']

export const categoryLabels: Record<TestCategory, string> = {
  iq: '智商',
  eq: '情商',
  personality: '性格',
  romance: '恋爱',
  wealth: '财富',
  workplace: '职场'
}

function option(id: string, label: string, scores: Record<string, number>): TestOption {
  return { id, label, scores }
}

function question(testId: string, id: string, title: string, options: TestOption[]): TestQuestion {
  return { id, testId, title, options }
}

function makeResult(id: string, min: number, max: number, title: string, tagline: string, description: string, suggestions: string[]) {
  return { id, min, max, title, tagline, description, suggestions }
}

function makeTest(input: Omit<TestDefinition, 'questionCount' | 'coverTone'> & {
  questionCount: number
  coverTone: Tone
}): TestDefinition {
  return input
}

const brainSparkQuestions: TestQuestion[] = [
  question('brain-spark', 'bs-q1', '数列 2、4、8、16、? 下一项更可能是？', [
    option('bs-q1-a', '24', { logic: 1, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q1-b', '32', { logic: 4, pattern: 3, spatial: 0, memory: 0 }),
    option('bs-q1-c', '30', { logic: 0, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q1-d', '20', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q2', '类比：手套之于手，正如鞋子之于？', [
    option('bs-q2-a', '脚', { logic: 3, pattern: 3, spatial: 0, memory: 0 }),
    option('bs-q2-b', '路', { logic: 1, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q2-c', '袜子', { logic: 0, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q2-d', '行走', { logic: 1, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q3', '如果所有 A 都是 B，部分 B 是 C，可以确定的是？', [
    option('bs-q3-a', '所有 A 都是 C', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q3-b', '部分 C 是 A', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q3-c', '不能确定 A 与 C 的关系', { logic: 4, pattern: 2, spatial: 0, memory: 0 }),
    option('bs-q3-d', '所有 B 都是 A', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q4', '一个立方体相对两面分别是红和蓝，红面朝上时蓝面在哪里？', [
    option('bs-q4-a', '下方', { logic: 1, pattern: 0, spatial: 4, memory: 0 }),
    option('bs-q4-b', '左侧', { logic: 0, pattern: 0, spatial: 1, memory: 0 }),
    option('bs-q4-c', '右侧', { logic: 0, pattern: 0, spatial: 1, memory: 0 }),
    option('bs-q4-d', '前方', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q5', '找规律：A、C、F、J、O、? 下一项是？', [
    option('bs-q5-a', 'S', { logic: 1, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q5-b', 'T', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q5-c', 'U', { logic: 4, pattern: 4, spatial: 0, memory: 0 }),
    option('bs-q5-d', 'V', { logic: 1, pattern: 1, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q6', '四个人排队，甲不在第一，乙在甲前面，丙不在最后。谁最可能在第一？', [
    option('bs-q6-a', '乙', { logic: 4, pattern: 1, spatial: 1, memory: 0 }),
    option('bs-q6-b', '甲', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q6-c', '丁', { logic: 1, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q6-d', '丙一定第一', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q7', '9、7、10、8、11、9、? 下一项是？', [
    option('bs-q7-a', '10', { logic: 1, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q7-b', '12', { logic: 4, pattern: 4, spatial: 0, memory: 0 }),
    option('bs-q7-c', '13', { logic: 0, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q7-d', '8', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q8', '如果把纸顺时针旋转 90 度，原来朝上的箭头会朝向？', [
    option('bs-q8-a', '左', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q8-b', '右', { logic: 1, pattern: 0, spatial: 4, memory: 0 }),
    option('bs-q8-c', '下', { logic: 0, pattern: 0, spatial: 1, memory: 0 }),
    option('bs-q8-d', '上', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q9', '在 5 秒内记住 7、2、9、4。倒序是？', [
    option('bs-q9-a', '4、9、2、7', { logic: 1, pattern: 0, spatial: 0, memory: 4 }),
    option('bs-q9-b', '7、2、9、4', { logic: 0, pattern: 0, spatial: 0, memory: 1 }),
    option('bs-q9-c', '4、2、9、7', { logic: 0, pattern: 0, spatial: 0, memory: 1 }),
    option('bs-q9-d', '9、4、7、2', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q10', '哪一组关系最像“鸟：巢”？', [
    option('bs-q10-a', '鱼：水', { logic: 1, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q10-b', '人：房屋', { logic: 3, pattern: 3, spatial: 0, memory: 0 }),
    option('bs-q10-c', '书：文字', { logic: 0, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q10-d', '车：轮胎', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q11', '如果今天是周三，100 天后是周几？', [
    option('bs-q11-a', '周四', { logic: 0, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q11-b', '周五', { logic: 4, pattern: 2, spatial: 0, memory: 0 }),
    option('bs-q11-c', '周六', { logic: 1, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q11-d', '周日', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q12', '3 个齿轮依次咬合，第 1 个顺时针转，第 3 个会？', [
    option('bs-q12-a', '顺时针', { logic: 2, pattern: 1, spatial: 4, memory: 0 }),
    option('bs-q12-b', '逆时针', { logic: 1, pattern: 0, spatial: 1, memory: 0 }),
    option('bs-q12-c', '不转', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q12-d', '无法判断', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q13', '数列 1、1、2、3、5、8、? 下一项是？', [
    option('bs-q13-a', '11', { logic: 1, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q13-b', '13', { logic: 4, pattern: 4, spatial: 0, memory: 0 }),
    option('bs-q13-c', '15', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q13-d', '16', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q14', '一张纸对折再打孔，展开后孔洞数量通常会？', [
    option('bs-q14-a', '保持 1 个', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q14-b', '变成 2 个对称孔', { logic: 1, pattern: 2, spatial: 4, memory: 0 }),
    option('bs-q14-c', '一定变成 4 个', { logic: 0, pattern: 1, spatial: 1, memory: 0 }),
    option('bs-q14-d', '消失', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q15', '哪一个词与其他三个最不同？', [
    option('bs-q15-a', '三角形', { logic: 0, pattern: 1, spatial: 1, memory: 0 }),
    option('bs-q15-b', '正方形', { logic: 0, pattern: 1, spatial: 1, memory: 0 }),
    option('bs-q15-c', '圆形', { logic: 0, pattern: 1, spatial: 1, memory: 0 }),
    option('bs-q15-d', '蓝色', { logic: 3, pattern: 3, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q16', '甲比乙高，乙比丙高。谁最高？', [
    option('bs-q16-a', '甲', { logic: 4, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q16-b', '乙', { logic: 1, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q16-c', '丙', { logic: 0, pattern: 0, spatial: 0, memory: 0 }),
    option('bs-q16-d', '无法判断', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q17', '观察：AB、BC、CD、DE、? 下一组是？', [
    option('bs-q17-a', 'EF', { logic: 3, pattern: 4, spatial: 0, memory: 0 }),
    option('bs-q17-b', 'DF', { logic: 0, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q17-c', 'FG', { logic: 1, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q17-d', 'EE', { logic: 0, pattern: 0, spatial: 0, memory: 0 })
  ]),
  question('brain-spark', 'bs-q18', '把“海洋、河流、湖泊、沙漠”分组，最不同的是？', [
    option('bs-q18-a', '海洋', { logic: 1, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q18-b', '河流', { logic: 0, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q18-c', '湖泊', { logic: 0, pattern: 1, spatial: 0, memory: 0 }),
    option('bs-q18-d', '沙漠', { logic: 3, pattern: 3, spatial: 0, memory: 0 })
  ])
]

const emotionalRadarQuestions: TestQuestion[] = [
  question('emotional-radar', 'er-q1', '朋友突然沉默，你第一反应是？', [
    option('er-q1-a', '先观察气氛，等对方愿意开口', { empathy: 3, stability: 2, expression: 1 }),
    option('er-q1-b', '直接问发生了什么', { empathy: 2, stability: 1, expression: 3 }),
    option('er-q1-c', '讲个轻松话题缓和气氛', { empathy: 1, stability: 2, expression: 2 })
  ]),
  question('emotional-radar', 'er-q2', '临时变动打乱计划时，你会？', [
    option('er-q2-a', '快速重排计划', { empathy: 1, stability: 3, expression: 2 }),
    option('er-q2-b', '先确认每个人是否能接受', { empathy: 3, stability: 2, expression: 1 }),
    option('er-q2-c', '把新安排说清楚，让大家别慌', { empathy: 1, stability: 2, expression: 3 })
  ]),
  question('emotional-radar', 'er-q3', '你表达不满时通常会？', [
    option('er-q3-a', '整理好理由再说', { empathy: 2, stability: 3, expression: 2 }),
    option('er-q3-b', '尽量委婉，不想让对方难堪', { empathy: 3, stability: 2, expression: 1 }),
    option('er-q3-c', '当场说出来，避免积压', { empathy: 1, stability: 1, expression: 3 })
  ]),
  question('emotional-radar', 'er-q4', '别人夸你时，你最常见的反应是？', [
    option('er-q4-a', '自然接受并回应感谢', { empathy: 2, stability: 3, expression: 3 }),
    option('er-q4-b', '不好意思，马上谦虚', { empathy: 3, stability: 1, expression: 1 }),
    option('er-q4-c', '顺势把功劳分给大家', { empathy: 3, stability: 2, expression: 2 })
  ]),
  question('emotional-radar', 'er-q5', '团队里有人意见很冲，你会？', [
    option('er-q5-a', '先把争议点拆开', { empathy: 1, stability: 3, expression: 2 }),
    option('er-q5-b', '先照顾被冲击到的人', { empathy: 3, stability: 2, expression: 1 }),
    option('er-q5-c', '请大家轮流说完', { empathy: 2, stability: 2, expression: 3 })
  ]),
  question('emotional-radar', 'er-q6', '你希望别人如何理解你？', [
    option('er-q6-a', '可靠，不容易被情绪带走', { empathy: 1, stability: 3, expression: 1 }),
    option('er-q6-b', '温柔，能接住别人的感受', { empathy: 3, stability: 2, expression: 1 }),
    option('er-q6-c', '坦率，想法不会藏太深', { empathy: 1, stability: 1, expression: 3 })
  ]),
  question('emotional-radar', 'er-q7', '好友向你倾诉失败，你更可能说？', [
    option('er-q7-a', '这件事一定很难受，我在', { empathy: 3, stability: 2, expression: 2 }),
    option('er-q7-b', '先复盘一下哪里可以调整', { empathy: 1, stability: 3, expression: 2 }),
    option('er-q7-c', '没事，下次肯定能赢', { empathy: 1, stability: 1, expression: 3 })
  ]),
  question('emotional-radar', 'er-q8', '群聊突然冷场，你会？', [
    option('er-q8-a', '换个大家都能接的话题', { empathy: 2, stability: 2, expression: 3 }),
    option('er-q8-b', '接受冷场，不强行热闹', { empathy: 2, stability: 3, expression: 1 }),
    option('er-q8-c', '私下确认是不是有人不舒服', { empathy: 3, stability: 2, expression: 1 })
  ]),
  question('emotional-radar', 'er-q9', '当你压力很大时，你通常？', [
    option('er-q9-a', '找人说出来', { empathy: 1, stability: 1, expression: 3 }),
    option('er-q9-b', '自己消化，等稳定再说', { empathy: 1, stability: 3, expression: 1 }),
    option('er-q9-c', '先写下来再决定怎么表达', { empathy: 2, stability: 3, expression: 2 })
  ]),
  question('emotional-radar', 'er-q10', '别人误解你时，你会？', [
    option('er-q10-a', '直接澄清关键事实', { empathy: 1, stability: 2, expression: 3 }),
    option('er-q10-b', '先理解对方为什么这样想', { empathy: 3, stability: 2, expression: 1 }),
    option('er-q10-c', '等情绪过去再沟通', { empathy: 2, stability: 3, expression: 1 })
  ]),
  question('emotional-radar', 'er-q11', '你判断一个人情绪变化主要靠？', [
    option('er-q11-a', '语气和停顿', { empathy: 3, stability: 1, expression: 1 }),
    option('er-q11-b', '前后行为是否一致', { empathy: 2, stability: 3, expression: 1 }),
    option('er-q11-c', '对方是否主动表达', { empathy: 1, stability: 1, expression: 3 })
  ]),
  question('emotional-radar', 'er-q12', '你最希望自己在关系中更擅长？', [
    option('er-q12-a', '更敏锐地理解别人', { empathy: 3, stability: 1, expression: 1 }),
    option('er-q12-b', '更稳定地处理冲突', { empathy: 1, stability: 3, expression: 1 }),
    option('er-q12-c', '更清楚地表达自己', { empathy: 1, stability: 1, expression: 3 })
  ])
]

const innerWeatherQuestions: TestQuestion[] = [
  question('inner-weather', 'iw-q1', '周末醒来没有安排，你会？', [
    option('iw-q1-a', '立刻约人出去', { energy: 3, decision: 2, social: 3 }),
    option('iw-q1-b', '看心情慢慢决定', { energy: 2, decision: 1, social: 1 }),
    option('iw-q1-c', '享受独处和充电', { energy: 1, decision: 2, social: 0 })
  ]),
  question('inner-weather', 'iw-q2', '面对选择，你通常？', [
    option('iw-q2-a', '快速选一个先走起来', { energy: 3, decision: 3, social: 1 }),
    option('iw-q2-b', '列出利弊再判断', { energy: 1, decision: 3, social: 1 }),
    option('iw-q2-c', '问问朋友的看法', { energy: 2, decision: 1, social: 3 })
  ]),
  question('inner-weather', 'iw-q3', '社交聚会结束后，你感觉？', [
    option('iw-q3-a', '更有电了', { energy: 3, decision: 1, social: 3 }),
    option('iw-q3-b', '开心，但需要安静一下', { energy: 2, decision: 2, social: 2 }),
    option('iw-q3-c', '消耗有点大', { energy: 1, decision: 2, social: 0 })
  ]),
  question('inner-weather', 'iw-q4', '计划被打乱时，你会？', [
    option('iw-q4-a', '马上生成新计划', { energy: 3, decision: 3, social: 1 }),
    option('iw-q4-b', '先缓一缓再调整', { energy: 1, decision: 2, social: 1 }),
    option('iw-q4-c', '找人一起商量', { energy: 2, decision: 1, social: 3 })
  ]),
  question('inner-weather', 'iw-q5', '你最喜欢别人说你？', [
    option('iw-q5-a', '很有感染力', { energy: 3, decision: 1, social: 3 }),
    option('iw-q5-b', '很有主见', { energy: 2, decision: 3, social: 1 }),
    option('iw-q5-c', '很舒服自在', { energy: 1, decision: 2, social: 1 })
  ]),
  question('inner-weather', 'iw-q6', '新项目开始时，你通常负责？', [
    option('iw-q6-a', '点燃气氛和行动', { energy: 3, decision: 2, social: 3 }),
    option('iw-q6-b', '搭结构和节奏', { energy: 1, decision: 3, social: 1 }),
    option('iw-q6-c', '观察每个人适合的位置', { energy: 1, decision: 2, social: 3 })
  ]),
  question('inner-weather', 'iw-q7', '当别人临时邀约，你更可能？', [
    option('iw-q7-a', '看起来有趣就去', { energy: 3, decision: 2, social: 3 }),
    option('iw-q7-b', '确认是否影响原计划', { energy: 1, decision: 3, social: 1 }),
    option('iw-q7-c', '看同行的人是谁', { energy: 2, decision: 1, social: 3 })
  ]),
  question('inner-weather', 'iw-q8', '独处时你最常做什么？', [
    option('iw-q8-a', '整理目标和计划', { energy: 1, decision: 3, social: 0 }),
    option('iw-q8-b', '刷灵感、看内容', { energy: 2, decision: 1, social: 1 }),
    option('iw-q8-c', '完全放空恢复', { energy: 1, decision: 1, social: 0 })
  ]),
  question('inner-weather', 'iw-q9', '遇到陌生人，你通常？', [
    option('iw-q9-a', '自然开启话题', { energy: 3, decision: 1, social: 3 }),
    option('iw-q9-b', '先观察对方节奏', { energy: 1, decision: 2, social: 2 }),
    option('iw-q9-c', '除非必要不主动', { energy: 1, decision: 2, social: 0 })
  ]),
  question('inner-weather', 'iw-q10', '你做决定最看重？', [
    option('iw-q10-a', '直觉是否兴奋', { energy: 3, decision: 1, social: 1 }),
    option('iw-q10-b', '风险是否可控', { energy: 1, decision: 3, social: 0 }),
    option('iw-q10-c', '对关系和团队的影响', { energy: 1, decision: 2, social: 3 })
  ]),
  question('inner-weather', 'iw-q11', '当你很开心时，你会？', [
    option('iw-q11-a', '马上分享给别人', { energy: 3, decision: 1, social: 3 }),
    option('iw-q11-b', '默默记下来', { energy: 1, decision: 2, social: 0 }),
    option('iw-q11-c', '做点具体行动庆祝', { energy: 3, decision: 3, social: 1 })
  ]),
  question('inner-weather', 'iw-q12', '你的理想生活节奏更像？', [
    option('iw-q12-a', '风一样流动', { energy: 3, decision: 1, social: 2 }),
    option('iw-q12-b', '钟表一样稳定', { energy: 1, decision: 3, social: 0 }),
    option('iw-q12-c', '潮汐一样有进有退', { energy: 2, decision: 2, social: 2 })
  ])
]

const romanceQuestions: TestQuestion[] = [
  question('romance-compass', 'rc-q1', '喜欢的人回复变慢，你会？', [
    option('rc-q1-a', '给对方空间', { security: 3, warmth: 2, boundary: 3 }),
    option('rc-q1-b', '忍不住追问', { security: 0, warmth: 2, boundary: 0 }),
    option('rc-q1-c', '用轻松话题重新连接', { security: 2, warmth: 3, boundary: 2 })
  ]),
  question('romance-compass', 'rc-q2', '你理想的亲密关系更像？', [
    option('rc-q2-a', '彼此独立又靠近', { security: 3, warmth: 2, boundary: 3 }),
    option('rc-q2-b', '每天都高频分享', { security: 1, warmth: 3, boundary: 1 }),
    option('rc-q2-c', '稳定陪伴，少一点戏剧化', { security: 3, warmth: 2, boundary: 2 })
  ]),
  question('romance-compass', 'rc-q3', '发生争执后，你更倾向？', [
    option('rc-q3-a', '先冷静，再谈清楚', { security: 3, warmth: 1, boundary: 3 }),
    option('rc-q3-b', '当下把情绪说完', { security: 1, warmth: 3, boundary: 1 }),
    option('rc-q3-c', '先确认彼此仍然在乎', { security: 2, warmth: 3, boundary: 2 })
  ]),
  question('romance-compass', 'rc-q4', '对方需要独处时，你会？', [
    option('rc-q4-a', '尊重并约定之后再聊', { security: 3, warmth: 2, boundary: 3 }),
    option('rc-q4-b', '担心是不是感情变淡', { security: 0, warmth: 2, boundary: 0 }),
    option('rc-q4-c', '给一句关心但不打扰', { security: 2, warmth: 3, boundary: 3 })
  ]),
  question('romance-compass', 'rc-q5', '你表达喜欢通常是？', [
    option('rc-q5-a', '行动照顾', { security: 2, warmth: 3, boundary: 2 }),
    option('rc-q5-b', '直接说出来', { security: 2, warmth: 3, boundary: 1 }),
    option('rc-q5-c', '给对方稳定承诺', { security: 3, warmth: 2, boundary: 2 })
  ]),
  question('romance-compass', 'rc-q6', '关系里你最怕？', [
    option('rc-q6-a', '失去自我空间', { security: 2, warmth: 1, boundary: 3 }),
    option('rc-q6-b', '被忽略和冷落', { security: 0, warmth: 3, boundary: 0 }),
    option('rc-q6-c', '问题一直不说开', { security: 2, warmth: 2, boundary: 2 })
  ]),
  question('romance-compass', 'rc-q7', '约会计划临时取消，你会？', [
    option('rc-q7-a', '问清原因并安排下次', { security: 3, warmth: 2, boundary: 2 }),
    option('rc-q7-b', '表面没事，心里失落', { security: 1, warmth: 2, boundary: 1 }),
    option('rc-q7-c', '先做自己的事', { security: 3, warmth: 1, boundary: 3 })
  ]),
  question('romance-compass', 'rc-q8', '你判断关系是否健康主要看？', [
    option('rc-q8-a', '能否安心做自己', { security: 3, warmth: 2, boundary: 3 }),
    option('rc-q8-b', '对方是否足够热烈', { security: 1, warmth: 3, boundary: 1 }),
    option('rc-q8-c', '冲突后是否能修复', { security: 3, warmth: 2, boundary: 2 })
  ]),
  question('romance-compass', 'rc-q9', '你收到礼物时最看重？', [
    option('rc-q9-a', '是否理解我的需要', { security: 2, warmth: 3, boundary: 2 }),
    option('rc-q9-b', '是否足够惊喜', { security: 1, warmth: 3, boundary: 1 }),
    option('rc-q9-c', '是否不造成负担', { security: 2, warmth: 1, boundary: 3 })
  ]),
  question('romance-compass', 'rc-q10', '你更想成为哪种伴侣？', [
    option('rc-q10-a', '让人安心的人', { security: 3, warmth: 2, boundary: 2 }),
    option('rc-q10-b', '让人心动的人', { security: 1, warmth: 3, boundary: 1 }),
    option('rc-q10-c', '让彼此都成长的人', { security: 3, warmth: 2, boundary: 3 })
  ])
]

const wealthQuestions: TestQuestion[] = [
  question('money-instinct', 'mi-q1', '突然收到一笔奖金，你会先？', [
    option('mi-q1-a', '存下大部分', { planning: 3, risk: 1, action: 1 }),
    option('mi-q1-b', '拿一部分试试投资', { planning: 2, risk: 3, action: 3 }),
    option('mi-q1-c', '买一直想买的东西', { planning: 0, risk: 2, action: 2 })
  ]),
  question('money-instinct', 'mi-q2', '你做消费决定更看重？', [
    option('mi-q2-a', '长期使用价值', { planning: 3, risk: 1, action: 1 }),
    option('mi-q2-b', '当下幸福感', { planning: 1, risk: 2, action: 2 }),
    option('mi-q2-c', '是否能提升效率', { planning: 2, risk: 2, action: 3 })
  ]),
  question('money-instinct', 'mi-q3', '朋友推荐高收益项目，你会？', [
    option('mi-q3-a', '先查风险和规则', { planning: 3, risk: 1, action: 1 }),
    option('mi-q3-b', '小额试水', { planning: 2, risk: 3, action: 3 }),
    option('mi-q3-c', '错过会难受，赶紧上车', { planning: 0, risk: 3, action: 2 })
  ]),
  question('money-instinct', 'mi-q4', '你对预算的态度是？', [
    option('mi-q4-a', '每月固定复盘', { planning: 3, risk: 1, action: 2 }),
    option('mi-q4-b', '大概有数就行', { planning: 2, risk: 2, action: 2 }),
    option('mi-q4-c', '花完再说', { planning: 0, risk: 2, action: 1 })
  ]),
  question('money-instinct', 'mi-q5', '你更愿意为哪件事投入？', [
    option('mi-q5-a', '学习和证书', { planning: 3, risk: 1, action: 2 }),
    option('mi-q5-b', '副业工具', { planning: 2, risk: 2, action: 3 }),
    option('mi-q5-c', '体验和旅行', { planning: 1, risk: 2, action: 2 })
  ]),
  question('money-instinct', 'mi-q6', '面对亏损，你更可能？', [
    option('mi-q6-a', '止损并复盘', { planning: 3, risk: 1, action: 2 }),
    option('mi-q6-b', '继续补仓等反弹', { planning: 1, risk: 3, action: 2 }),
    option('mi-q6-c', '先离开市场冷静', { planning: 2, risk: 1, action: 1 })
  ]),
  question('money-instinct', 'mi-q7', '你喜欢哪种赚钱方式？', [
    option('mi-q7-a', '稳定积累', { planning: 3, risk: 1, action: 1 }),
    option('mi-q7-b', '抓机会快速试错', { planning: 1, risk: 3, action: 3 }),
    option('mi-q7-c', '用专业能力换增长', { planning: 3, risk: 2, action: 3 })
  ]),
  question('money-instinct', 'mi-q8', '看到打折促销，你会？', [
    option('mi-q8-a', '只买清单内的', { planning: 3, risk: 0, action: 1 }),
    option('mi-q8-b', '比较后买需要的', { planning: 2, risk: 1, action: 2 }),
    option('mi-q8-c', '先囤一些再说', { planning: 0, risk: 2, action: 2 })
  ]),
  question('money-instinct', 'mi-q9', '你更相信哪句话？', [
    option('mi-q9-a', '现金流比面子重要', { planning: 3, risk: 1, action: 1 }),
    option('mi-q9-b', '机会来了要敢冲', { planning: 1, risk: 3, action: 3 }),
    option('mi-q9-c', '认知升级最值钱', { planning: 3, risk: 2, action: 2 })
  ]),
  question('money-instinct', 'mi-q10', '你最需要补强的财务能力是？', [
    option('mi-q10-a', '长期规划', { planning: 3, risk: 1, action: 1 }),
    option('mi-q10-b', '风险判断', { planning: 2, risk: 3, action: 1 }),
    option('mi-q10-c', '执行和变现', { planning: 1, risk: 2, action: 3 })
  ])
]

const workplaceQuestions: TestQuestion[] = [
  question('career-engine', 'ce-q1', '新任务来了，你会先？', [
    option('ce-q1-a', '拆目标和节点', { execution: 3, collaboration: 1, leadership: 2 }),
    option('ce-q1-b', '找相关人同步信息', { execution: 1, collaboration: 3, leadership: 2 }),
    option('ce-q1-c', '判断优先级和资源', { execution: 2, collaboration: 2, leadership: 3 })
  ]),
  question('career-engine', 'ce-q2', '团队意见分裂时，你通常？', [
    option('ce-q2-a', '把方案优劣列出来', { execution: 3, collaboration: 2, leadership: 2 }),
    option('ce-q2-b', '让每个人充分表达', { execution: 1, collaboration: 3, leadership: 2 }),
    option('ce-q2-c', '推动形成决策', { execution: 2, collaboration: 2, leadership: 3 })
  ]),
  question('career-engine', 'ce-q3', '临近 deadline，你会？', [
    option('ce-q3-a', '聚焦交付最小闭环', { execution: 3, collaboration: 1, leadership: 2 }),
    option('ce-q3-b', '协调大家互相补位', { execution: 2, collaboration: 3, leadership: 2 }),
    option('ce-q3-c', '重新划分优先级', { execution: 2, collaboration: 2, leadership: 3 })
  ]),
  question('career-engine', 'ce-q4', '你更享受哪种成就感？', [
    option('ce-q4-a', '把复杂事情做完', { execution: 3, collaboration: 1, leadership: 1 }),
    option('ce-q4-b', '让团队配合顺起来', { execution: 1, collaboration: 3, leadership: 2 }),
    option('ce-q4-c', '带方向拿结果', { execution: 2, collaboration: 2, leadership: 3 })
  ]),
  question('career-engine', 'ce-q5', '别人给你模糊需求时，你会？', [
    option('ce-q5-a', '追问验收标准', { execution: 3, collaboration: 2, leadership: 2 }),
    option('ce-q5-b', '确认对方真实目标', { execution: 1, collaboration: 3, leadership: 2 }),
    option('ce-q5-c', '主动提出路径', { execution: 2, collaboration: 2, leadership: 3 })
  ]),
  question('career-engine', 'ce-q6', '你对会议的态度是？', [
    option('ce-q6-a', '要有结论和负责人', { execution: 3, collaboration: 1, leadership: 2 }),
    option('ce-q6-b', '好的会议能减少误解', { execution: 1, collaboration: 3, leadership: 1 }),
    option('ce-q6-c', '会议应服务决策', { execution: 2, collaboration: 2, leadership: 3 })
  ]),
  question('career-engine', 'ce-q7', '你最常被夸的是？', [
    option('ce-q7-a', '靠谱能落地', { execution: 3, collaboration: 1, leadership: 1 }),
    option('ce-q7-b', '沟通舒服', { execution: 1, collaboration: 3, leadership: 1 }),
    option('ce-q7-c', '看问题有全局感', { execution: 2, collaboration: 2, leadership: 3 })
  ]),
  question('career-engine', 'ce-q8', '面对跨部门合作，你会？', [
    option('ce-q8-a', '明确接口和时间点', { execution: 3, collaboration: 2, leadership: 2 }),
    option('ce-q8-b', '先建立信任关系', { execution: 1, collaboration: 3, leadership: 1 }),
    option('ce-q8-c', '对齐共同目标', { execution: 2, collaboration: 3, leadership: 3 })
  ]),
  question('career-engine', 'ce-q9', '当方案被挑战，你会？', [
    option('ce-q9-a', '用数据回应', { execution: 3, collaboration: 1, leadership: 2 }),
    option('ce-q9-b', '先理解对方担心', { execution: 1, collaboration: 3, leadership: 1 }),
    option('ce-q9-c', '调整方向但守住目标', { execution: 2, collaboration: 2, leadership: 3 })
  ]),
  question('career-engine', 'ce-q10', '你下一阶段最想提升？', [
    option('ce-q10-a', '执行效率', { execution: 3, collaboration: 1, leadership: 1 }),
    option('ce-q10-b', '影响他人', { execution: 1, collaboration: 3, leadership: 2 }),
    option('ce-q10-c', '决策和带队', { execution: 2, collaboration: 2, leadership: 3 })
  ])
]

export const tests: TestDefinition[] = [
  makeTest({
    id: 'emotional-radar',
    title: '情绪雷达测试',
    subtitle: '从题库随机抽取 8 题，测你的共情、稳定和表达',
    category: 'eq',
    description: '每次测试会从情绪题库中随机抽题，生成你的情绪雷达画像。',
    questionCount: 8,
    estimatedMinutes: 3,
    popularity: '8.6w',
    coverTone: 'forest',
    bankSize: 500,
    bankSource: '原创情绪情境题库，参考公开人格/情绪测评维度设计',
    dimensions: [
      { key: 'empathy', label: '共情力' },
      { key: 'stability', label: '稳定感' },
      { key: 'expression', label: '表达力' }
    ],
    questions: buildAssessmentBank({
      testId: 'emotional-radar',
      seedQuestions: emotionalRadarQuestions,
      domains: ['empathy', 'stability', 'expression']
    }),
    resultRanges: [
      makeResult('warm-listener', 0, 26, '温柔倾听者', '你的雷达很会接住微小情绪。', '你对别人的状态很敏感，擅长在细节里读懂空气。', ['练习把需求说得更直接', '别把所有人的情绪都扛在自己身上']),
      makeResult('steady-anchor', 27, 42, '稳定定海针', '你的情绪场像一张安全网。', '你能在变化里保持节奏，也愿意让身边人安心。', ['给自己保留放松出口', '在重要关系里多表达真实感受']),
      makeResult('bright-connector', 43, 80, '明亮连接者', '你擅长把感受变成连接。', '你愿意主动表达，也能用语言推动关系靠近。', ['表达前先确认对方状态', '把热情用在真正值得的人身上'])
    ]
  }),
  makeTest({
    id: 'brain-spark',
    title: '国际脑力挑战',
    subtitle: '参考常见 IQ 测试维度，从 500 题题库随机抽取 10 题',
    category: 'iq',
    description: '这不是正式 IQ 诊断，而是参考国际常见智力测验的数列、类比、空间、逻辑和记忆维度设计的原创娱乐测评。',
    questionCount: 10,
    estimatedMinutes: 5,
    popularity: '12.8w',
    coverTone: 'sunset',
    bankSize: 500,
    scoringModel: 'iq-standard',
    bankSource: '原创认知题，参考 ICAR 公开认知测评题型方向',
    dimensions: [
      { key: 'logic', label: '逻辑推理' },
      { key: 'pattern', label: '规律识别' },
      { key: 'spatial', label: '空间想象' },
      { key: 'memory', label: '工作记忆' }
    ],
    questions: buildIqQuestionBank(brainSparkQuestions),
    resultRanges: [
      makeResult('detail-hunter', 55, 89, '细节猎人', '你靠线索点亮答案。', '这次结果是准标准化脑力估计，不等同于临床 IQ 或正式智力诊断。', ['遇到复杂问题时先抓主线', '给直觉留一点试错空间']),
      makeResult('logic-builder', 90, 114, '逻辑搭桥人', '你喜欢把混乱整理成路径。', '你的优势是结构化和推理，能把看似零散的现象串成清楚的解释。', ['别让规则限制所有想象', '尝试用草图表达你的推理']),
      makeResult('spark-maker', 115, 145, '高能脑力火花', '你的脑力反应有很强的综合跃迁感。', '你能在规律、空间和逻辑之间快速切换。分数后续可用真实样本继续校准。', ['继续训练限时推理', '尝试矩阵推理和空间折叠题'])
    ]
  }),
  makeTest({
    id: 'inner-weather',
    title: '内在天气测试',
    subtitle: '从性格题库随机抽取 8 题，看看你的能量天气',
    category: 'personality',
    description: '通过日常选择生成你的内在天气报告，观察你的能量、决策和社交倾向。',
    questionCount: 8,
    estimatedMinutes: 3,
    popularity: '9.1w',
    coverTone: 'ocean',
    bankSize: 500,
    bankSource: '原创性格情境题库，参考 IPIP 公开人格维度方向',
    dimensions: [
      { key: 'energy', label: '能量感' },
      { key: 'decision', label: '决策感' },
      { key: 'social', label: '社交感' }
    ],
    questions: buildAssessmentBank({
      testId: 'inner-weather',
      seedQuestions: innerWeatherQuestions,
      domains: ['energy', 'decision', 'social']
    }),
    resultRanges: [
      makeResult('sunny-breeze', 0, 24, '晴风型人格', '你像明亮但不刺眼的风。', '你给人的感觉轻盈、舒服，擅长在关系里制造自然的松弛感。', ['重要机会来临时更主动一点', '把你的好状态留给自己一部分']),
      makeResult('steady-cloud', 25, 40, '稳定云层型人格', '你有自己的节奏和边界。', '你不急着被外界推着走，更相信稳定积累。', ['别把谨慎误认为拖延', '让亲近的人知道你的真实想法']),
      makeResult('bright-tide', 41, 80, '亮潮型人格', '你的能量会带动一片海面。', '你容易成为气氛里的推动者，决策和表达都带着明显的存在感。', ['给低能量时刻留缓冲', '别急着替所有人决定方向'])
    ]
  }),
  makeTest({
    id: 'romance-compass',
    title: '恋爱罗盘测试',
    subtitle: '随机抽取 7 题，看看你的亲密关系导航方式',
    category: 'romance',
    description: '从安全感、温度和边界三个角度，生成你的恋爱罗盘。',
    questionCount: 7,
    estimatedMinutes: 3,
    popularity: '7.4w',
    coverTone: 'forest',
    bankSize: 500,
    bankSource: '原创亲密关系情境题库',
    dimensions: [
      { key: 'security', label: '安全感' },
      { key: 'warmth', label: '关系温度' },
      { key: 'boundary', label: '边界感' }
    ],
    questions: buildAssessmentBank({
      testId: 'romance-compass',
      seedQuestions: romanceQuestions,
      domains: ['security', 'warmth', 'boundary']
    }),
    resultRanges: [
      makeResult('soft-harbor', 0, 21, '柔软港湾', '你很重视被看见和被回应。', '你的爱很有温度，也容易被细微变化牵动。', ['把需求说清楚', '练习给关系留一点呼吸感']),
      makeResult('steady-lover', 22, 34, '稳定恋人', '你适合慢慢建立深关系。', '你重视信任、修复和持续行动。', ['别把稳定藏成沉默', '主动制造一点浪漫']),
      makeResult('free-compass', 35, 70, '自由罗盘', '你能靠近，也能保留自己。', '你的亲密关系观成熟而有边界，适合共同成长型关系。', ['别太快进入理性模式', '多表达当下的喜欢'])
    ]
  }),
  makeTest({
    id: 'money-instinct',
    title: '财富直觉测试',
    subtitle: '随机抽取 7 题，测你的金钱规划和风险偏好',
    category: 'wealth',
    description: '从规划、风险和行动三个方向，观察你的财富决策风格。',
    questionCount: 7,
    estimatedMinutes: 3,
    popularity: '5.9w',
    coverTone: 'sunset',
    bankSize: 500,
    bankSource: '原创财富决策情境题库',
    dimensions: [
      { key: 'planning', label: '规划力' },
      { key: 'risk', label: '风险感' },
      { key: 'action', label: '行动力' }
    ],
    questions: buildAssessmentBank({
      testId: 'money-instinct',
      seedQuestions: wealthQuestions,
      domains: ['planning', 'risk', 'action']
    }),
    resultRanges: [
      makeResult('safe-saver', 0, 20, '稳健储蓄派', '你把安全垫看得很重要。', '你的财务风格稳，但有时会错过小规模试错机会。', ['建立投资学习清单', '用小预算练习决策']),
      makeResult('balanced-builder', 21, 32, '平衡建造者', '你愿意计划，也愿意行动。', '你能在安全和增长之间找到自己的节奏。', ['固定复盘现金流', '把机会拆成可承受风险']),
      makeResult('opportunity-hunter', 33, 70, '机会猎手', '你对增长机会很敏锐。', '你行动快，适合副业和项目制探索，但需要更强风控。', ['先算最坏情况', '给冲动决策设置冷静期'])
    ]
  }),
  makeTest({
    id: 'career-engine',
    title: '职场引擎测试',
    subtitle: '随机抽取 7 题，定位你的职场驱动力',
    category: 'workplace',
    description: '从执行、协作和领导三个方向，看你在团队中最自然的发力点。',
    questionCount: 7,
    estimatedMinutes: 3,
    popularity: '6.7w',
    coverTone: 'ocean',
    bankSize: 500,
    bankSource: '原创职场行为情境题库',
    dimensions: [
      { key: 'execution', label: '执行力' },
      { key: 'collaboration', label: '协作力' },
      { key: 'leadership', label: '领导力' }
    ],
    questions: buildAssessmentBank({
      testId: 'career-engine',
      seedQuestions: workplaceQuestions,
      domains: ['execution', 'collaboration', 'leadership']
    }),
    resultRanges: [
      makeResult('delivery-pro', 0, 20, '交付推进器', '你擅长把事情真正做完。', '你的优势是落地、闭环和可靠，是团队里的稳定输出点。', ['适当抬头看全局', '别把所有执行都揽到自己身上']),
      makeResult('team-connector', 21, 32, '团队连接器', '你让合作变顺。', '你擅长对齐信息、照顾节奏，让不同角色更容易一起工作。', ['会议后明确行动项', '把你的协调价值显性化']),
      makeResult('direction-driver', 33, 70, '方向驱动者', '你天然会看目标和决策。', '你适合承担更高责任，推动资源、方向和结果对齐。', ['补强细节跟进', '给团队留出参与感'])
    ]
  })
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
