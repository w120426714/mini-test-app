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
  const bankTotal = tests.reduce((sum, test) => sum + (test.bankSize || test.questions.length), 0)

  return (
    <View className='page-shell home-page'>
      <View className='home-page__hero-card'>
        <Text className='home-page__label'>心测研究所</Text>
        <Text className='home-page__hero-title'>把今天的你，测成一张有趣报告</Text>
        <Text className='home-page__hero-copy'>
          每项约 500 道候选题，开局分层随机抽题，生成适合分享的性格、情绪和脑力画像。
        </Text>
        <View className='home-page__stats'>
          <View>
            <Text>{tests.length}</Text>
            <Text>测试主题</Text>
          </View>
          <View>
            <Text>{bankTotal}+</Text>
            <Text>候选题</Text>
          </View>
          <View>
            <Text>3min</Text>
            <Text>轻量完成</Text>
          </View>
        </View>
      </View>

      <View className='home-page__today'>
        <View>
          <Text className='home-page__label'>今日推荐</Text>
          <Text className='home-page__today-title'>{recommended.title}</Text>
          <Text className='home-page__today-copy'>{recommended.subtitle}</Text>
        </View>
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
