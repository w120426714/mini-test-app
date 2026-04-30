import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { useState } from 'react'
import { AppButton } from '../../components/AppButton'
import { getTestById } from '../../data/tests'
import { clearHistory, getHistory } from '../../lib/storage'
import './index.scss'

export default function Profile() {
  const [history, setHistory] = useState(getHistory())

  function handleClear() {
    Taro.showModal({
      title: '清空本地记录',
      content: '清空后无法恢复，确认继续吗？',
      success: (res) => {
        if (res.confirm && clearHistory()) {
          setHistory([])
        }
      }
    })
  }

  return (
    <View className='page-shell profile-page'>
      <Text className='eyebrow'>我的报告</Text>
      <Text className='page-title'>你认识自己的每一次，都在这里留痕</Text>

      <View className='profile-page__list'>
        {history.length > 0 ? (
          history.map((item) => {
            const test = getTestById(item.testId)
            const result = test?.resultRanges.find((range) => range.id === item.resultRangeId)

            return (
              <View className='profile-page__item' key={item.id}>
                <Text>{result?.title || '未知报告'}</Text>
                <Text>{test?.title || '未知测试'} · {item.score} 分</Text>
              </View>
            )
          })
        ) : (
          <View className='profile-page__empty'>
            <Text>还没有报告</Text>
            <Text>完成一次测试后，结果会保存在本地。</Text>
          </View>
        )}
      </View>

      {history.length > 0 && (
        <AppButton variant='secondary' onClick={handleClear}>
          清空本地记录
        </AppButton>
      )}
    </View>
  )
}
