import { App } from 'vue'
import { Button } from './button'
import { Input } from './input'
// import type { WithInstall } from './utils'

export * from './button'
export * from './input'

const version = VERSION
function install (app: App) {
  const components = [
    Button,
    Input
  ]
  components.forEach((component: any) => {
    app.use(component)
  })
}

const ui = {
  install,
  version
}

export default ui
