<template>
  <div
    :class="bem.gen()"
  >
    公用组件
  </div>
</template>
<script setup lang="ts">
import { Bem } from '@/utils'
const bem = new Bem('common')
</script>
<style lang="less">
@import '../styles/vars.less';
@name: zx-common;
.@{name} {
  color: @success;
}
</style>
