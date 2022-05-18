import vuePlugin from 'rollup-plugin-vue'
import servePlugin from 'rollup-plugin-serve'
import livereloadPlugin from 'rollup-plugin-livereload'
import typescriptPlugin from 'rollup-plugin-typescript2'
import replacePlugin from '@rollup/plugin-replace'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import copyAssetPlugin, { ASSET_EXTS } from '../build/rollup-plugin-copy-asset'
import aliasPlugin from '../build/rollup-plugin-alias'
import postcssPlugin from 'rollup-plugin-postcss'
import commonjsPlugin from 'rollup-plugin-commonjs'
import autoprefixer from 'autoprefixer'
import { watch } from 'rollup'
import { SRC_DIR } from '../build/utils'
import { extname, resolve } from 'path'
import chokidar from 'chokidar'

watch({
  input: 'dev/main.ts',
  plugins: [
    nodeResolvePlugin(),
    commonjsPlugin(),
    typescriptPlugin({
      transformers: [],
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          target: 'es5'
        }
      }
    }),
    aliasPlugin({
      alias: {
        '@': SRC_DIR
      }
    }),
    vuePlugin({
      preprocessStyles: true
    }),
    postcssPlugin({
      plugins: [
        autoprefixer
      ],
      extract: false,
      use: {
        sass: null,
        stylus: null,
        less: { javascriptEnabled: true }
      }
    }),
    replacePlugin({
      values: {
        'process.env.NODE_ENV': '\'development\'',
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'true'
      },
      preventAssignment: false
    }),
    servePlugin({
      open: true,
      openPage: './dev/index.html',
      port: 8080,
      contentBase: './dev'
    }),
    livereloadPlugin({
      watch: ['dev/bundle.js']
    }),
    {
      name: 'image',
      load (id:string) {
        const ext = extname(id)
        if (ASSET_EXTS.includes(ext)) {
          const filename = id.split('/').pop()
          return `export default './assets/${filename}'`
        }
      }
    }
  ],
  output: {
    file: 'dev/bundle.js',
    format: 'iife',
    plugins: [
      copyAssetPlugin({
        assetsPath: resolve('dev', 'assets')
      })
    ]
  },
  watch: {
    chokidar,
    include: ['src/**/*', 'dev/**/*']
  }
})
// watcher.on('event', console.log)
// await bundle.write({
// })
