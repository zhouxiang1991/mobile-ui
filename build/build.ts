import { existsSync, readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import vuePlugin from 'rollup-plugin-vue'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import postcssPlugin from 'rollup-plugin-postcss'
import commonjsPlugin from 'rollup-plugin-commonjs'
import autoprefixer from 'autoprefixer'
import { InputOptions, type ModuleFormat, OutputAsset, OutputChunk, OutputOptions, RollupOutput, rollup } from 'rollup'
import replacePlugin from '@rollup/plugin-replace'
import { capitalize } from 'lodash-es'
import pkg from '../package.json'
import aliasPlugin from './rollup-plugin-alias'
import copyAssetPlugin from './rollup-plugin-copy-asset'
import rewriteVueImportPlugin from './rollup-plugin-rewrite-vue-import'
import addStyleImportPlugin from './rollup-plugin-add-style-import'
import rewriteImportAssetPlugin from './rollup-plugin-rewrite-asset-import'
// import miniPlugin from './rollup-plugin-mini'
import { CSSNANO_OPTIONS, FORMAT, OUTPUT_ASSETS_DIR, OUTPUT_DIR, Output, ROLLUP_TS_PLUGIN_INSTANCE, SRC_DIR, isAsset, isCssFile, isTsDeclarationFile, minifyCSSCode, writeFileSyncPro } from './utils'

/**
 * @param componentEntry 组件入口。
 * @returns 输入选项。
 */
function resolveRollupInputOptions (componentEntry: string): InputOptions {
  return {
    input  : componentEntry,
    plugins: [
      nodeResolvePlugin(),
      commonjsPlugin(),
      ROLLUP_TS_PLUGIN_INSTANCE,
      vuePlugin({
        preprocessStyles: true,
      }),
      aliasPlugin({
        alias: {
          '@': SRC_DIR,
        },
      }),
      postcssPlugin({
        plugins: [
          autoprefixer,
        ],
        extract : true,
        minimize: CSSNANO_OPTIONS,
        use     : {
          sass  : null,
          stylus: null,
          less  : { javascriptEnabled: true },
        },
      }),
    ],
    external: (id: string) => {
      if (
        !id.startsWith('/') &&
        !id.startsWith('.')
      ) {
        return true
      }

      if (id === componentEntry) {
        return false
      }

      if (id.startsWith('..')) {
        return true
      }

      return false
    },
  }
}
/**
 * @param componentName 组件名称。
 * @returns 输入选项。
 */
function resolveRollupOutputOptions (componentName: string): OutputOptions {
  const isStyles = componentName === 'styles'
  const isUtils = componentName === 'utils'
  const isVueComponent = !isStyles && !isUtils
  const plugins = [
    isVueComponent && rewriteVueImportPlugin(),
    isVueComponent && addStyleImportPlugin(),
    isVueComponent && copyAssetPlugin({
      assetsPath: OUTPUT_ASSETS_DIR,
    }),
    isVueComponent && rewriteImportAssetPlugin({
      assetsPath: OUTPUT_ASSETS_DIR,
    }),
    // !isStyles && miniPlugin()
  ].filter(Boolean)
  const outputOptions = {
    name  : componentName,
    file  : resolve(OUTPUT_DIR, componentName, 'index.js'),
    format: FORMAT as ModuleFormat,
    plugins,
  }

  return outputOptions
}

/**
 * 将编译后的代码写入文件。
 *
 * @param rollupOutput 输出数据。
 * @param rollupOutput.output 输出数据列表。
 * @param componentName 组件名称。
 */
function writeDistFiles ({ output }: RollupOutput, componentName: string) {
  const componentOutputDir = resolve(OUTPUT_DIR, componentName)
  const assetOutputs = output.filter<OutputAsset>((outputItem: Output): outputItem is OutputAsset => isAsset(outputItem))
  const chunkOutputs = output.filter<OutputChunk>((outputItem: Output): outputItem is OutputChunk => !isAsset(outputItem))

  for (let i = 0; i < assetOutputs.length; i++) {
    const outputItem = assetOutputs[i]

    switch (true) {
      case isCssFile(outputItem) : {
        const componentStyleOutputEntry = resolve(componentOutputDir, 'index.css')

        writeFileSyncPro(componentStyleOutputEntry, outputItem.source)

        break
      }

      case isTsDeclarationFile(outputItem) : {
        if (componentName === 'styles') {
          break
        }

        if (outputItem.fileName.startsWith(componentName)) {
          let { source, fileName } = outputItem

          if (
            fileName.endsWith('.vue.d.ts') ||
            fileName.endsWith('index.d.ts')
          ) {
            if (fileName.endsWith('.vue.d.ts')) {
              const capCompName = capitalize(componentName)

              source = (<string>source).replace(/_default/, capCompName).replace('export default _default;', `export { ${capCompName} };`)
            }

            if (
              componentName !== 'utils' &&
              fileName.endsWith('index.d.ts')
            ) {
              source = (<string>source).replace(/^.*\r?\n.*\r?\n/, '')
            }

            const declarationOutput = resolve(OUTPUT_DIR, `${componentName}/index.d.ts`)

            writeFileSyncPro(declarationOutput, source, true)
          } else {
            fileName = fileName.replace(/^src\//g, '')

            const declarationOutput = resolve(OUTPUT_DIR, fileName)

            writeFileSyncPro(declarationOutput, source)
          }
        }
      }
      default : {
        break
      }
    }
  }

  chunkOutputs.forEach((outputItem: OutputChunk) => {
    if (componentName === 'styles') {
      return
    }

    const componentOutputEntry = resolve(componentOutputDir, 'index.js')

    writeFileSyncPro(componentOutputEntry, outputItem.code)
  })
}

/**
 * 打包组件文件。
 *
 * @async
 */
async function buildStart (): Promise<void> {
  const files = readdirSync(SRC_DIR).filter((dir: string) => ['assets', 'index.ts'].every(name => !dir.includes(name)))
  const rollupInputOptionsList = files
    .map<string>((file: string) => resolve(SRC_DIR, file, 'index.ts'))
    .map<InputOptions>((entry: string) => resolveRollupInputOptions(entry))
  const rollupOutputOptionsList = files
    .map<OutputOptions>((file: string) => resolveRollupOutputOptions(file))

  for (let i = 0; i < rollupInputOptionsList.length; i++) {
    const rollupInputOptions = rollupInputOptionsList[i]
    const rollupOutputOptions = rollupOutputOptionsList[i]
    const bundle = await rollup(rollupInputOptions)
    const rollupOutput = await bundle.generate(rollupOutputOptions)

    writeDistFiles(rollupOutput, files[i])
  }
}

/**
 * 压缩样式代码。
 *
 */
function compressStyles () {
  const nonComponentDistFiles = [
    'assets',
    'utils',
    'styles',
  ]
  const distComponentNames = readdirSync(OUTPUT_DIR).filter((dir: string) => !dir.endsWith('.d.ts') && nonComponentDistFiles.every(name => !dir.includes(name)))
  const commonCSSFilePath = resolve(OUTPUT_DIR, 'styles', 'index.css')

  if (existsSync(commonCSSFilePath)) {
    const commonCSSCode = readFileSync(commonCSSFilePath, { encoding: 'utf-8' })

    distComponentNames.forEach(async (distComponentName) => {
      const componentCSSCodePath = resolve(OUTPUT_DIR, distComponentName, 'index.css')

      if (existsSync(componentCSSCodePath)) {
        const componentCSSCode = readFileSync(componentCSSCodePath, { encoding: 'utf-8' })
        const miniCode = await minifyCSSCode(componentCSSCode, commonCSSCode)

        writeFileSyncPro(componentCSSCodePath, miniCode)
      }
    })
  }
}

/**
 * 创建入口文件。
 *
 * @async
 */
async function buildEntry (): Promise<void> {
  const bundle = await rollup({
    input  : resolve(SRC_DIR, 'index.ts'),
    plugins: [
      replacePlugin({
        values: {
          VERSION: `'${pkg.version}'`,
        },
        preventAssignment: false,
      }),
      nodeResolvePlugin(),
      commonjsPlugin(),
      ROLLUP_TS_PLUGIN_INSTANCE,
    ],
    external: (id) => {
      return !id.endsWith('index.ts')
    },
  })
  const { output } = await bundle.generate({
    name  : 'index.ts',
    format: FORMAT as ModuleFormat,
  })

  output.forEach((outputItem: Output) => {
    if (isAsset(outputItem)) {
      if (outputItem.fileName === 'index.d.ts') {
        writeFileSyncPro(resolve(OUTPUT_DIR, outputItem.fileName), outputItem.source)
      }
    } else {
      writeFileSyncPro(resolve(OUTPUT_DIR, outputItem.fileName), outputItem.code)
    }
  })
}

await buildStart()
await compressStyles()
await buildEntry()
