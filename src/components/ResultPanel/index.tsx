import { Text, View } from '@tarojs/components'
import type { TestDefinition, TestResultRange } from '../../types/test'
import './index.scss'

interface ResultPanelProps {
  test: TestDefinition
  result: TestResultRange
  score: number
  dimensionScores: Record<string, number>
}

export function ResultPanel({ test, result, score, dimensionScores }: ResultPanelProps) {
  const maxDimensionScore = Math.max(...Object.values(dimensionScores), 1)

  return (
    <View className='result-panel'>
      <Text className='result-panel__eyebrow'>{test.title}</Text>
      <Text className='result-panel__title'>{result.title}</Text>
      <Text className='result-panel__tagline'>{result.tagline}</Text>
      <View className='result-panel__score'>
        <Text>{score}</Text>
        <Text>综合火花值</Text>
      </View>
      <View className='result-panel__dimensions'>
        {test.dimensions.map((dimension) => {
          const value = dimensionScores[dimension.key] || 0
          const width = `${Math.round((value / maxDimensionScore) * 100)}%`

          return (
            <View className='result-panel__dimension' key={dimension.key}>
              <View className='result-panel__dimension-label'>
                <Text>{dimension.label}</Text>
                <Text>{value}</Text>
              </View>
              <View className='result-panel__track'>
                <View className='result-panel__bar' style={{ width }} />
              </View>
            </View>
          )
        })}
      </View>
      <Text className='result-panel__description'>{result.description}</Text>
    </View>
  )
}
