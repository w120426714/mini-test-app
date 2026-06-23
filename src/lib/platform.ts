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

/**
 * Hook 形式：通过 Taro.useRouter() 获取路由参数。
 * Taro 4 在小程序和 H5 端都支持 useRouter hook。
 *
 * 用法：
 *   function MyPage() {
 *     const params = useRouteParams()
 *     const testId = params.testId
 *     ...
 *   }
 */
export function useRouteParams(): Record<string, string> {
  const router = Taro.useRouter()
  const params = router?.params
  if (params && typeof params === 'object') {
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'string') {
        result[key] = value
      }
    }
    return result
  }
  return {}
}

/**
 * 同步版本：从 getCurrentInstance 获取路由参数。
 * 作为兜底方案，在 useRouter 不可用时使用。
 */
export function getRouteParam(name: string): string {
  const instance = Taro.getCurrentInstance()
  const router = instance?.router
  if (router?.params?.[name] !== undefined) {
    return String(router.params[name])
  }
  return ''
}
