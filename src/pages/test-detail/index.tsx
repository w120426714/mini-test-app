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

  return (
    <View className='page-shell detail-page'>
      <Text className='eyebrow'>测试说明</Text>
      <Text className='page-title'>{test.title}</Text>
      <Text className='muted-copy detail-page__desc'>{test.description}</Text>

      <View className={`detail-page__ticket detail-page__ticket--${test.coverTone}`}>
        <Text>{test.questionCount} 道题</Text>
        <Text>{test.estimatedMinutes} 分钟完成</Text>
        <Text>生成 {test.resultRanges.length} 种可能报告</Text>
      </View>

      <View className='detail-page__dimensions'>
        {test.dimensions.map((dimension) => (
          <Text key={dimension.key}>{dimension.label}</Text>
        ))}
      </View>

      <AppButton onClick={() => navigateTo(`/pages/quiz/index?testId=${test.id}`)}>开始测试</AppButton>
    </View>
  )
}
