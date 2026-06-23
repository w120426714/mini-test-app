import { Text, View } from '@tarojs/components'
import { AppButton } from '../../components/AppButton'
import { ResultPanel } from '../../components/ResultPanel'
import { getTestById } from '../../data/tests'
import { useRouteParams, navigateTo, showToast, switchTab } from '../../lib/platform'
import { getHistoryItem } from '../../lib/storage'
import './index.scss'

export default function Result() {
  const params = useRouteParams()
  const historyId = params.historyId || ''
  const history = getHistoryItem(historyId)
  const test = getTestById(history?.testId)
  const result = test?.resultRanges.find((range) => range.id === history?.resultRangeId)

  if (!history || !test || !result) {
    return (
      <View className='page-shell result-page'>
        <Text className='page-title'>报告暂时无法打开</Text>
        <Text className='muted-copy'>本地记录可能已清理，重新测一次就能生成新报告。</Text>
        <AppButton onClick={() => switchTab('/pages/test-list/index')}>去测试广场</AppButton>
      </View>
    )
  }

  return (
    <View className='page-shell result-page'>
      <Text className='eyebrow'>你的报告</Text>
      <ResultPanel
        test={test}
        result={result}
        score={history.score}
        dimensionScores={history.dimensionScores}
      />

      <View className='result-page__suggestions'>
        <Text>给你的提醒</Text>
        {result.suggestions.map((suggestion) => (
          <Text key={suggestion}>{suggestion}</Text>
        ))}
      </View>

      <View className='result-page__actions'>
        <AppButton onClick={() => showToast('可使用小程序右上角菜单分享')}>分享报告</AppButton>
        <AppButton variant='secondary' onClick={() => navigateTo(`/pages/quiz/index?testId=${test.id}`)}>
          再测一次
        </AppButton>
      </View>
    </View>
  )
}
