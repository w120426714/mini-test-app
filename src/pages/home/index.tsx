import { Text, View } from '@tarojs/components'
import { AppButton } from '../../components/AppButton'
import { TestCard } from '../../components/TestCard'
import { getRecommendedTest, tests } from '../../data/tests'
import { navigateTo, switchTab } from '../../lib/platform'
import { getHistory } from '../../lib/storage'
import './index.scss'

export default function Home() {
  const recommended = getRecommendedTest()
  const hotTests = tests.slice(0, 3)
  const historyCount = getHistory().length

  return (
    <View className='page-shell home-page'>
      <Text className='eyebrow'>心测研究所</Text>
      <Text className='page-title'>把今天的你，测成一张有趣报告</Text>
      <Text className='muted-copy home-page__intro'>
        轻松完成 1 到 3 分钟测试，生成适合分享的性格、情绪和脑力画像。
      </Text>

      <View className='home-page__hero-card'>
        <Text className='home-page__label'>今日推荐</Text>
        <Text className='home-page__hero-title'>{recommended.title}</Text>
        <Text className='home-page__hero-copy'>{recommended.subtitle}</Text>
        <AppButton onClick={() => navigateTo(`/pages/test-detail/index?testId=${recommended.id}`)}>
          开始今日测试
        </AppButton>
      </View>

      <View className='home-page__section-head'>
        <Text>热门测试</Text>
        <Text onClick={() => switchTab('/pages/test-list/index')}>查看全部</Text>
      </View>

      <View className='home-page__grid'>
        {hotTests.map((test) => (
          <TestCard
            key={test.id}
            test={test}
            onClick={() => navigateTo(`/pages/test-detail/index?testId=${test.id}`)}
          />
        ))}
      </View>

      <View className='home-page__history' onClick={() => switchTab('/pages/profile/index')}>
        <Text>本地报告记录</Text>
        <Text>{historyCount > 0 ? `已保存 ${historyCount} 份报告` : '完成一次测试后会出现在这里'}</Text>
      </View>
    </View>
  )
}
