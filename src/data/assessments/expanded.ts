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

const focusLabSupplementalSeeds = [
  createSeedQuestion('focus-lab', 9, '核对合同里的日期和金额时，你会？', 'attention', ['从头快速扫一遍就提交', '分两轮分别检查日期和金额', '遮住无关列，逐项勾选并交叉复核']),
  createSeedQuestion('focus-lab', 10, '在陌生停车场记住车辆位置，你会？', 'memory', ['只记得大概在哪一层', '记住楼层和附近颜色标识', '把楼层、区域字母和参照物组成一句话']),
  createSeedQuestion('focus-lab', 11, '羽毛球突然改变方向飞来，你通常？', 'speed', ['等球落近后再挥拍', '根据来球方向及时调整脚步', '从对方动作预判落点并快速移动']),
  createSeedQuestion('focus-lab', 12, '做饭时同时有三个锅具在工作，你会？', 'attention', ['凭感觉来回查看，容易忘记一个', '给最容易糊的锅单独计时', '按完成顺序排好计时器并只处理当前步骤']),
  createSeedQuestion('focus-lab', 13, '初次见面后需要记住三个人的名字，你会？', 'memory', ['听过就算，不刻意记', '交谈时把名字自然重复一次', '把名字与外貌特征和谈话内容建立联系']),
  createSeedQuestion('focus-lab', 14, '线上操作出现两个相似确认按钮，你会？', 'speed', ['立刻点击颜色更亮的按钮', '停一下读完按钮文字', '快速核对操作目标和撤销成本再点击']),
  createSeedQuestion('focus-lab', 15, '听线上课程时旁边不断弹出群消息，你会？', 'attention', ['边回消息边听，漏掉再回放', '关闭弹窗并记下课后回复', '开启免打扰，按章节做一句话笔记']),
  createSeedQuestion('focus-lab', 16, '别人连续说了四个行走转弯指令，你会？', 'memory', ['只记第一个方向，走到再问', '按左右顺序在心里复述', '把四步画成简短路线并确认终点标志']),
  createSeedQuestion('focus-lab', 17, '过路口时信号灯刚变化，你会？', 'speed', ['跟着前面的人马上走', '看清行人灯后再行动', '同时确认信号、车辆转向和剩余时间']),
  createSeedQuestion('focus-lab', 18, '整理一张有很多相似行的表格，你会？', 'attention', ['不断滚动寻找目标行', '用颜色标记正在处理的行', '先筛选条件，再锁定列并记录处理进度']),
  createSeedQuestion('focus-lab', 19, '短时间记住一次性登录码时，你会？', 'memory', ['盯一眼后直接切换页面', '把数字按三位一组默念', '按节奏分组复述，并在输入前完整回想']),
  createSeedQuestion('focus-lab', 20, '游戏里同时出现奖励和危险提示，你会？', 'speed', ['先点奖励图标再看危险', '先处理离角色最近的危险', '快速判断威胁优先级，再选择安全收益最高的动作']),
  createSeedQuestion('focus-lab', 21, '参加讲座时内容进入较枯燥的部分，你会？', 'attention', ['打开其他应用消磨时间', '用关键词记下讲者的主线', '带着一个问题听，并在每段结束时总结答案']),
  createSeedQuestion('focus-lab', 22, '服务员口头确认五样餐品，你会？', 'memory', ['大概听着，送来再核对', '按人数在心里分组', '复述餐品和特殊要求，确认数量一致']),
  createSeedQuestion('focus-lab', 23, '骑行时前车突然减速，你会？', 'speed', ['反应过来后急刹车', '马上减速并观察一侧空间', '提前保持距离，看到变化立即制动并确认后方']),
  createSeedQuestion('focus-lab', 24, '打包两份收件信息相近的快递，你会？', 'attention', ['凭姓名印象贴标签', '每装一件核对一次姓名', '将物品、地址和标签三项逐单闭环核对']),
  createSeedQuestion('focus-lab', 25, '会议中连续确定了几个负责人和日期，你会？', 'memory', ['只记与自己有关的部分', '会后凭印象补会议记录', '当场按事项记录负责人和日期并口头确认']),
  createSeedQuestion('focus-lab', 26, '烤箱和洗衣机先后响起提示音，你会？', 'speed', ['随便先处理离自己近的', '先判断哪个任务更怕延误', '快速确认两边状态，先处理时间敏感且不可逆的一项']),
  createSeedQuestion('focus-lab', 27, '听有声书时发现过去两分钟完全没听进去，你会？', 'attention', ['继续播放，期待后面能接上', '倒退一分钟重新听', '暂停写下最后记得的情节，再回到明确节点']),
  createSeedQuestion('focus-lab', 28, '学习一个包含六步的新操作流程，你会？', 'memory', ['看完演示就直接尝试', '把流程抄成六个短句', '按阶段练习并在不看提示时完整复述']),
  createSeedQuestion('focus-lab', 29, '公共场所听到异常警报，你会？', 'speed', ['先观察别人是否行动', '停下当前事情并寻找指示', '立即辨认警报来源、出口方向和现场广播']),
  createSeedQuestion('focus-lab', 30, '做呼吸练习时思绪频繁跑开，你会？', 'attention', ['觉得失败，提前结束', '发现走神后把注意带回呼吸', '用数息作为锚点，每次走神都平静重新计数']),
  createSeedQuestion('focus-lab', 31, '第二次见客户时需要把脸和姓名对应起来，你会？', 'memory', ['等对方自我介绍来补救', '提前看一遍参会名单和照片', '回想上次话题，把姓名、面孔和角色三者连接']),
  createSeedQuestion('focus-lab', 32, '需要快速找出两份文本的一处差异，你会？', 'speed', ['凭整体印象猜不同位置', '按段落同步对照', '先锁定结构差异，再逐行扫描关键词和数字']),
  createSeedQuestion('focus-lab', 33, '浏览器开了十几个标签页时，你会？', 'attention', ['来回点开直到找到要用的', '关掉明显无关的页面', '按任务分组，只保留当前步骤需要的标签']),
  createSeedQuestion('focus-lab', 34, '心算中间需要暂存两个结果，你会？', 'memory', ['边算边猜前一个结果', '在心里重复两个中间数', '给中间数分配固定位置，再按运算顺序提取']),
  createSeedQuestion('focus-lab', 35, '收银台提示付款失败且队伍在等，你会？', 'speed', ['连续重复点击付款', '看一眼失败原因再重试', '迅速判断网络、余额或渠道问题并切换可行方案']),
  createSeedQuestion('focus-lab', 36, '工作时背景音乐突然切到熟悉歌曲，你会？', 'attention', ['跟着歌词听，工作节奏中断', '调低音量继续当前句子', '切换无歌词音频并从已标记节点继续']),
  createSeedQuestion('focus-lab', 37, '取物柜密码包含字母和数字，你会？', 'memory', ['只记字符的大致样子', '分成字母组和数字组', '用发音和分组顺序编码，输入前整体复述']),
  createSeedQuestion('focus-lab', 38, '接一个速度很快的传球时，你会？', 'speed', ['球到眼前才伸手', '盯住球并提前抬手', '观察传球者姿势，预判轨迹并调整身体位置']),
  createSeedQuestion('focus-lab', 39, '对话中对方突然提到一个关键条件，你会？', 'attention', ['继续想自己下一句要说什么', '停下来确认这个条件的含义', '复述条件并调整后续问题，避免按旧假设继续']),
  createSeedQuestion('focus-lab', 40, '返程时要按相反顺序走回原路线，你会？', 'memory', ['凭熟悉感随意选择路口', '回忆来时经过的醒目标志', '把来时节点倒序排列，并逐个确认方向变化'])
]

const socialSignalSupplementalSeeds = [
  createSeedQuestion('social-signal', 9, '朋友聚会中有人几次想说话都被打断，你会？', 'empathy', ['继续当前话题不特别处理', '停一下问他刚才想说什么', '自然把话题交给他，并留意他是否愿意继续']),
  createSeedQuestion('social-signal', 10, '同事周末再次发来非紧急工作请求，你会？', 'boundary', ['马上处理，免得显得不配合', '说明周一上班后回复', '明确非紧急事项的响应时间，并关闭工作提醒']),
  createSeedQuestion('social-signal', 11, '你要向室友说明公共区域卫生问题，会？', 'expression', ['忍着不说，等对方发现', '直接说最近卫生需要改善', '描述具体情况、影响和可共同执行的安排']),
  createSeedQuestion('social-signal', 12, '新成员在会议后独自收拾资料，你会？', 'empathy', ['认为他只是动作比较慢', '过去问是否需要搭把手', '先陪他整理，并询问今天是否有不清楚的流程']),
  createSeedQuestion('social-signal', 13, '家人未经同意翻看你的抽屉，你会？', 'boundary', ['怕争执，假装不知道', '告诉家人希望先征得同意', '说明隐私边界，并约定哪些物品绝不能自行查看']),
  createSeedQuestion('social-signal', 14, '讨论中你需要承认自己理解错了，会？', 'expression', ['沉默并把话题带开', '说一句“刚才我弄错了”', '具体说明误解点、修正结论并感谢对方提醒']),
  createSeedQuestion('social-signal', 15, '朋友讲好消息时语气却显得犹豫，你会？', 'empathy', ['只热烈祝贺，不提犹豫', '问他是不是还有顾虑', '先分享喜悦，再邀请他谈谈好消息背后的复杂感受']),
  createSeedQuestion('social-signal', 16, '群友不断私聊倾诉到深夜，你已经很累，会？', 'boundary', ['继续陪聊直到对方结束', '说自己要休息，明天再聊', '关心他的安全后说明可聊时段，并建议联系更合适的支持']),
  createSeedQuestion('social-signal', 17, '你想邀请一位不熟的同事参加午餐，会？', 'expression', ['等他自己加入', '简单问一句要不要一起', '说明时间地点，也明确对方可以轻松拒绝']),
  createSeedQuestion('social-signal', 18, '同伴展示作品后一直寻找你的反应，你会？', 'empathy', ['笼统说“挺好的”', '指出一个你真心喜欢的细节', '先回应他的期待，再给出具体欣赏和他愿意听的建议']),
  createSeedQuestion('social-signal', 19, '别人替你决定了周末安排，你会？', 'boundary', ['不喜欢也跟着参加', '提出自己想调整时间', '说明决定需要共同讨论，并给出你可接受的选项']),
  createSeedQuestion('social-signal', 20, '汇报时有人提出你没准备的问题，你会？', 'expression', ['绕开问题继续讲稿', '承认暂时没有完整答案', '复述问题、说明已知范围并承诺具体补充时间']),
  createSeedQuestion('social-signal', 21, '同事在午休时明显独自掉眼泪，你会？', 'empathy', ['装作没看见避免尴尬', '递纸巾并问是否需要陪伴', '保护他的隐私，轻声提供陪伴、空间或实际帮助的选择']),
  createSeedQuestion('social-signal', 22, '熟人要求借用你很珍惜的物品，你不放心，会？', 'boundary', ['勉强借出并一直担心', '说这件物品暂时不外借', '清楚拒绝借出，同时提供风险更小的替代办法']),
  createSeedQuestion('social-signal', 23, '你需要告诉客户项目会延期，会？', 'expression', ['等客户来问再解释', '直接告知新的日期', '提前说明原因、影响、新时间和正在采取的补救措施']),
  createSeedQuestion('social-signal', 24, '朋友反复说“随便”但看起来并不满意，你会？', 'empathy', ['就按自己的选择决定', '给出两个选项让他再选', '指出你感到他有顾虑，并询问真正不希望发生什么']),
  createSeedQuestion('social-signal', 25, '同事把你的功劳说成团队共同成果但没提你，会？', 'boundary', ['为了和气完全不说', '私下提醒他补充你的贡献', '在合适场合客观说明分工，并约定以后如何署名']),
  createSeedQuestion('social-signal', 26, '你想在会议中反对多数人的意见，会？', 'expression', ['只在会后向熟人抱怨', '提出自己看到的一项风险', '先确认共同目标，再用证据说明风险和可验证替代方案']),
  createSeedQuestion('social-signal', 27, '朋友取消约会后只说“最近有点乱”，你会？', 'empathy', ['认为他不重视你而冷淡回应', '表示理解并问何时方便', '接受取消，关心他的状态，同时不要求立即解释']),
  createSeedQuestion('social-signal', 28, '亲戚在聚会上评论你的外貌，你不喜欢，会？', 'boundary', ['笑着附和避免扫兴', '说自己不想聊外貌', '平静终止评论，并把边界扩展到以后类似场合']),
  createSeedQuestion('social-signal', 29, '你要向队友表达感谢，会？', 'expression', ['只发一个点赞表情', '说“谢谢你帮忙”', '指出他做的具体事情及其对结果和你的帮助']),
  createSeedQuestion('social-signal', 30, '团队里最安静的人提交了详细意见，你会？', 'empathy', ['只看结论，不特别回应', '感谢他整理这些内容', '在讨论中准确引用他的观点，并邀请他补充想法']),
  createSeedQuestion('social-signal', 31, '朋友临时想住进你家几周，你没有条件，会？', 'boundary', ['先答应几天再想办法', '直接说明无法提供住宿', '明确拒绝入住，并在能力范围内帮助查询其他选择']),
  createSeedQuestion('social-signal', 32, '线上文字容易产生误会时，你会？', 'expression', ['继续发送更长的文字解释', '改用一句简短澄清', '先确认争议点，再提议语音沟通并总结共识']),
  createSeedQuestion('social-signal', 33, '孩子因为比赛落后而发脾气，你会？', 'empathy', ['告诉他输赢很正常别哭', '先说你知道他很失望', '接住失望后，等情绪下降再一起回顾过程']),
  createSeedQuestion('social-signal', 34, '合作方不断增加原约定之外的需求，你会？', 'boundary', ['都先做了再谈费用', '提醒这些需求不在原范围', '列出新增工作、成本和取舍，确认变更后再开始']),
  createSeedQuestion('social-signal', 35, '你需要为自己的失误道歉，会？', 'expression', ['只说“抱歉让你不开心”', '承认自己做错了具体事情', '承担影响、说明补救行动，并避免要求对方马上原谅']),
  createSeedQuestion('social-signal', 36, '老人反复讲同一段经历，你会？', 'empathy', ['打断说已经听过了', '耐心听一会儿再换话题', '回应故事对他的意义，并用新问题了解未听过的细节']),
  createSeedQuestion('social-signal', 37, '社交平台有人持续追问你的定位，你会？', 'boundary', ['发一个大概位置应付', '说自己不分享实时位置', '拒绝提供，并检查隐私设置和后续联系边界']),
  createSeedQuestion('social-signal', 38, '你想结束一段已经超时的谈话，会？', 'expression', ['不断看时间等对方察觉', '说自己接下来还有安排', '礼貌总结当前话题，明确结束时间并约定是否续聊']),
  createSeedQuestion('social-signal', 39, '同事收到批评后一直沉默，你会？', 'empathy', ['马上分析他哪里做错了', '会后问他现在感觉如何', '先确认他想独处还是交流，再提供具体可选择的支持']),
  createSeedQuestion('social-signal', 40, '朋友把你的拒绝理解成不在乎他，你会？', 'boundary', ['撤回拒绝来证明重视', '重申自己确实做不到', '肯定关系的重要，同时坚持限制并讨论其他连接方式'])
]

const resilienceMapSupplementalSeeds = [
  createSeedQuestion('resilience-map', 9, '一次考试成绩低于预期后，你会？', 'recovery', ['不断比较别人分数并责怪自己', '休息一下再看错题', '先稳定情绪，再分类错因并安排可执行复习']),
  createSeedQuestion('resilience-map', 10, '期待的合作没有获得回应，你会怎么想？', 'optimism', ['默认对方否定了你的能力', '认为也许只是时机不合适', '保留积极解释，同时设定跟进时间和其他机会']),
  createSeedQuestion('resilience-map', 11, '搬到新城市后生活节奏完全不同，你会？', 'adaptation', ['尽量照搬原来的所有习惯', '先建立通勤和饮食基本规律', '主动探索资源，逐周调整社交、作息和路线']),
  createSeedQuestion('resilience-map', 12, '完成高压交付后的第一个晚上，你会？', 'recovery', ['继续刷工作消息保持警觉', '早点休息并暂停工作通知', '安排低刺激活动、充足睡眠和次日轻量计划']),
  createSeedQuestion('resilience-map', 13, '求职被拒后收到一条具体反馈，你会？', 'optimism', ['只记住被拒这件事', '觉得反馈也许能帮助下次', '提炼可改变部分并寻找下一次验证机会']),
  createSeedQuestion('resilience-map', 14, '团队临时减少一半预算，你会？', 'adaptation', ['坚持原方案直到被迫停止', '删掉部分非核心功能', '重新定义最小目标，按价值重排资源和里程碑']),
  createSeedQuestion('resilience-map', 15, '生病恢复后体力暂时不如从前，你会？', 'recovery', ['马上恢复原强度证明自己没事', '降低活动量，慢慢找回状态', '按身体反馈分级恢复，并预留休息和复诊判断']),
  createSeedQuestion('resilience-map', 16, '长期学习进入看不到进步的平台期，你会？', 'optimism', ['认定自己已经到极限', '提醒自己平台期很常见', '调整衡量方式，用小测和作品寻找细微进展']),
  createSeedQuestion('resilience-map', 17, '常用软件突然更换操作界面，你会？', 'adaptation', ['抱怨后继续寻找旧按钮', '先学会最常用的三项操作', '查看更新说明并重建自己的快捷工作流']),
  createSeedQuestion('resilience-map', 18, '经历一次尴尬社交场面后，你会？', 'recovery', ['反复想象别人如何评价你', '告诉自己多数人很快会忘记', '区分事实和猜测，提取一个改进点后停止复盘']),
  createSeedQuestion('resilience-map', 19, '朋友创业受挫也让你怀疑自己的计划，你会？', 'optimism', ['认为相似计划都注定失败', '参考他的经验但不直接套用', '分析条件差异，更新风险清单并保留可行假设']),
  createSeedQuestion('resilience-map', 20, '原定户外活动遇到大雨，你会？', 'adaptation', ['取消后整天闷闷不乐', '临时改成附近室内活动', '根据同行需求准备室内方案并保留改期选项']),
  createSeedQuestion('resilience-map', 21, '连续收到几条负面反馈后，你会？', 'recovery', ['一次性反驳所有反馈', '暂停阅读，等平静后分类', '先照顾情绪，再区分重复信号、偏好和事实问题']),
  createSeedQuestion('resilience-map', 22, '一个重要目标进度只有计划的一半，你会？', 'optimism', ['觉得已经不可能完成', '重新估算剩余时间', '承认差距，缩小范围并找到仍能实现的关键成果']),
  createSeedQuestion('resilience-map', 23, '孩子入学让家庭作息大幅改变，你会？', 'adaptation', ['要求所有人继续原有安排', '先调整早晨最忙的环节', '全家试行新作息一周，再按真实冲突共同修改']),
  createSeedQuestion('resilience-map', 24, '一次激烈运动后肌肉持续酸痛，你会？', 'recovery', ['第二天继续同样强度训练', '休息并做轻量拉伸', '观察疼痛类型，安排恢复并在异常时寻求专业意见']),
  createSeedQuestion('resilience-map', 25, '投稿多次没有通过，你会？', 'optimism', ['把拒稿等同于作品没有价值', '换一个平台再试一次', '汇总反馈、针对性修改并扩大合适投稿渠道']),
  createSeedQuestion('resilience-map', 26, '供应商突然无法按期交货，你会？', 'adaptation', ['等待对方恢复，暂不改计划', '联系一个备用供应商', '评估库存和影响，组合替代来源并同步调整承诺']),
  createSeedQuestion('resilience-map', 27, '与亲近的人争执后第二天仍心情低落，你会？', 'recovery', ['用忙碌压住情绪不处理', '找可信的人聊聊经过', '通过书写和身体活动降温，再准备不指责的沟通']),
  createSeedQuestion('resilience-map', 28, '行业消息让你担心当前技能会过时，你会？', 'optimism', ['认为多年积累都没用了', '开始了解一个相关新工具', '盘点可迁移能力，设计小项目验证新的学习方向']),
  createSeedQuestion('resilience-map', 29, '旅行中预订的住宿临时取消，你会？', 'adaptation', ['一直和平台争论不找替代', '先预订附近可用房间', '同时处理退款、筛选安全替代并调整后续交通']),
  createSeedQuestion('resilience-map', 30, '忙完一段时间后睡眠依然很浅，你会？', 'recovery', ['继续熬夜等自然恢复', '固定上床时间并少看屏幕', '记录影响因素，系统调整作息并在持续时寻求帮助']),
  createSeedQuestion('resilience-map', 31, '团队的第一次公开演示效果一般，你会？', 'optimism', ['避免再做公开演示', '认为至少发现了问题', '收集观众行为和反馈，把下一次改进拆成可测目标']),
  createSeedQuestion('resilience-map', 32, '照顾家人的计划突然延长一个月，你会？', 'adaptation', ['独自维持原安排直到耗尽', '临时减少自己的部分事务', '重新协调分工、资源和个人恢复时间，定期复盘']),
  createSeedQuestion('resilience-map', 33, '关键文件误删但有部分备份时，你会？', 'recovery', ['持续责怪自己无法行动', '先恢复能找到的备份', '稳定下来，停止覆盖磁盘并按优先级执行恢复方案']),
  createSeedQuestion('resilience-map', 34, '比赛开局连续失误，你会？', 'optimism', ['觉得今天状态注定很差', '把注意放回下一次动作', '用固定重置动作清空失误，并聚焦可控策略']),
  createSeedQuestion('resilience-map', 35, '岗位职责加入你不熟悉的客户沟通，你会？', 'adaptation', ['尽量把沟通都转给别人', '先旁听几次熟悉流程', '学习框架、模拟练习并逐步承担真实对话']),
  createSeedQuestion('resilience-map', 36, '一周计划被突发事务打乱一半，你会？', 'recovery', ['通宵把原计划全部补回', '删掉不重要任务并休息', '重排优先级，保留恢复时间并接受部分延期']),
  createSeedQuestion('resilience-map', 37, '新习惯中断三天后，你会？', 'optimism', ['认为连续记录已经毁了', '从今天重新开始', '分析中断触发点，把恢复动作缩小并预设下次应对']),
  createSeedQuestion('resilience-map', 38, '团队成员突然离职留下许多未交接事项，你会？', 'adaptation', ['按原分工等待新人补位', '先接手最紧急的任务', '盘点风险和知识缺口，重新分配并建立临时文档']),
  createSeedQuestion('resilience-map', 39, '完成一次情绪消耗很大的沟通后，你会？', 'recovery', ['立刻投入下一场高强度任务', '独处一会儿让自己平静', '安排缓冲、补充水和食物，再记录需要后续处理的事项']),
  createSeedQuestion('resilience-map', 40, '学习新技能的第一个作品很粗糙，你会？', 'optimism', ['把作品藏起来并停止练习', '保留作品作为起点', '对比具体目标找一个差距，用下一件作品验证改进'])
]

const attachmentWeatherSupplementalSeeds = [
  createSeedQuestion('attachment-weather', 9, '伴侣与朋友外出而你不认识同行的人，你会？', 'security', ['不断询问行程和同行者', '祝他玩得开心，按约定联系', '信任既有关系，并在自己确有需要时清晰表达']),
  createSeedQuestion('attachment-weather', 10, '两人忙碌一周后终于有空见面，你会？', 'closeness', ['默认待在一起就够了', '问问彼此最想怎么度过', '先分享这一周的状态，再共同选择有连接感的活动']),
  createSeedQuestion('attachment-weather', 11, '伴侣想独自旅行几天，你会？', 'independence', ['把独自旅行理解为想远离你', '讨论安全和联络安排后支持', '尊重他的个人体验，也规划自己的充实时间']),
  createSeedQuestion('attachment-weather', 12, '对方点赞了前任的动态，你会？', 'security', ['立刻检查更多记录并质问', '先观察自己的不安再询问', '不凭单一行为下结论，用坦诚对话确认双方边界']),
  createSeedQuestion('attachment-weather', 13, '你们一起吃饭时对方显得心不在焉，你会？', 'closeness', ['故意冷淡让他注意到', '问他是不是遇到什么事', '描述你感到的距离，并邀请他选择现在聊或稍后聊']),
  createSeedQuestion('attachment-weather', 14, '双方对居家布置喜好完全不同，你会？', 'independence', ['放弃自己的喜好避免争论', '各自保留一个喜欢的区域', '寻找共享原则，同时为双方留下能自主决定的空间']),
  createSeedQuestion('attachment-weather', 15, '对方临时改变见面计划，你会？', 'security', ['认为自己总被排在最后', '确认原因并重新约时间', '表达失望但不推断关系价值，同时讨论临时变更规则']),
  createSeedQuestion('attachment-weather', 16, '伴侣完成一件很有成就感的事，你会？', 'closeness', ['只说一句“不错”', '认真听他讲过程并庆祝', '询问最自豪的细节，用他喜欢的方式共同纪念']),
  createSeedQuestion('attachment-weather', 17, '你想报名一门对方没兴趣的长期课程，会？', 'independence', ['因为不能一起参加而放弃', '自己报名并提前协调时间', '支持彼此独立成长，同时安排稳定的共同时间']),
  createSeedQuestion('attachment-weather', 18, '争执中对方说需要暂停半小时，你会？', 'security', ['追着要求马上说清楚', '同意暂停并等待他回来', '约定恢复沟通的具体时间，让暂停不等同于离开']),
  createSeedQuestion('attachment-weather', 19, '对方主动分享童年里一段难过经历，你会？', 'closeness', ['急着分析家人谁对谁错', '安静听完并感谢他的信任', '跟随他的节奏回应感受，不追问他不想展开的细节']),
  createSeedQuestion('attachment-weather', 20, '你们收入差距较大，各自消费习惯不同，会？', 'independence', ['所有支出都按一方习惯决定', '保留个人账户并讨论共同支出', '明确共享责任、个人自由额度和重大决定流程']),
  createSeedQuestion('attachment-weather', 21, '对方一天里语气比平时简短，你会？', 'security', ['马上猜测他对关系不满', '问他今天是不是很累', '先核对情境，不把短暂状态等同于关系变化']),
  createSeedQuestion('attachment-weather', 22, '你希望增加两人的拥抱和身体接触，会？', 'closeness', ['等对方主动发现需要', '直接说自己想多一点拥抱', '表达偏好并询问对方舒适的方式、频率和边界']),
  createSeedQuestion('attachment-weather', 23, '伴侣和你对节假日回谁家意见不同，会？', 'independence', ['固定按一方家庭要求安排', '今年一家、明年另一家', '讨论双方价值和限制，设计可轮换且允许单独行动的方案']),
  createSeedQuestion('attachment-weather', 24, '你无意中说错话让对方受伤，会？', 'security', ['害怕关系变坏而过度保证', '承认影响并认真道歉', '承担错误、倾听感受，用后续行动恢复可靠感']),
  createSeedQuestion('attachment-weather', 25, '两人每天都很忙但想保持联系，你会？', 'closeness', ['不停发消息确认对方在线', '固定睡前聊十分钟', '共同设计低负担仪式，并允许忙时坦诚调整']),
  createSeedQuestion('attachment-weather', 26, '对方想保留一项只和朋友进行的爱好，会？', 'independence', ['要求自己也加入才安心', '支持他维持朋友活动', '尊重独立社交，也共同确认关系时间不被长期挤压']),
  createSeedQuestion('attachment-weather', 27, '伴侣忘记了一个对你重要的小纪念日，你会？', 'security', ['认定他根本不在乎', '告诉他这件事让你失落', '表达纪念日的意义，听取原因并共同设置未来提醒']),
  createSeedQuestion('attachment-weather', 28, '对方回家后主动想讲一天的经历，你会？', 'closeness', ['一边刷手机一边听', '放下手机听他讲重点', '用追问和回应参与，同时分享你当天的真实状态']),
  createSeedQuestion('attachment-weather', 29, '你获得外地发展的机会，对方暂时不能同行，会？', 'independence', ['直接放弃避免远距离', '讨论短期异地是否可行', '分别评估成长和关系需要，制定期限、联络与复盘节点']),
  createSeedQuestion('attachment-weather', 30, '对方和你在公开场合互动较少，你会？', 'security', ['用更亲密动作测试他反应', '私下询问他在公开场合的习惯', '说明你的感受，区分表达风格与关系承诺']),
  createSeedQuestion('attachment-weather', 31, '一起散步时出现长时间沉默，你会？', 'closeness', ['不停找话题填满安静', '享受沉默，偶尔分享观察', '感受彼此是否舒适，让安静和交流都能自然发生']),
  createSeedQuestion('attachment-weather', 32, '伴侣对你的职业选择有不同看法，会？', 'independence', ['按他的意见改变决定', '听取意见后自己权衡', '理解他的担心，同时保留最终决定权并承担结果']),
  createSeedQuestion('attachment-weather', 33, '对方生气时没有像平常一样说晚安，你会？', 'security', ['整夜发消息要求回应', '发一条关心后给彼此空间', '表达愿意修复并约定次日沟通，不用沉默推断结局']),
  createSeedQuestion('attachment-weather', 34, '你想和对方建立更深的共同回忆，会？', 'closeness', ['等特别节日自然发生', '一起安排一次短途活动', '从双方重视的体验出发，持续记录和回顾共同经历']),
  createSeedQuestion('attachment-weather', 35, '双方想看的电影不同，你会？', 'independence', ['总选对方喜欢的避免失望', '轮流选择电影', '允许偶尔分开观看，也保留双方都期待的共同片单']),
  createSeedQuestion('attachment-weather', 36, '对方需要和异性同事频繁合作，你会？', 'security', ['要求查看所有聊天记录', '了解工作情况并表达不安', '基于信任讨论可接受边界，不用监控替代安全感']),
  createSeedQuestion('attachment-weather', 37, '伴侣身体不舒服却说想一个人休息，你会？', 'closeness', ['坚持留下照顾才安心', '准备好需要的东西后离开', '尊重空间，确认紧急联系和他愿意接受的具体支持']),
  createSeedQuestion('attachment-weather', 38, '你们对是否共享手机密码看法不同，会？', 'independence', ['把共享密码当成忠诚证明', '各自保留密码但不隐瞒重要事', '讨论隐私、便利和安全需求，形成双方自愿的规则']),
  createSeedQuestion('attachment-weather', 39, '对方夸奖一位你不熟悉的人，你会？', 'security', ['立刻拿自己和对方比较', '接受这只是一次欣赏', '觉察嫉妒但不指责，必要时表达真实需要']),
  createSeedQuestion('attachment-weather', 40, '两人想要的相处频率暂时不同，会？', 'closeness', ['要求对方完全按你的频率', '各退一步找中间值', '说清连接需求和精力限制，试行安排后共同调整'])
]

const spendingStyleSupplementalSeeds = [
  createSeedQuestion('spending-style', 9, '准备更换使用多年的手机时，你会？', 'planning', ['看到新款发布就分期购买', '先确认旧手机是否影响日常使用', '设定更换条件、预算上限和购买时间']),
  createSeedQuestion('spending-style', 10, '便利店结账时看到第二件半价零食，你会？', 'impulse', ['觉得划算就顺手拿两件', '想想这周是否真能吃完', '比较原需求、总支出和浪费可能后再决定']),
  createSeedQuestion('spending-style', 11, '选择一把每天使用的办公椅，你会？', 'value', ['买外观最流行的一款', '比较坐感和保修期', '综合使用时长、人体适配、耐用度和售后']),
  createSeedQuestion('spending-style', 12, '年底有多笔固定支出即将到期，你会？', 'planning', ['到期后逐笔想办法付款', '提前列出金额和日期', '按现金流排序，预留缓冲并设置自动提醒']),
  createSeedQuestion('spending-style', 13, '短视频推荐一款“全网断货”的小家电，你会？', 'impulse', ['马上搜索最低价下单', '先看自己是否已有类似功能', '退出推荐页面，查长期评价并等待真实需求出现']),
  createSeedQuestion('spending-style', 14, '同一航班有廉价不可退票和较贵可退票，你会？', 'value', ['只选标价最低的', '看行程变化可能再选择', '计算变更概率、退改成本和时间弹性后的期望成本']),
  createSeedQuestion('spending-style', 15, '计划装修房间但预算有限，你会？', 'planning', ['边逛边买喜欢的东西', '先完成最需要的基础部分', '列出功能优先级、阶段预算和不可超支项目']),
  createSeedQuestion('spending-style', 16, '游戏平台推出随机奖励礼包，你会？', 'impulse', ['先买几次试试运气', '只使用事先留出的娱乐额度', '查看概率和总成本，确认体验价值后限定次数']),
  createSeedQuestion('spending-style', 17, '要买一件很少使用但关键时刻需要的工具，你会？', 'value', ['直接买功能最多的高配版', '买满足基本需求的型号', '比较租借、二手和购买的频率成本与可靠性']),
  createSeedQuestion('spending-style', 18, '每月收入日期不固定，你会怎样安排账单？', 'planning', ['收到钱后先消费，账单到期再说', '保留一部分覆盖固定账单', '按最低收入建立缓冲账户并错开可调整付款日']),
  createSeedQuestion('spending-style', 19, '逛商场时导购持续强调“今天最后一天”，你会？', 'impulse', ['怕优惠消失而马上付款', '离开店铺再想十分钟', '记录型号和价格，按原购物清单及历史价独立判断']),
  createSeedQuestion('spending-style', 20, '选择通勤月卡还是按次付费，你会？', 'value', ['看到月卡有折扣就买', '按上月通勤次数估算', '结合未来行程、有效期和替代交通计算临界次数']),
  createSeedQuestion('spending-style', 21, '朋友婚礼需要准备礼金和出行费用，你会？', 'planning', ['临近婚礼再从当月开销里挤', '提前一个月减少娱乐支出', '确认总成本，分期预留并保持基本储蓄目标']),
  createSeedQuestion('spending-style', 22, '外卖应用推送满减券快过期，你会？', 'impulse', ['为了用券点一顿原本不需要的餐', '有正常用餐需求才打开应用', '比较自炊和凑单总价，不让券改变需求本身']),
  createSeedQuestion('spending-style', 23, '两款充电器一款便宜、一款有安全认证，你会？', 'value', ['选最便宜且销量高的', '选择有明确认证和保修的', '把设备价值、安全风险、功率适配和寿命一起评估']),
  createSeedQuestion('spending-style', 24, '准备一次长途旅行时，你会如何控制预算？', 'planning', ['先订喜欢的项目再算总额', '给交通住宿设大致上限', '分配必要、体验和应急三类额度并每日记录']),
  createSeedQuestion('spending-style', 25, '收藏商品突然提示库存只剩一件，你会？', 'impulse', ['立刻付款锁定库存', '确认库存提示是否可信', '回看收藏时长和购买理由，允许真正错过不需要的商品']),
  createSeedQuestion('spending-style', 26, '购买线上课程时，你会如何判断是否值得？', 'value', ['看原价很高就觉得优惠大', '查看课程目录和老师试听', '评估学习目标、完成时间、替代资源和真实学员成果']),
  createSeedQuestion('spending-style', 27, '家电可能半年后需要维修，你会？', 'planning', ['坏了再临时刷卡解决', '每月留一点维修预算', '按家电年龄建立维护清单和家庭应急资金']),
  createSeedQuestion('spending-style', 28, '线下活动不断售卖限定纪念品，你会？', 'impulse', ['每种都买一点留下记忆', '挑一件最喜欢的', '先拍照记录，离场前只买符合预算且会长期保留的']),
  createSeedQuestion('spending-style', 29, '品牌会员费能换取折扣和积分，你会？', 'value', ['只看赠品价值就加入', '算一算过去一年消费额', '比较实际使用频率、锁定消费效应和不续费成本']),
  createSeedQuestion('spending-style', 30, '计划给家人买节日礼物，你会？', 'planning', ['到节日前一天集中购买', '提前列出人选和大致预算', '按关系与需求准备清单、总额和备用选择']),
  createSeedQuestion('spending-style', 31, '手机游戏提示连续充值可获得额外奖励，你会？', 'impulse', ['为了拿满奖励继续充值', '达到娱乐预算就停止', '忽略沉没投入，按单次娱乐价值决定是否继续']),
  createSeedQuestion('spending-style', 32, '买二手相机时你最关注什么？', 'value', ['只挑价格最低的卖家', '查看外观和快门次数', '核验功能、维修史、交易保障和未来转售价值']),
  createSeedQuestion('spending-style', 33, '一笔年度保险费用即将扣款，你会？', 'planning', ['余额不足时再临时转钱', '提前确认账户余额', '复核保障需求、扣款日期并在月度预算中摊分']),
  createSeedQuestion('spending-style', 34, '朋友都在购买一款热门潮鞋，你会？', 'impulse', ['担心落伍也跟着购买', '试穿后再看是否喜欢', '区分社交压力和个人需求，等待热度过去再判断']),
  createSeedQuestion('spending-style', 35, '打印机便宜但耗材昂贵时，你会？', 'value', ['只比较机器售价', '同时查看墨盒价格', '按预计打印量计算多年总成本、维护和替代方案']),
  createSeedQuestion('spending-style', 36, '你想为兴趣爱好升级整套装备，会？', 'planning', ['一次买齐大神推荐清单', '先升级最影响体验的一件', '设阶段目标，旧装备达到限制后再逐项升级']),
  createSeedQuestion('spending-style', 37, '深夜情绪低落时很想购物，你会？', 'impulse', ['买点东西让自己马上开心', '把商品加入收藏不付款', '离开购物应用，用其他方式照顾情绪并次日复核']),
  createSeedQuestion('spending-style', 38, '选择维修旧电脑还是购买新电脑，你会？', 'value', ['看到新机促销就直接换', '比较一次维修费和新机价', '评估性能需求、剩余寿命、维修风险和数据迁移成本']),
  createSeedQuestion('spending-style', 39, '家庭准备购置一件大件时，你会？', 'planning', ['谁先喜欢就先付款', '共同商量可接受价格', '确认需求、资金来源、维护成本和对其他目标的影响']),
  createSeedQuestion('spending-style', 40, '免费试用即将自动续费，你会？', 'impulse', ['等扣款后再决定是否取消', '收到提醒就检查使用情况', '试用开始即设提醒，续费前按实际使用价值主动选择'])
]

const careerValuesSupplementalSeeds = [
  createSeedQuestion('career-values', 9, '公司提供内部轮岗机会，你会关注？', 'growth', ['哪个岗位最容易快速上手', '哪个岗位能补充一项新能力', '轮岗的学习曲线、导师支持和未来迁移价值']),
  createSeedQuestion('career-values', 10, '远程工作允许自行安排一天节奏，你会？', 'autonomy', ['等待主管逐小时安排', '自己列出当天优先事项', '根据精力设计深度工作、协作和复盘节奏']),
  createSeedQuestion('career-values', 11, '你负责的后台优化用户看不见，会？', 'impact', ['因为不显眼而降低优先级', '确认能减少同事重复劳动后推进', '定义效率指标并让改进持续服务更多使用者']),
  createSeedQuestion('career-values', 12, '年度学习预算只能选一项，你会？', 'growth', ['选最轻松能拿证的课程', '选择当前工作最常用的技能', '结合长期方向、实践机会和反馈质量做选择']),
  createSeedQuestion('career-values', 13, '主管外出一周且没有详细指令，你会？', 'autonomy', ['暂停重要决定等他回来', '按既有目标继续推进', '明确决策边界、记录假设并处理可逆事项']),
  createSeedQuestion('career-values', 14, '项目可以提升短期数据但会增加用户步骤，你会？', 'impact', ['只要数据好看就上线', '提出用户体验风险', '同时衡量短期指标和长期用户成本，推动替代方案']),
  createSeedQuestion('career-values', 15, '你被邀请指导一名新人时，会怎么看？', 'growth', ['觉得会占用自己工作时间', '把它当作复习基础知识', '借教学检验理解，并练习反馈和带领能力']),
  createSeedQuestion('career-values', 16, '团队允许选择自己的工作工具，你会？', 'autonomy', ['继续用默认工具避免选择', '挑熟悉工具并遵守交付格式', '根据任务选择工具，同时确保协作、数据和交接兼容']),
  createSeedQuestion('career-values', 17, '客户需求与公司内部习惯冲突时，你会？', 'impact', ['优先让内部流程最省事', '向团队解释客户真实困难', '追踪受影响用户，推动流程在成本可控下真正解决问题']),
  createSeedQuestion('career-values', 18, '你连续几个月都在做同类任务，会？', 'growth', ['因为熟练而保持不变', '主动申请稍复杂的任务', '提出自动化旧任务并腾出时间承担新挑战']),
  createSeedQuestion('career-values', 19, '你有空间自行确定方案技术路线，会？', 'autonomy', ['复制上一项目的选择', '比较两种常见方案', '定义约束和评估标准，验证关键风险后独立决策']),
  createSeedQuestion('career-values', 20, '一次流程改进能每人每天节省十分钟，你会？', 'impact', ['因为单次收益小而不做', '计算团队累计节省时间', '验证真实使用并推动标准化，让小收益长期累积']),
  createSeedQuestion('career-values', 21, '行业会议有多个平行主题，你会选？', 'growth', ['选择最熟悉、最容易听懂的', '选择当前项目直接相关的', '组合前沿方向、能力短板和可带回实践的内容']),
  createSeedQuestion('career-values', 22, '同事希望你严格照他的方式完成共同任务，你会？', 'autonomy', ['完全照做避免分歧', '说明自己更高效的步骤', '对齐接口和质量标准，保留各自执行方法']),
  createSeedQuestion('career-values', 23, '产品服务的人群很小但需求迫切，你会？', 'impact', ['因用户少而不值得投入', '评估能否低成本满足', '结合问题严重度、覆盖公平和资源设计可持续方案']),
  createSeedQuestion('career-values', 24, '一次失败项目结束后，你最想保留什么？', 'growth', ['尽快忘掉避免影响信心', '记录几个明显教训', '沉淀决策依据、验证结果和可复用的能力资产']),
  createSeedQuestion('career-values', 25, '你可以自己决定是否参加多数会议，会？', 'autonomy', ['全部参加避免漏消息', '只参加与自己直接相关的', '根据决策需要、贡献价值和异步替代主动取舍']),
  createSeedQuestion('career-values', 26, '团队必须在速度和可访问性之间选择，你会？', 'impact', ['优先速度，因为多数用户不受影响', '提出最低可访问性标准', '让受影响者参与验证，在时间约束内保护关键使用权']),
  createSeedQuestion('career-values', 27, '公司给你一次承担陌生职责的机会，会？', 'growth', ['担心表现不好而拒绝', '先了解职责再决定', '确认支持和学习空间，接受有边界的成长挑战']),
  createSeedQuestion('career-values', 28, '你发现既定季度目标已不再合理，会？', 'autonomy', ['继续执行等待上级调整', '向主管提出修改建议', '用新证据说明变化，提出替代目标和承担的决策责任']),
  createSeedQuestion('career-values', 29, '你完成的分析可能改变资源分配，会？', 'impact', ['只按要求交付数据表', '突出最明显的结论', '检查受影响群体和不确定性，帮助决策者理解真实后果']),
  createSeedQuestion('career-values', 30, '选择导师时你更看重什么？', 'growth', ['职位最高、名气最大', '愿意定期回答问题', '能提供高质量反馈、示范思考并允许你独立尝试']),
  createSeedQuestion('career-values', 31, '团队采用结果导向而非固定工时，你会？', 'autonomy', ['仍等待每日任务清单', '自己安排时间按期交付', '主动定义成果、透明进展并为工作方式负责']),
  createSeedQuestion('career-values', 32, '项目结束后如何判断它是否值得？', 'impact', ['只看是否按时上线', '看核心指标是否改善', '结合用户变化、长期副作用和投入成本评估']),
  createSeedQuestion('career-values', 33, '你有机会参加跨专业项目，会？', 'growth', ['因为不熟悉而留在原领域', '承担自己熟悉的部分并旁听', '主动学习共同语言，选择能扩展边界的具体责任']),
  createSeedQuestion('career-values', 34, '工作中出现一段无人明确负责的空白，会？', 'autonomy', ['等管理者发现并分配', '先把紧急部分补上', '判断价值和权限，主动建立临时责任与退出条件']),
  createSeedQuestion('career-values', 35, '你可以优化一个只有内部员工使用的系统，会？', 'impact', ['外部看不到所以不优先', '解决投诉最多的问题', '观察真实工作流，用节省时间和错误率验证影响']),
  createSeedQuestion('career-values', 36, '收到一份超出当前能力的任务，会？', 'growth', ['只做自己确定能完成的部分', '查资料并请同事给建议', '拆出学习风险，安排练习、反馈和阶段性交付']),
  createSeedQuestion('career-values', 37, '审批流程允许你在小额范围内直接决定，会？', 'autonomy', ['仍把所有决定上报', '按规则处理常见情况', '理解原则后自主判断，并记录例外供团队校准']),
  createSeedQuestion('career-values', 38, '一项工作能帮助团队避免未来错误但眼下不紧急，会？', 'impact', ['一直推后给紧急任务让路', '在空闲时补一份说明', '量化重复风险，争取固定时间建立预防机制']),
  createSeedQuestion('career-values', 39, '你要制定下一季度个人目标，会？', 'growth', ['沿用上一季度的任务数量', '增加一个新技能目标', '把业务挑战、能力提升和可获得反馈连接成目标']),
  createSeedQuestion('career-values', 40, '公司文化鼓励员工提出不同意见，你会？', 'autonomy', ['仍只在私下表达', '有明显问题时公开提出', '基于证据独立发声，也愿意接受共同决策后的责任'])
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
    seedQuestions: [...focusLabSeeds, ...focusLabSupplementalSeeds],
    resultRanges: [
      result('focus-wanderer', 0, 12, '灵感游走者', '你的注意容易被新线索带走。', '你对环境变化敏感，快速切换有优势，但持续任务更需要外部结构。', ['一次只保留一个可见任务', '用短计时和明确锚点练习回到当前']),
      result('focus-balancer', 13, 19, '节奏调度员', '你能在专注和切换之间找平衡。', '多数日常场景里，你会使用简单策略保护记忆与注意。', ['把有效策略固定成习惯', '高压前先减少通知与多任务']),
      result('focus-navigator', 20, 24, '专注导航员', '你善于管理注意资源。', '你倾向先辨认任务线索，再用结构化方法保持反应质量。', ['给大脑安排真正的恢复间隔', '避免把高专注误当成必须时刻紧绷'])
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
    seedQuestions: [...socialSignalSeeds, ...socialSignalSupplementalSeeds],
    resultRanges: [
      result('signal-observer', 0, 12, '谨慎观察者', '你常先确认气氛，再决定靠近。', '你能察觉部分社交线索，但可能为了避免冲突而压低自己的需要。', ['从一句具体感受开始表达', '把拒绝写成清楚而友善的完整句子']),
      result('signal-translator', 13, 19, '信号翻译者', '你会在理解别人和说明自己之间转换。', '你通常能兼顾关系温度与个人边界，并愿意澄清误会。', ['在复杂对话里多确认一次理解', '留意自己是否承担了过多情绪工作']),
      result('signal-connector', 20, 24, '清晰连接者', '你的沟通既有温度也有轮廓。', '你倾向读懂情绪、守住边界，并把真实想法转化成可对话的信息。', ['接受并非所有信号都能读准', '给较慢表达的人留出回应时间'])
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
    seedQuestions: [...resilienceMapSeeds, ...resilienceMapSupplementalSeeds],
    resultRanges: [
      result('resilience-shelter', 0, 12, '缓冲筑巢者', '你需要先获得安全空间再重新出发。', '压力来临时，你可能停留在情绪或旧方法里更久，充分恢复尤其重要。', ['先恢复睡眠和基本节奏', '把下一步缩小到十分钟能完成']),
      result('resilience-traveler', 13, 19, '稳步行路者', '你会边消化变化，边寻找可走的路。', '你能在现实限制下逐渐恢复，并使用小行动维持希望。', ['记录哪些恢复方式真的有效', '为高压时期预留替代方案']),
      result('resilience-cartographer', 20, 24, '韧性绘图师', '你擅长在变化里重新画路线。', '你能结合情绪恢复、现实判断和小实验，把挫折转为新的行动信息。', ['别跳过失落本身的感受', '在独自扛住之前主动调用支持'])
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
    seedQuestions: [...attachmentWeatherSeeds, ...attachmentWeatherSupplementalSeeds],
    resultRanges: [
      result('weather-drizzle', 0, 12, '细雨感应型', '你很在意关系温度的细微变化。', '你渴望稳定连接，也可能在不确定时迅速寻找确认。', ['用具体请求替代反复猜测', '保留让自己安定的个人日程']),
      result('weather-cloudbreak', 13, 19, '云隙平衡型', '你能靠近，也会为彼此留一点空间。', '你通常愿意沟通需要，并尝试在陪伴与独立之间协调。', ['提前约定冲突后的修复方式', '把“没事”换成更准确的感受']),
      result('weather-clear', 20, 24, '晴空共生型', '你的连接感有温度，也有边界。', '你倾向信任关系基础，同时保持个人支持系统和清晰表达。', ['不要只靠理性跳过脆弱', '持续创造轻松而具体的共同体验'])
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
    seedQuestions: [...spendingStyleSeeds, ...spendingStyleSupplementalSeeds],
    resultRanges: [
      result('spending-spark', 0, 12, '即时火花型', '新鲜感很容易推动你的购买决定。', '你能迅速获得体验，但限时刺激和小额叠加可能挤压长期目标。', ['给非必需品设置二十四小时清单', '每周查看一次小额支出总和']),
      result('spending-editor', 13, 19, '预算编辑型', '你会在想要与可用资源之间做取舍。', '你已有基本规划和比较习惯，偶尔仍会被便利或折扣带走。', ['为自由消费设独立额度', '购买前写下一条明确使用场景']),
      result('spending-curator', 20, 24, '价值策展型', '你更愿意为长期使用价值买单。', '你倾向同时考虑预算、机会成本和真实需求，让消费服务于生活重点。', ['避免为了完美比较消耗过多时间', '预算内也保留适度的纯粹快乐'])
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
    seedQuestions: [...careerValuesSeeds, ...careerValuesSupplementalSeeds],
    resultRanges: [
      result('career-harbor', 0, 12, '稳定港湾型', '清晰和可预期会让你更安心地投入。', '你可能更重视明确路径与可控任务，面对模糊机会时会保持谨慎。', ['选择一个低风险的新能力实验', '向主管确认成果如何连接更大目标']),
      result('career-builder', 13, 19, '成长建造型', '你愿意在空间与支持之间逐步扩张。', '你通常会寻找可学习、有一定自主度且成果可见的工作环境。', ['定期写下真正驱动你的项目特点', '谈岗位时同时询问反馈和决策权限']),
      result('career-compass', 20, 24, '价值罗盘型', '你希望用自己的方式产生真实影响。', '成长机会、自主空间和有意义的结果常共同决定你的投入程度。', ['警惕把所有重要问题都揽在身上', '为价值追求配置可持续的边界'])
    ]
  })
]
