import { Text, View } from '@tarojs/components'
import { useState } from 'react'
import { TestCard } from '../../components/TestCard'
import { categoryLabels, getTestsByCategory } from '../../data/tests'
import { navigateTo } from '../../lib/platform'
import type { TestCategory } from '../../types/test'
import './index.scss'

const categories = Object.keys(categoryLabels) as TestCategory[]

export default function TestList() {
  const [activeCategory, setActiveCategory] = useState<TestCategory>('eq')
  const visibleTests = getTestsByCategory(activeCategory)

  return (
    <View className='page-shell test-list-page'>
      <Text className='eyebrow'>测试广场</Text>
      <Text className='page-title'>挑一个今天想认识的自己</Text>

      <View className='test-list-page__tabs'>
        {categories.map((category) => (
          <Text
            key={category}
            className={category === activeCategory ? 'is-active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {categoryLabels[category]}
          </Text>
        ))}
      </View>

      <View className='test-list-page__list'>
        {visibleTests.length > 0 ? (
          visibleTests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              onClick={() => navigateTo(`/pages/test-detail/index?testId=${test.id}`)}
            />
          ))
        ) : (
          <View className='test-list-page__empty'>
            <Text>这个分类的测试正在路上</Text>
            <Text>先试试情商、智商或性格测试吧。</Text>
          </View>
        )}
      </View>
    </View>
  )
}
