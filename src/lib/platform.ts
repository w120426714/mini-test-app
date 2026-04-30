import Taro from '@tarojs/taro'

export function showToast(title: string) {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 1800
  })
}

export function navigateTo(url: string) {
  Taro.navigateTo({ url })
}

export function switchTab(url: string) {
  Taro.switchTab({ url })
}

export function getRouteParam(name: string) {
  const router = Taro.getCurrentInstance().router
  return router?.params?.[name]
}
