import { Text, View } from '@tarojs/components'
import './index.scss'

interface ProgressMeterProps {
  current: number
  total: number
}

export function ProgressMeter({ current, total }: ProgressMeterProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <View className='progress-meter'>
      <View className='progress-meter__label'>
        <Text>进度</Text>
        <Text>{current}/{total}</Text>
      </View>
      <View className='progress-meter__track'>
        <View className='progress-meter__bar' style={{ width: `${percent}%` }} />
      </View>
    </View>
  )
}
