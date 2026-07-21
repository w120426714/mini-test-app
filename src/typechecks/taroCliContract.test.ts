import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('local Taro CLI type contract', () => {
  it('rejects invalid nested project config and webpack-chain calls', () => {
    const tscPath = path.resolve('node_modules/typescript/bin/tsc')
    const fixtureConfig = path.resolve('type-tests/invalid-taro-cli/tsconfig.json')
    const result = spawnSync(process.execPath, [tscPath, '--project', fixtureConfig], {
      cwd: process.cwd(),
      encoding: 'utf8'
    })
    const output = `${result.stdout}${result.stderr}`

    expect(result.status).not.toBe(0)
    expect(output).toContain('DesignWidth')
    expect(output).toContain('PluginItem')
    expect(output).toContain('wrongMethod')
  })
})
