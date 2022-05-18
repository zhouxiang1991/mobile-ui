import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { addSideEffect } from '@babel/helper-module-imports'
import generator from '@babel/generator'
import { OutputPlugin } from 'rollup'
import { File, Program } from '@babel/types'
import template from '@babel/template'
import { IS_CJS, IS_ES } from './utils'
const createRequireSideEffect = template.default('require(\'MODULE\')')

/**
 * 新增组件样式导入声明。
 * @param ast ast。
 */
function addComponentStyleFileImportDeclaration (ast: File) {
  traverse.default(ast, {
    Program (path: { node: Program }) {
      if (IS_ES) {
        addSideEffect(path, './index.css')
      } else if (IS_CJS) {
        path.node.body.unshift(createRequireSideEffect({ MODULE: './index.css' }))
      }
    }
  })
}
/**
 * 新增公用样式导入声明。
 * @param ast ast。
 */
function addCommonStyleFileImportDeclaration (ast: File): void {
  traverse.default(ast, {
    Program (path: { node: Program }) {
      if (IS_ES) {
        addSideEffect(path, '../styles/index.css')
      } else {
        path.node.body.unshift(createRequireSideEffect({ MODULE: '../styles/index.css' }))
      }
    }
  })
}

/**
 * @param 插件选项。
 * @returns 插件对象。
 */
function addStyleImport (): OutputPlugin {
  return {
    name: 'addStyleImport',
    renderChunk (code: string): string {
      const ast = parse(code, { sourceType: 'module' })
      addCommonStyleFileImportDeclaration(ast)
      addComponentStyleFileImportDeclaration(ast)
      code = generator.default(ast).code
      return code
    }
  }
}

export default addStyleImport
