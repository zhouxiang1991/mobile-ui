import { minify } from 'terser'

/**
 * @param 插件选项。
 * @returns 插件对象。
 */
function mini (): Plugin {
  return {
    name: 'mini',
    renderChunk (code: string): string {
      const res = await minify(code)
      return res.code
    }
  }
}

export default mini
