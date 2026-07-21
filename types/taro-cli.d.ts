export type CompilerType = 'webpack5'

export type DesignWidth = number | ((size?: string | number) => number)

export interface DeviceRatio {
  375?: number
  640?: number
  750?: number
  828?: number
}

export interface AliasConfig {
  '@'?: string
}

export interface DefineConstantsConfig {
  __LOG__?: string
  __TEST__?: string
}

export interface SassConfig {
  resource?: string | string[]
  projectDirectory?: string
  data?: string
}

export interface CopyPattern {
  from: string
  to: string
  ignore?: string[]
  transform?: (content: Buffer, absolutePath: string) => Buffer | string
  watch?: boolean
}

export interface CopyConfig {
  patterns: CopyPattern[]
  options: {
    ignore?: string[]
  }
}

export interface PluginOptions {
  enable?: boolean
}

export type PluginItem =
  | string
  | readonly [string, PluginOptions]
  | readonly [string, () => PluginOptions | Promise<PluginOptions>]

export interface ToggleConfig<Config> {
  enable?: boolean
  config?: Config
}

export interface PxTransformConfig {
  onePxTransform?: boolean
  unitPrecision?: number
  propList?: string[]
  selectorBlackList?: Array<string | RegExp>
  replace?: boolean
  mediaQuery?: boolean
  minPixelValue?: number
  targetUnit?: 'rpx' | 'vw' | 'rem'
  baseFontSize?: number
  maxRootSize?: number
  minRootSize?: number
  designWidth?: DesignWidth
  deviceRatio?: DeviceRatio
  platform?: string
  methods?: string[]
  exclude?: (fileName: string) => boolean
}

export interface CssModulesConfig {
  namingPattern: string
  generateScopedName: string | ((localName: string, absoluteFilePath: string) => string)
}

export interface EmptyPostcssPluginConfig {
  remove?: never
}

export interface MiniPostcssConfig {
  pxtransform?: ToggleConfig<PxTransformConfig>
  cssModules?: ToggleConfig<CssModulesConfig>
}

export interface H5PostcssConfig {
  autoprefixer?: ToggleConfig<EmptyPostcssPluginConfig>
  cssModules?: ToggleConfig<CssModulesConfig>
}

export type WebpackPluginConstructor = new (...arguments_: never[]) => object

export interface WebpackPluginChain {
  use(plugin: WebpackPluginConstructor): WebpackPluginChain
}

export interface WebpackResolveChain {
  plugin(name: string): WebpackPluginChain
}

export interface WebpackChain {
  readonly resolve: WebpackResolveChain
  plugin(name: string): WebpackPluginChain
}

export interface MiniConfig {
  enableSourceMap?: boolean
  sourceMapType?: string
  debugReact?: boolean
  postcss?: MiniPostcssConfig
  webpackChain?: (chain: WebpackChain) => void
}

export interface H5OutputConfig {
  filename?: string
  chunkFilename?: string
}

export interface MiniCssExtractPluginConfig {
  ignoreOrder?: boolean
  filename?: string
  chunkFilename?: string
}

export interface H5Config {
  publicPath?: string
  staticDirectory?: string
  chunkDirectory?: string
  output?: H5OutputConfig
  miniCssExtractPluginOption?: MiniCssExtractPluginConfig
  postcss?: H5PostcssConfig
  webpackChain?: (chain: WebpackChain) => void
}

export interface ReactNativePostcssConfig {
  scalable?: boolean
  pxtransform?: ToggleConfig<PxTransformConfig>
  cssModules?: {
    enable: boolean
  }
}

export interface ReactNativeConfig {
  appName?: string
  entry?: string
  sass?: SassConfig
  postcss?: ReactNativePostcssConfig
  enableMultipleClassName?: boolean
  enableMergeStyle?: boolean
  enableSvgTransform?: boolean
  alias?: AliasConfig
  designWidth?: DesignWidth
  deviceRatio?: DeviceRatio
}

export interface CacheConfig {
  enable?: boolean
  name?: string
}

export interface LoggerConfig {
  quiet: boolean
  stats: boolean
}

export interface UserConfigExport<Compiler extends CompilerType> {
  projectName?: string
  date?: string
  designWidth?: DesignWidth
  deviceRatio?: DeviceRatio
  sourceRoot?: string
  outputRoot?: string
  alias?: AliasConfig
  defineConstants?: DefineConstantsConfig
  copy?: CopyConfig
  sass?: SassConfig
  plugins?: PluginItem[]
  presets?: PluginItem[]
  framework?: 'react' | 'preact' | 'solid' | 'vue3' | 'none'
  compiler?: Compiler
  cache?: CacheConfig
  logger?: LoggerConfig
  mini?: MiniConfig
  h5?: H5Config
  rn?: ReactNativeConfig
}

type ConfigMerge<Compiler extends CompilerType> = (
  ...configs: Array<UserConfigExport<Compiler>>
) => UserConfigExport<Compiler>

export function defineConfig<Compiler extends CompilerType>(
  factory: (
    merge: ConfigMerge<Compiler>
  ) => UserConfigExport<Compiler> | Promise<UserConfigExport<Compiler>>
): UserConfigExport<Compiler>
