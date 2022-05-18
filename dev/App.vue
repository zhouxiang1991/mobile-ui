<template>
  <div>asfasfs</div>
  <Button type="primary" @click="onClick">按钮</Button>
  <Input />
</template>
<script setup lang="ts">
// import female from '@/asset/female.svg'
import Input from '../src/input/Input.vue'
import Button from '../src/button/Button.vue'
// import { PasswordInput, Radio } from 'vant'

const onClick = (e: MouseEvent) => console.log('click', e)
</script>

<style lang="less">
</style>
