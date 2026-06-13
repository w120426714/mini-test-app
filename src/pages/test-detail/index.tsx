import { Text, View } from '@tarojs/components'
import { AppButton } from '../../components/AppButton'
import { getTestById } from '../../data/tests'
import { getRouteParam, navigateTo, switchTab } from '../../lib/platform'
import './index.scss'

export default function TestDetail() {
  const testId = getRouteParam('testId')
  const test = getTestById(testId)

  if (!test) {
    return (
      <View className='page-shell detail-page'>
        <Text className='page-title'>测试走丢了</Text>
        <Text className='muted-copy'>这个测试暂时无法打开，先回测试广场看看别的吧。</Text>
        <AppButton onClick={() => switchTab('/pages/test-list/index')}>返回测试广场</AppButton>
      </View>
    )
  }

  const bankSize = test.bankSize || test.questions.length

  return (
    <View className='page-shell detail-page'>
      <Text className='eyebrow'>测试说明</Text>
      <Text className='page-title'>{test.title}</Text>
      <Text className='muted-copy detail-page__desc'>{test.description}</Text>

      <View className={`detail-page__ticket detail-page__ticket--${test.coverTone}`}>
        <View>
          <Text>{test.questionCount}</Text>
          <Text>本次抽题</Text>
        </View>
        <View>
          <Text>{bankSize}</Text>
          <Text>候选题库</Text>
        </View>
        <View>
          <Text>{test.estimatedMinutes}</Text>
          <Text>分钟完成</Text>
        </View>
      </View>

      <View className='detail-page__dimensions'>
        {test.dimensions.map((dimension) => (
          <Text key={dimension.key}>{dimension.label}</Text>
        ))}
      </View>

      <View className='detail-page__source'>
        <Text>题库说明</Text>
        <Text>{test.bankSource || '原创题库，每次测试随机抽取题目。'}</Text>
        {test.scoringModel === 'iq-standard' && (
          <Text>提示：结果为准标准化脑力估计，不等同于正式 IQ 诊断。</Text>
        )}
      </View>

      <AppButton onClick={() => navigateTo(`/pages/quiz/index?testId=${test.id}`)}>开始测试</AppButton>
    </View>
  )
}
