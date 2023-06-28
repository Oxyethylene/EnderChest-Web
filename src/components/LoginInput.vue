<script setup lang='ts'>
import { useAccountStore } from '@/stores/account'

const account = useAccountStore()

</script>

<template>
  <el-input v-model='account.username' placeholder='username' />
  <el-input v-model='account.password' placeholder='password' type='password' />
  <el-button>登陆</el-button>
  <el-button>登出</el-button>
</template>

<style scoped>

</style>