import { OutputPlugin } from 'rollup'
import { resolve } from 'path'
import { copyFileSyncPro } from './utils'

type Options = {
  assetsPath: string | ((assetPath: string) => string)
}

export const ASSET_EXTS = ['.png', '.jpg', '.jpeg', '.svg', '.bmp', '.gif']

/**
 * @param 插件选项。
 * @returns 插件对象。
 */
function copyAsset (options: Options): OutputPlugin {
  const { assetsPath } = options
  return {
    name: 'copyAsset',
    renderChunk (code: string, chunk: any): string {
      chunk.imports.forEach((importItem: string) => {
        if (ASSET_EXTS.some(ext => importItem.endsWith(ext))) {
          const filename = importItem.split('/').pop() as string
          let distPath
          if (typeof assetsPath === 'string') {
            distPath = resolve(assetsPath, filename)
          } else {
            distPath = assetsPath(importItem)
          }
          copyFileSyncPro(importItem, distPath)
        }
      })

      return code
    }
  }
}

export default copyAsset
