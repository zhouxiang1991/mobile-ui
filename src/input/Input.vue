<template>
  <input
    :class="bem.gen()"
    class="dd1"
  >
  <Common />
</template>

<script setup lang="ts">
import Common from '@/common/Common.vue'
import { Bem } from '@/utils/index'

const bem = new Bem('input')
</script>

<script lang="ts">
export default {
  name: 'ZxInput',
}
</script>

<style lang="less">
@import "../styles/index.less";
@name: zx-input;
.@{name} {
  border: 1px solid red;
  .dd {
    color: red;
  }
}
</style>
