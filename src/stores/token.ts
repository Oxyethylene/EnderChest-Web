import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('jwt', () => {
  const token = ref('')

  function setToken(_token: string) {
    token.value = _token
  }

  function getToken(): string {
    return token.value
  }

  return { setToken, getToken }
})
