import _Button from './Button.vue'
import { withInstall } from '@/utils'

const Button = withInstall(_Button)

export { Button }
export * from './button.enum'

declare module 'vue' {
  export interface GlobalComponents {
    ZxButton: typeof Button;
  }
}
