declare module '@babel/generator'
declare module '@babel/traverse'
declare module '@babel/template'
declare module '@babel/helper-module-imports'
declare module 'rollup-plugin-serve'
declare module 'chokidar'
// declare module 'rollup-plugin-less'
// declare module 'rollup-plugin-alias'
// declare module 'typescript-transform-paths'
// declare module 'rollup-plugin-smart-asset'

declare const VERSION:string

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
