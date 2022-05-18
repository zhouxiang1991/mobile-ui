import { App } from 'vue'

/**
 * @param options 组件选项。
 * @returns 添加install方法后的组件选项。
 */
export function withInstall<T> (options: T) {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options as unknown as { name: string }

    if (name) {
      app.component(name, options)
    }
  }

  return options as T
}
