<template>
  <button
    :class="bem.gen({
      modifier: [
        props.type,
        props.size,
      ],
    })"
    @click="onClick"
  >
    <span :class="bem.gen({ block: 'prefix' })"></span>
    <slot>默认按钮</slot>
  </button>
  <Common />
  <!-- <img :src="Echarts"> -->
</template>

<script setup lang="ts">
// import Echarts from '@/assets/echarts.png'
import { PropType } from 'vue'
import { BUTTON_SIZE, BUTTON_TYPE } from './button.enum'
import Common from '@/common/Common.vue'
import { Bem } from '@/utils'

const bem = new Bem('button')

type Type = keyof typeof BUTTON_TYPE
type Size = keyof typeof BUTTON_SIZE

const props = defineProps({
  type: {
    type   : String as PropType<Type>,
    default: BUTTON_TYPE.default as Type,
  },
  size: {
    type   : String as PropType<Size>,
    default: BUTTON_SIZE.normal as Size,
  },
  isAbc: Boolean,
})
const emits = defineEmits(['click'])
const onClick = (event: MouseEvent) => emits('click', event)
</script>

<script lang="ts">
export default {
  name: 'ZxButton',
}
</script>

<style lang="less">
@import "../styles/color.less";
@name: zx-button;
.@{name} {
  display: inline-flex;

  &--primary {
    color: white;
    background: blue;
    border: 1px solid blue;
  }
}
</style>
