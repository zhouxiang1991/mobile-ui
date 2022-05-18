import _Input from './Input.vue'
import { withInstall } from '@/utils'

const Input = withInstall(_Input)

export { Input }
declare module 'vue' {
  export interface GlobalComponents {
    ZxInput: typeof Input;
  }
}
