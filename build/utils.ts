import { appendFileSync, copyFileSync, existsSync, mkdirSync, readdirSync, rmdirSync, rmSync, statSync, unlinkSync, WriteFileOptions, writeFileSync } from 'fs'
import typescriptPlugin from 'rollup-plugin-typescript2'
import { extname, resolve } from 'path'
import { OutputAsset, OutputChunk } from 'rollup'
import cssnano from 'cssnano'
import postcss from 'postcss'

export type Output = OutputChunk | OutputAsset

export const { FORMAT = 'es' } = process.env
export const IS_ES = FORMAT === 'es'
export const IS_CJS = FORMAT === 'cjs'
export const OUTPUT_DIR = resolve('dist', FORMAT) /** 输出目录。 */
export const SRC_DIR = resolve('src') /** 源码目录。 */
export const OUTPUT_ASSETS_DIR = resolve(OUTPUT_DIR, 'assets')

/**
 * cssnano 选项。
 */
export const CSSNANO_OPTIONS = {
  preset: [
    'default',
    {
      normalizeWhitespace: true,
      discardComments: true
    }
  ]
}
/**
 * ts插件实例。
 */
export const ROLLUP_TS_PLUGIN_INSTANCE = typescriptPlugin({
  transformers: [],
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      target: IS_ES ? 'es6' : 'es5'
    }
  }
})

/**
 * @deprecated
 * @param unit8Array 数据。
 * @returns 字符串。
 */
export function Uint8ArrayToString (unit8Array: Uint8Array): string {
  let dataString = ''
  for (let i = 0; i < unit8Array.length; i++) {
    dataString += String.fromCharCode(unit8Array[i])
  }

  return dataString
}

/**
 * 写入文件，自动创建不存在的目录。
 * @param path 文件路径。
 * @param data 数据。
 * @param append 是否追加文件内容。
 */
export function writeFileSyncPro (path: string, data: string | Uint8Array, append = false): void {
  const pathFragments = path.split('/').filter(Boolean)

  let tempPath = '/'
  for (let i = 0; i < pathFragments.length; i++) {
    const pathFragment = pathFragments[i]
    tempPath += pathFragment

    if (pathFragment.includes('.')) {
      if (existsSync(tempPath) && !append) {
        rmSync(tempPath)
      }

      const fsParams = [tempPath, data, { encoding: 'utf-8' }] as [string, string | Uint8Array, WriteFileOptions | undefined]
      if (append) {
        appendFileSync(...fsParams)
      } else {
        writeFileSync(...fsParams)
      }
      break
    } else {
      if (!existsSync(tempPath)) {
        mkdirSync(tempPath)
      }
      tempPath += '/'
    }
  }
}

/**
 * 复制文件，自动创建不存在的目录。
 * @param path 文件路径。
 * @param currentPath 文件当前路径。
 * @param newPath 文件新路径。
 * @param cover 是否覆盖。
 */
export function copyFileSyncPro (currentPath: string, newPath: string, cover = true): void {
  const pathFragments = newPath.split('/').filter(Boolean)

  let tempPath = '/'
  for (let i = 0; i < pathFragments.length; i++) {
    const pathFragment = pathFragments[i]
    tempPath += pathFragment

    if (pathFragment.includes('.')) {
      if (existsSync(tempPath) && cover) {
        rmSync(tempPath)
      }

      copyFileSync(currentPath, newPath)
      break
    } else {
      if (!existsSync(tempPath)) {
        mkdirSync(tempPath)
      }
      tempPath += '/'
    }
  }
}

/**
 * @param output 输出数据。
 * @returns 是否是css文件。
 */
export function isCssFile (output: Output): boolean {
  return extname(output.fileName) === '.css'
}

/**
 * @param output 输出数据。
 * @returns 是否是ts申明文件。
 */
export function isTsDeclarationFile (output: Output): boolean {
  return output.fileName.endsWith('.d.ts')
}

/**
 * @param output 输出数据。
 * @returns 是否是静态资源。
 */
export function isAsset (output: Output): output is OutputAsset {
  return output.type === 'asset'
}

/**
 * 删除文件夹。
 * @param path 文件夹路径。
 */
export function unlinkDirSync (path: string): void {
  if (existsSync(path)) {
    const files = readdirSync(path)
    files.forEach(file => {
      const filePath = `${path}/${file}`
      const stats = statSync(filePath)
      if (stats.isDirectory()) {
        unlinkDirSync(filePath)
      } else {
        unlinkSync(filePath)
      }
    })

    rmdirSync(path)
  }
}

type Query = {
  [key: string]: boolean | string
}
/**
 * @deprecated
 * @param fileQuery 文件query参数。
 * @returns 对象格式的query参数。
 */
export function queryify (fileQuery = ''): Query {
  if (fileQuery) {
    return fileQuery.split('&').reduce<Query>((sum, value) => {
      const [k, v] = value.split('=')
      sum[k] = v ?? true
      return sum
    }, {})
  }

  return {}
}

/**
 * @async
 * @param code1 部分css代码。
 * @param code2 完整css代码。
 * @returns 简化后的css代码。
 */
export async function minifyCSSCode (code1: string, code2: string): Promise<string> {
  const { css } = await postcss([cssnano(CSSNANO_OPTIONS)]).process(`${code1}\n${code2}`, { from: undefined })
  const miniCode = css.replace(code2, '')
  return miniCode
}
