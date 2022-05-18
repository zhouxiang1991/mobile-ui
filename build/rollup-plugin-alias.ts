import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generator from '@babel/generator'
import { Plugin } from 'rollup'
import { StringLiteral } from '@babel/types'
import { extname, relative } from 'path'
import { queryify } from './utils'

type Options = {
  alias: Record<string, string>
}

/**
 * @param 插件选项。
 * @returns 插件对象。
 */
function alias (options: Options): Plugin {
  const { alias } = options
  const aliases = Object.keys(alias)
  return {
    name: 'alias',
    transform (code: string, id: string) {
      if (extname(id) === '.ts' || queryify(id).lang === 'ts') {
        const ast = parse(code, { sourceType: 'module' })
        traverse.default(ast, {
          ImportDeclaration (path: any) {
            traverse.default(path.node, {
              StringLiteral (path: { node: StringLiteral }) {
                let name = path.node.value
                const matchedAlias = aliases.find(alias => name.startsWith(alias))
                if (matchedAlias) {
                  const aliasPath = alias[matchedAlias]
                  name = name.replace(new RegExp(`^${matchedAlias}`), aliasPath)
                  const tempIds = id.split('/')
                  tempIds.pop()
                  const relativePath = relative(tempIds.join('/'), name)
                  path.node.value = relativePath
                }
              }
            }, path.scope, path)
          }
        })
        code = generator.default(ast)
        // console.log(code)

        return code
      }
    }
  }
}

export default alias
