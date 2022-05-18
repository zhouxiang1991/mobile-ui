import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generator from '@babel/generator'
import { OutputPlugin } from 'rollup'
import { File, Identifier, ImportDeclaration, StringLiteral } from '@babel/types'
import { IS_CJS, IS_ES } from './utils'

/**
 * 因为vue文件的代码被编译后合并进vue组件入口文件index.js里面了。
 * 所以将所有*.vue的导入语句修改成index.js
 * @param ast ast。
 */
function rewriteVueImportDeclaration (ast: File): void {
  function resolve (node: StringLiteral): void {
    if (node.value.endsWith('.vue')) {
      const pathFragments = node.value.split('/')
      pathFragments.pop()
      pathFragments.push('index')

      node.value = pathFragments.join('/')
    }
  }

  const visitor = {} as {
    ImportDeclaration?: (path: { node: ImportDeclaration, scope: any }) => void,
    Identifier?: (path: { node : Identifier, parent: any }) => void
  }

  if (IS_ES) {
    visitor.ImportDeclaration = (path: { node: ImportDeclaration, scope: any }) => {
      traverse.default(path.node, {
        StringLiteral (path: { node: StringLiteral }) {
          resolve(path.node)
        }
      }, path.scope, path)
    }
  } else if (IS_CJS) {
    visitor.Identifier = (path: { node : Identifier, parent: any }) => {
      if (path.node.name === 'require') {
        const node = path.parent.arguments[0]
        resolve(node)
      }
    }
  }

  traverse.default(ast, visitor)
}

/**
 * @param 插件选项。
 * @returns 插件对象。
 */
function rewriteImport (): OutputPlugin {
  return {
    name: 'rewriteImport',
    renderChunk (code: string): string {
      const ast = parse(code, { sourceType: 'module' })
      rewriteVueImportDeclaration(ast)
      code = generator.default(ast).code
      return code
    }
  }
}

export default rewriteImport
