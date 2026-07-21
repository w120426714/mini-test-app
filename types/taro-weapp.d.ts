export interface RouterInfo {
  params?: Record<string, unknown>
}

export interface TaroSuccessResult {
  errMsg: string
}

export interface TaroApi {
  getStorageSync(key: string): unknown
  setStorageSync(key: string, value: unknown): void
  removeStorageSync(key: string): void
  showToast(options: {
    title: string
    icon?: 'none' | 'success' | 'loading' | 'error'
    duration?: number
  }): Promise<TaroSuccessResult>
  navigateTo(options: { url: string }): Promise<TaroSuccessResult>
  switchTab(options: { url: string }): Promise<TaroSuccessResult>
  showModal(options: {
    title: string
    content: string
    success?: (result: { confirm: boolean; cancel: boolean }) => void
  }): Promise<TaroSuccessResult>
  useRouter(): RouterInfo
  getCurrentInstance(): { router?: RouterInfo }
}

export interface WeappPageConfig {
  navigationBarTitleText?: string
}

export interface WeappAppConfig {
  pages: string[]
  window?: WeappPageConfig & {
    backgroundTextStyle?: 'dark' | 'light'
    navigationBarBackgroundColor?: string
    navigationBarTextStyle?: 'black' | 'white'
    backgroundColor?: string
  }
  tabBar?: {
    color: string
    selectedColor: string
    backgroundColor: string
    borderStyle?: 'black' | 'white'
    list: Array<{ pagePath: string; text: string }>
  }
}

declare const Taro: TaroApi

export function useLoad(callback: () => void): void

export default Taro

declare global {
  function defineAppConfig<Config extends WeappAppConfig>(config: Config): Config
  function definePageConfig<Config extends WeappPageConfig>(config: Config): Config
}
