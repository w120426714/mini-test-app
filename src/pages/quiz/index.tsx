import { Text, View } from '@tarojs/components'
import { useState } from 'react'
import { AppButton } from '../../components/AppButton'
import { ProgressMeter } from '../../components/ProgressMeter'
import { getTestById } from '../../data/tests'
import { useRouteParams, navigateTo, showToast, switchTab } from '../../lib/platform'
import { selectQuestionsForRun } from '../../lib/questionPicker'
import { calculateScore, createHistoryItem, matchResultRange } from '../../lib/scoring'
import type { AnswerMap } from '../../lib/scoring'
import { saveHistoryItem } from '../../lib/storage'
import './index.scss'

export default function Quiz() {
  const params = useRouteParams()
  const testId = params.testId || ''
  const test = getTestById(testId)
  const [runQuestions] = useState(() => (test ? selectQuestionsForRun(test) : []))
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerMap>({})

  if (!test) {
    return (
      <View className='page-shell quiz-page'>
        <Text className='page-title'>题目走丢了</Text>
        <Text className='muted-copy'>这个测试暂时无法继续。</Text>
        <AppButton onClick={() => switchTab('/pages/test-list/index')}>返回测试广场</AppButton>
      </View>
    )
  }

  const activeTest = test

  const question = runQuestions[index]

  function selectOption(optionId: string) {
    const nextAnswers = { ...answers, [question.id]: optionId }
    setAnswers(nextAnswers)

    if (index < runQuestions.length - 1) {
      setIndex(index + 1)
      return
    }

    const scoreResult = calculateScore({ ...activeTest, questions: runQuestions }, nextAnswers)
    const result = matchResultRange(activeTest, scoreResult.score)

    if (!result) {
      showToast('结果生成失败，请重新测试')
      return
    }

    const history = createHistoryItem(activeTest, result.id, scoreResult)
    const saved = saveHistoryItem(history)

    if (!saved) {
      showToast('报告已生成，但本地记录保存失败')
    }

    navigateTo(`/pages/result/index?historyId=${history.id}`)
  }

  return (
    <View className='page-shell quiz-page'>
      <ProgressMeter current={index + 1} total={runQuestions.length} />
      <View className='quiz-page__card'>
        <View className='quiz-page__meta'>
          <Text>{question.domain || '综合'}</Text>
          <Text>难度 {question.difficulty || 3}/5</Text>
        </View>
        <Text className='quiz-page__question'>{question.title}</Text>
        <View className='quiz-page__options'>
          {question.options.map((option) => (
            <View
              key={option.id}
              className='quiz-page__option'
              onClick={() => selectOption(option.id)}
            >
              <Text>{option.label}</Text>
            </View>
          ))}
        </View>
      </View>
      {index > 0 && (
        <AppButton variant='secondary' onClick={() => setIndex(index - 1)}>
          上一题
        </AppButton>
      )}
    </View>
  )
}
