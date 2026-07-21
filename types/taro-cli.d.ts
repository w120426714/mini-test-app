export type UserConfigExport<Compiler extends string> = Record<string, unknown> & {
  compiler?: Compiler
}

type ConfigMerge<Compiler extends string> = (
  ...configs: Array<Record<string, unknown>>
) => UserConfigExport<Compiler>

export function defineConfig<Compiler extends string>(
  factory: (
    merge: ConfigMerge<Compiler>
  ) => UserConfigExport<Compiler> | Promise<UserConfigExport<Compiler>>
): UserConfigExport<Compiler>
