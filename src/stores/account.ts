import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
  const username = ref('')
  const password = ref('')

  function login(_username: string, _password: string) {
    username.value = _username
    password.value = _password
  }

  function logout() {
    username.value = ''
    password.value = ''
  }

  return { username, password, login, logout }
})
