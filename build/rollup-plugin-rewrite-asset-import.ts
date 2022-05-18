import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generator from '@babel/generator'
import { OutputPlugin } from 'rollup'
import { File, Identifier, ImportDeclaration, StringLiteral } from '@babel/types'
import { IS_CJS, IS_ES } from './utils'
import { ASSET_EXTS } from './rollup-plugin-copy-asset'
import { relative } from 'path'

/**
 * 重写静态资源导入位置。
 * @param ast ast。
 */
function rewriteAssetImportDeclaration (ast: File, assetsPath: string): void {
  function resolve (node: StringLiteral): void {
    const { value } = node
    if (ASSET_EXTS.some(ext => value.endsWith(ext))) {
      const fileName = value.split('/').pop() as string

      const importFilePath = assetsPath.split('/')
      importFilePath.pop()
      importFilePath.push('someComponent')

      node.value = relative(importFilePath.join('/'), assetsPath + '/' + fileName)
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

type Options = {
  assetsPath: string
}

/**
 * @param 插件选项。
 * @returns 插件对象。
 */
function rewriteAssetImport (options: Options): OutputPlugin {
  const { assetsPath } = options
  return {
    name: 'rewriteAssetImport',
    renderChunk (code: string): string {
      const ast = parse(code, { sourceType: 'module' })
      rewriteAssetImportDeclaration(ast, assetsPath)
      code = generator.default(ast).code
      return code
    }
  }
}

export default rewriteAssetImport
