import { Text, View } from '@tarojs/components'
import type { TestDefinition } from '../../types/test'
import './index.scss'

interface TestCardProps {
  test: TestDefinition
  onClick?: () => void
}

export function TestCard({ test, onClick }: TestCardProps) {
  const bankSize = test.bankSize || test.questions.length

  return (
    <View className={`test-card test-card--${test.coverTone}`} onClick={onClick}>
      <View className='test-card__badge'>
        <Text>{test.scoringModel === 'iq-standard' ? '准标准化' : '随机题库'}</Text>
      </View>
      <View className='test-card__meta'>
        <Text>{test.questionCount} 题</Text>
        <Text>{bankSize} 题库</Text>
        <Text>{test.estimatedMinutes} 分钟</Text>
      </View>
      <Text className='test-card__title'>{test.title}</Text>
      <Text className='test-card__subtitle'>{test.subtitle}</Text>
      <View className='test-card__footer'>
        <Text>热度 {test.popularity}</Text>
        <Text>开始测试</Text>
      </View>
    </View>
  )
}
