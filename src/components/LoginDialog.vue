<script setup lang='ts'>
import { useTokenStore } from '@/stores/token'
import { ref } from 'vue'
import { login } from '@/service/LoginService'

const token = useTokenStore()

const email = ref('')
const password = ref('')

const doLogin = () => {
  login(email.value, password.value)
    .then(response => {
      token.setToken(response.data.data.token)
    })
    .finally()
}
</script>

<template>

</template>

<style scoped>

</style>