import { App, ComponentOptions } from 'vue'
import { Button } from './button'
import { Input } from './input'
// import type { WithInstall } from './utils'

export * from './button'
export * from './input'

const version = VERSION

/**
 *
 * @param app vue app实例。
 */
function install (app: App) {
  const components = [
    Button,
    Input,
  ]

  components.forEach((component: ComponentOptions) => {
    app.use(component)
  })
}

const ui = {
  install,
  version,
}

export default ui
