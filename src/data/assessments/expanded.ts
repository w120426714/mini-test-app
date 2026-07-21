import type { TestDefinition, TestResultRange } from '../../types/test'
import { createExpandedAssessment, createSeedQuestion } from './expandedFactory'

function result(
  id: string,
  min: number,
  max: number,
  title: string,
  tagline: string,
  description: string,
  suggestions: [string, string]
): TestResultRange {
  return { id, min, max, title, tagline, description, suggestions }
}

const focusLabSeeds = [
  createSeedQuestion('focus-lab', 1, '读到关键段落时手机亮起通知，你会怎么处理？', 'attention', [
    '马上点开通知，再回来寻找刚才的位置',
    '先读完这一段，再统一查看消息',
    '把手机扣放并设十分钟专注计时'
  ]),
  createSeedQuestion('focus-lab', 2, '临时要记住门牌号 4072，几分钟后使用，你会？', 'memory', [
    '只在心里快速念一遍',
    '把数字分成 40 和 72 两组复述',
    '把 4072 联想到具体画面并间隔回想'
  ]),
  createSeedQuestion('focus-lab', 3, '会议中突然点到你回答刚展示的数据，你通常？', 'speed', [
    '先凭模糊印象给出一个答案',
    '用几秒定位图表里的关键数字再回答',
    '迅速复述问题并同时提取刚才的数据线索'
  ]),
  createSeedQuestion('focus-lab', 4, '开放办公区有人持续聊天，你需要完成校对，会？', 'attention', [
    '一边听聊天一边反复检查同一行',
    '戴上耳机，用白噪声隔开部分干扰',
    '移到安静位置并按段落设置核对节点'
  ]),
  createSeedQuestion('focus-lab', 5, '同事口头交代三个有先后顺序的小任务，你会？', 'memory', [
    '记住大概内容，做的时候再问',
    '按顺序复述一次，确认没有听漏',
    '把三个任务编成简短动作链并立即记下关键词'
  ]),
  createSeedQuestion('focus-lab', 6, '屏幕弹出需要快速判断的异常提醒，你会？', 'speed', [
    '看到红色就立刻选择最醒目的按钮',
    '先辨认提醒类别，再按熟悉流程处理',
    '快速核对类别、影响和可逆性后作出选择'
  ]),
  createSeedQuestion('focus-lab', 7, '长文读到一半发现思绪飘走，你通常？', 'attention', [
    '继续往下扫，希望自然找回状态',
    '回到上一小段，划出一句中心句',
    '暂停十秒，写下当前问题后再从锚点重读'
  ]),
  createSeedQuestion('focus-lab', 8, '刚看过一串取件信息，走到柜机前却有些模糊，你会？', 'memory', [
    '连续尝试几个相近号码',
    '回忆信息出现时的版面和数字顺序',
    '先还原取件场景，再按分组节奏完整复述'
  ])
]

const socialSignalSeeds = [
  createSeedQuestion('social-signal', 1, '朋友说“没事”却明显放慢语速，你会？', 'empathy', [
    '按字面理解，马上换个轻松话题',
    '留意语气，问一句是不是有点累',
    '温和指出你感到他情绪变了，并给他选择是否聊聊'
  ]),
  createSeedQuestion('social-signal', 2, '熟人再次临时请你替他完成工作，你会？', 'boundary', [
    '虽然不方便，还是先答应下来',
    '说明今天的安排，只接下能完成的一小部分',
    '清楚拒绝本次代办，并和对方约定以后提前沟通'
  ]),
  createSeedQuestion('social-signal', 3, '小组讨论里你的观点被误解，你会？', 'expression', [
    '暂时不解释，等别人自己发现',
    '补充一句自己的核心意思',
    '先确认误解点，再用具体例子重新表达立场'
  ]),
  createSeedQuestion('social-signal', 4, '聚餐时新朋友一直没有加入谈话，你会？', 'empathy', [
    '认为他喜欢安静，不特别干预',
    '找一个他可能熟悉的话题邀请回应',
    '观察他的舒适度，私下给出自然参与或休息的空间'
  ]),
  createSeedQuestion('social-signal', 5, '聊天对象连续追问你不想公开的私事，你会？', 'boundary', [
    '含糊回答一些，避免场面尴尬',
    '笑着说这个话题想先保留',
    '明确说不讨论，并主动把对话带回双方都舒适的话题'
  ]),
  createSeedQuestion('social-signal', 6, '你需要向伙伴提出一个不同意见，会怎么开口？', 'expression', [
    '只说“我觉得不太行”',
    '说明你担心的具体环节',
    '先对齐共同目标，再陈述依据并提出可替代方案'
  ]),
  createSeedQuestion('social-signal', 7, '同事情绪激动地抱怨一次失误，你会？', 'empathy', [
    '马上告诉他正确做法',
    '先复述你听到的挫败感，再问需要什么帮助',
    '先让他把过程说完，确认感受后一起区分事实与下一步'
  ]),
  createSeedQuestion('social-signal', 8, '群聊里有人拿你的短处开玩笑，你并不舒服，会？', 'boundary', [
    '发个笑脸，假装没有介意',
    '私下告诉对方这个玩笑让你不舒服',
    '当场平静叫停，并私下说明以后可接受的玩笑边界'
  ])
]

const resilienceMapSeeds = [
  createSeedQuestion('resilience-map', 1, '准备很久的方案落选，当天晚上你会？', 'recovery', [
    '反复刷结果，让自己一直困在失落里',
    '先休息，第二天再整理评审反馈',
    '允许自己失落一阵，再安排恢复活动和明确复盘时间'
  ]),
  createSeedQuestion('resilience-map', 2, '计划因外部变化被迫延期，你更容易想到？', 'optimism', [
    '这次延期说明后面大概也不会顺利',
    '至少还有时间补齐容易忽略的部分',
    '把延期视为重新校准窗口，同时保留对风险的现实判断'
  ]),
  createSeedQuestion('resilience-map', 3, '刚熟悉的工作流程突然全部更换，你会？', 'adaptation', [
    '继续沿用旧流程，等别人先适应',
    '先学最常用的步骤，边做边补',
    '画出新旧流程差异，优先练习影响最大的三个环节'
  ]),
  createSeedQuestion('resilience-map', 4, '连续忙碌一周后注意力明显下降，你会？', 'recovery', [
    '靠更多咖啡继续硬撑',
    '减少非必要任务，早点结束一天',
    '主动重排负荷，并用睡眠、运动和无屏时间恢复节奏'
  ]),
  createSeedQuestion('resilience-map', 5, '一次公开表达没有达到预期，你如何看待下次？', 'optimism', [
    '觉得自己不适合公开表达',
    '相信多准备一次会有所改善',
    '把失误拆成可练习环节，并为下一次设一个具体进步目标'
  ]),
  createSeedQuestion('resilience-map', 6, '出行当天交通方案临时取消，你会？', 'adaptation', [
    '停在原地抱怨安排被打乱',
    '搜索一条替代路线，接受晚一点到',
    '快速比较时间、成本和可靠性，选方案并通知相关的人'
  ]),
  createSeedQuestion('resilience-map', 7, '一场争执后你仍感到心里发紧，通常会？', 'recovery', [
    '继续在脑中重演每句话',
    '暂时离开现场，让情绪慢慢下降',
    '先稳定呼吸和身体感受，再记录触发点并决定何时沟通'
  ]),
  createSeedQuestion('resilience-map', 8, '新项目方向还很模糊，你会怎么开始？', 'optimism', [
    '等所有信息齐全再行动',
    '先做一个小版本看看反馈',
    '明确可控假设，用小实验验证，并为不同结果准备下一步'
  ])
]

const attachmentWeatherSeeds = [
  createSeedQuestion('attachment-weather', 1, '重要的人几个小时没有回复消息，你会？', 'security', [
    '不断刷新对话并猜测关系出了问题',
    '提醒自己对方可能在忙，晚些再看',
    '保持原有安排，需要时发一条清晰且不催促的信息'
  ]),
  createSeedQuestion('attachment-weather', 2, '伴侣分享一天里很小的烦恼，你会？', 'closeness', [
    '觉得事情不大，很快给出解决办法',
    '停下手边的事，听完再回应',
    '先共情细节，再询问他想被倾听还是一起想办法'
  ]),
  createSeedQuestion('attachment-weather', 3, '周末双方都没有共同安排，你更倾向？', 'independence', [
    '一定要临时安排两个人一起做事',
    '各自活动一段时间，晚上再碰面',
    '安心保留个人计划，同时主动约定下一次共享时间'
  ]),
  createSeedQuestion('attachment-weather', 4, '一次小矛盾让关系气氛变冷，你会？', 'security', [
    '马上要求对方证明仍然在乎你',
    '等双方平静后提出想谈谈',
    '区分情绪和关系事实，约定具体时间共同修复'
  ]),
  createSeedQuestion('attachment-weather', 5, '对方邀请你参与他很看重的兴趣活动，你会？', 'closeness', [
    '如果不是自己的兴趣就直接拒绝了解',
    '陪他体验一次，看看为什么重要',
    '带着好奇参与，也分享自己真实的感受和兴趣边界'
  ]),
  createSeedQuestion('attachment-weather', 6, '进入一段关系后，你如何安排原有朋友时间？', 'independence', [
    '大幅减少朋友往来，把时间都留给伴侣',
    '尽量维持原有联系，也和伴侣协调',
    '保留稳定社交支持，并透明安排彼此都认可的相处节奏'
  ]),
  createSeedQuestion('attachment-weather', 7, '对方表达一个与你不同的未来设想，你会？', 'security', [
    '立刻把不同理解成关系不够坚定',
    '先听清他的考虑，再说自己的担心',
    '确认共同基础，具体讨论差异、弹性和不能妥协的部分'
  ]),
  createSeedQuestion('attachment-weather', 8, '你最近压力很大但仍想维持连接，会？', 'closeness', [
    '不说压力，勉强保持和平时一样',
    '告诉对方最近能量有限，希望简单陪伴',
    '明确自己的状态和可用精力，一起选择低负担的连接方式'
  ])
]

const spendingStyleSeeds = [
  createSeedQuestion('spending-style', 1, '发薪后看到一直想买的高价耳机，你会？', 'planning', [
    '趁兴奋立刻下单，之后再调整支出',
    '先查看本月固定开销和可用余额',
    '核对预算、使用频率和替代品，再设一个决定日期'
  ]),
  createSeedQuestion('spending-style', 2, '直播间出现十分钟限时折扣，你会？', 'impulse', [
    '担心错过，先买了再说',
    '退出页面几分钟，确认是否原本就需要',
    '加入清单但不付款，隔天按需求和预算重新判断'
  ]),
  createSeedQuestion('spending-style', 3, '两款外套价格相近，你会重点比较？', 'value', [
    '哪件当下看起来更抢眼',
    '面料和能搭配现有衣服的数量',
    '耐用度、穿着频率、维护成本和实际舒适度'
  ]),
  createSeedQuestion('spending-style', 4, '朋友临时提议一次超出月度娱乐预算的旅行，你会？', 'planning', [
    '先答应，回来再想怎么填补缺口',
    '计算需要压缩哪些支出后再决定',
    '比较总成本、储蓄目标和替代日期，再给出明确选择'
  ]),
  createSeedQuestion('spending-style', 5, '购物车里堆了许多小额商品，你准备结账时会？', 'impulse', [
    '觉得单价都不高，直接一起付款',
    '删除几件明显重复的商品',
    '逐件回答用途、使用时间和不买的影响，只保留通过的'
  ]),
  createSeedQuestion('spending-style', 6, '常用软件推出年费和月费两种方案，你会？', 'value', [
    '选择看起来折扣最大的年费',
    '按过去使用月份估算哪种更合适',
    '同时比较使用概率、退出成本、替代工具和现金流占用'
  ]),
  createSeedQuestion('spending-style', 7, '收到一笔计划外奖金，你首先会？', 'planning', [
    '马上奖励自己买一件大件',
    '先存下一部分，再考虑想买的东西',
    '按储备、长期目标和自由消费预先设定比例'
  ]),
  createSeedQuestion('spending-style', 8, '网购商品到手后“还行但不惊喜”，你会？', 'impulse', [
    '嫌退货麻烦，先留下再说',
    '对照购买理由，决定是否真的会使用',
    '在退货期限前试用并记录场景，不满足标准就及时退回'
  ])
]

const careerValuesSeeds = [
  createSeedQuestion('career-values', 1, '两个岗位薪资接近，你会如何看待学习机会？', 'growth', [
    '只看入职后最容易完成的工作',
    '比较一年内能接触的新技能和项目',
    '评估导师、反馈密度、挑战梯度和技能可迁移性'
  ]),
  createSeedQuestion('career-values', 2, '主管给你目标，但允许自行设计路径，你会？', 'autonomy', [
    '希望他把每一步都明确下来',
    '先提出自己的方案，再确认关键节点',
    '主动定义方法、里程碑和风险，只在关键决策处对齐'
  ]),
  createSeedQuestion('career-values', 3, '项目成果不容易被看见，但能改善很多人的流程，你会？', 'impact', [
    '因为曝光少而降低投入',
    '确认确实有用后认真完成',
    '用使用者反馈验证价值，并推动成果持续产生影响'
  ]),
  createSeedQuestion('career-values', 4, '你已经熟练完成当前工作，下一步更想？', 'growth', [
    '继续做熟悉任务，尽量不增加难度',
    '申请一个略有挑战的新模块',
    '选择能补齐关键能力的挑战，并设定复盘和反馈机制'
  ]),
  createSeedQuestion('career-values', 5, '团队要求统一流程，但你发现有更高效的方法，会？', 'autonomy', [
    '完全照旧执行，不提出变化',
    '先用小范围数据验证，再和负责人讨论',
    '在守住共同标准的前提下提交可回退实验和评估指标'
  ]),
  createSeedQuestion('career-values', 6, '选择季度项目时，你最关心成果去向？', 'impact', [
    '只要任务容易完成，成果去向不重要',
    '希望成果能解决一个明确业务问题',
    '优先选择能改善关键用户体验且可衡量长期效果的项目'
  ]),
  createSeedQuestion('career-values', 7, '一次复盘指出你的核心能力仍有短板，你会？', 'growth', [
    '先解释为什么这次情况特殊',
    '请对方给出一个改进建议并尝试',
    '确认具体行为证据，制定练习计划并约定再次反馈'
  ]),
  createSeedQuestion('career-values', 8, '跨部门任务没有现成负责人，你会？', 'autonomy', [
    '等上级指定负责人和详细分工',
    '先梳理需要推进的事项并发起讨论',
    '主动搭建协作框架、明确决策权，并邀请相关人共同确认'
  ])
]

export const expandedTests: TestDefinition[] = [
  createExpandedAssessment({
    id: 'focus-lab',
    title: '专注力实验室',
    subtitle: '随机抽取 8 题，观察注意控制、工作记忆与反应节奏',
    category: 'iq',
    description: '以日常认知情境观察专注倾向的娱乐测试，不提供正式 IQ 分数、临床判断或诊断。',
    popularity: '7.8w',
    coverTone: 'ocean',
    bankSource: '原创日常专注情境题库，非正式量表、非临床诊断',
    dimensions: [
      { key: 'attention', label: '注意控制' },
      { key: 'memory', label: '工作记忆' },
      { key: 'speed', label: '反应速度' }
    ],
    seedQuestions: focusLabSeeds,
    resultRanges: [
      result('focus-wanderer', 0, 12, '灵感游走者', '你的注意容易被新线索带走。', '你对环境变化敏感，快速切换有优势，但持续任务更需要外部结构。', ['一次只保留一个可见任务', '用短计时和明确锚点练习回到当前']),
      result('focus-balancer', 13, 19, '节奏调度员', '你能在专注和切换之间找平衡。', '多数日常场景里，你会使用简单策略保护记忆与注意。', ['把有效策略固定成习惯', '高压前先减少通知与多任务']),
      result('focus-navigator', 20, 32, '专注导航员', '你善于管理注意资源。', '你倾向先辨认任务线索，再用结构化方法保持反应质量。', ['给大脑安排真正的恢复间隔', '避免把高专注误当成必须时刻紧绷'])
    ]
  }),
  createExpandedAssessment({
    id: 'social-signal',
    title: '社交信号测试',
    subtitle: '随机抽取 8 题，看看你如何读懂人际信号并表达自己',
    category: 'eq',
    description: '从共情、边界与表达观察日常互动风格，仅供自我探索，不构成心理评估。',
    popularity: '8.2w',
    coverTone: 'forest',
    bankSource: '原创人际沟通情境题库，非专有量表、非临床评估',
    dimensions: [
      { key: 'empathy', label: '共情' },
      { key: 'boundary', label: '边界' },
      { key: 'expression', label: '表达' }
    ],
    seedQuestions: socialSignalSeeds,
    resultRanges: [
      result('signal-observer', 0, 12, '谨慎观察者', '你常先确认气氛，再决定靠近。', '你能察觉部分社交线索，但可能为了避免冲突而压低自己的需要。', ['从一句具体感受开始表达', '把拒绝写成清楚而友善的完整句子']),
      result('signal-translator', 13, 19, '信号翻译者', '你会在理解别人和说明自己之间转换。', '你通常能兼顾关系温度与个人边界，并愿意澄清误会。', ['在复杂对话里多确认一次理解', '留意自己是否承担了过多情绪工作']),
      result('signal-connector', 20, 32, '清晰连接者', '你的沟通既有温度也有轮廓。', '你倾向读懂情绪、守住边界，并把真实想法转化成可对话的信息。', ['接受并非所有信号都能读准', '给较慢表达的人留出回应时间'])
    ]
  }),
  createExpandedAssessment({
    id: 'resilience-map',
    title: '心理韧性地图',
    subtitle: '随机抽取 8 题，描绘你的恢复、积极预期与适应方式',
    category: 'personality',
    description: '通过常见挫折情境探索恢复习惯与适应倾向，仅供娱乐和自我反思。',
    popularity: '7.3w',
    coverTone: 'sunset',
    bankSource: '原创日常韧性情境题库，非专有量表、非临床诊断',
    dimensions: [
      { key: 'recovery', label: '恢复' },
      { key: 'optimism', label: '积极预期' },
      { key: 'adaptation', label: '适应' }
    ],
    seedQuestions: resilienceMapSeeds,
    resultRanges: [
      result('resilience-shelter', 0, 12, '缓冲筑巢者', '你需要先获得安全空间再重新出发。', '压力来临时，你可能停留在情绪或旧方法里更久，充分恢复尤其重要。', ['先恢复睡眠和基本节奏', '把下一步缩小到十分钟能完成']),
      result('resilience-traveler', 13, 19, '稳步行路者', '你会边消化变化，边寻找可走的路。', '你能在现实限制下逐渐恢复，并使用小行动维持希望。', ['记录哪些恢复方式真的有效', '为高压时期预留替代方案']),
      result('resilience-cartographer', 20, 32, '韧性绘图师', '你擅长在变化里重新画路线。', '你能结合情绪恢复、现实判断和小实验，把挫折转为新的行动信息。', ['别跳过失落本身的感受', '在独自扛住之前主动调用支持'])
    ]
  }),
  createExpandedAssessment({
    id: 'attachment-weather',
    title: '依恋天气测试',
    subtitle: '随机抽取 8 题，观察亲密关系里的安全、靠近与独立',
    category: 'romance',
    description: '以原创关系情境呈现你的互动倾向，不复制依恋专有量表，也不作临床判断。',
    popularity: '9.0w',
    coverTone: 'forest',
    bankSource: '原创亲密关系互动题库，非专有量表、非临床诊断',
    dimensions: [
      { key: 'security', label: '安全感' },
      { key: 'closeness', label: '亲密' },
      { key: 'independence', label: '独立' }
    ],
    seedQuestions: attachmentWeatherSeeds,
    resultRanges: [
      result('weather-drizzle', 0, 12, '细雨感应型', '你很在意关系温度的细微变化。', '你渴望稳定连接，也可能在不确定时迅速寻找确认。', ['用具体请求替代反复猜测', '保留让自己安定的个人日程']),
      result('weather-cloudbreak', 13, 19, '云隙平衡型', '你能靠近，也会为彼此留一点空间。', '你通常愿意沟通需要，并尝试在陪伴与独立之间协调。', ['提前约定冲突后的修复方式', '把“没事”换成更准确的感受']),
      result('weather-clear', 20, 32, '晴空共生型', '你的连接感有温度，也有边界。', '你倾向信任关系基础，同时保持个人支持系统和清晰表达。', ['不要只靠理性跳过脆弱', '持续创造轻松而具体的共同体验'])
    ]
  }),
  createExpandedAssessment({
    id: 'spending-style',
    title: '消费决策画像',
    subtitle: '随机抽取 8 题，看看你的规划、冲动控制与价值判断',
    category: 'wealth',
    description: '从日常消费选择观察决策习惯，仅供自我了解，不构成投资或财务建议。',
    popularity: '6.5w',
    coverTone: 'sunset',
    bankSource: '原创消费决策情境题库，非专有量表、非临床评估或投资建议',
    dimensions: [
      { key: 'planning', label: '规划' },
      { key: 'impulse', label: '冲动控制' },
      { key: 'value', label: '价值判断' }
    ],
    seedQuestions: spendingStyleSeeds,
    resultRanges: [
      result('spending-spark', 0, 12, '即时火花型', '新鲜感很容易推动你的购买决定。', '你能迅速获得体验，但限时刺激和小额叠加可能挤压长期目标。', ['给非必需品设置二十四小时清单', '每周查看一次小额支出总和']),
      result('spending-editor', 13, 19, '预算编辑型', '你会在想要与可用资源之间做取舍。', '你已有基本规划和比较习惯，偶尔仍会被便利或折扣带走。', ['为自由消费设独立额度', '购买前写下一条明确使用场景']),
      result('spending-curator', 20, 32, '价值策展型', '你更愿意为长期使用价值买单。', '你倾向同时考虑预算、机会成本和真实需求，让消费服务于生活重点。', ['避免为了完美比较消耗过多时间', '预算内也保留适度的纯粹快乐'])
    ]
  }),
  createExpandedAssessment({
    id: 'career-values',
    title: '职业价值观测试',
    subtitle: '随机抽取 8 题，发现成长、自主与影响之间的工作偏好',
    category: 'workplace',
    description: '通过原创职场选择探索你看重的工作价值，仅供职业反思，不替代专业咨询。',
    popularity: '7.1w',
    coverTone: 'ocean',
    bankSource: '原创职业价值情境题库，非专有量表、非临床或职业诊断',
    dimensions: [
      { key: 'growth', label: '成长' },
      { key: 'autonomy', label: '自主' },
      { key: 'impact', label: '影响' }
    ],
    seedQuestions: careerValuesSeeds,
    resultRanges: [
      result('career-harbor', 0, 12, '稳定港湾型', '清晰和可预期会让你更安心地投入。', '你可能更重视明确路径与可控任务，面对模糊机会时会保持谨慎。', ['选择一个低风险的新能力实验', '向主管确认成果如何连接更大目标']),
      result('career-builder', 13, 19, '成长建造型', '你愿意在空间与支持之间逐步扩张。', '你通常会寻找可学习、有一定自主度且成果可见的工作环境。', ['定期写下真正驱动你的项目特点', '谈岗位时同时询问反馈和决策权限']),
      result('career-compass', 20, 32, '价值罗盘型', '你希望用自己的方式产生真实影响。', '成长机会、自主空间和有意义的结果常共同决定你的投入程度。', ['警惕把所有重要问题都揽在身上', '为价值追求配置可持续的边界'])
    ]
  })
]
