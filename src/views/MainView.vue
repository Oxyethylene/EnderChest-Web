<template>
  <el-container>
    <el-aside width='200px'>Aside</el-aside>
    <el-container>
      <el-header>
        <el-button @click='loginVisible = true'>Login</el-button>
        <el-button @click='newLoginVisible = true'>New Login</el-button>
      </el-header>
      <el-main>
        <UploadView />
      </el-main>
    </el-container>
  </el-container>

  <el-dialog
    v-model='loginVisible'
    title='Tips'
    width='30%'
  >
    <LoginInput />
    <template #footer>
      <span class='dialog-footer'>
        <el-button @click='loginVisible = false'>Cancel</el-button>
        <el-button type='primary' @click='loginVisible = false'>
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model='newLoginVisible' title='New Login' width='30%'>
    <el-row :gutter='20'>
      <el-col>
        <el-text>邮箱</el-text>
      </el-col>
      <el-col>
        <el-input v-model='email' placeholder='email' label='邮箱' />
      </el-col>
    </el-row>
    <el-row>
      <el-text>密码</el-text>
      <el-input v-model='password' placeholder='password' type='password' label='邮箱' show-password />
    </el-row>
    <template #footer>
      <span class='dialog-footer'>
    <el-button @click='doLogin'>登陆</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import UploadView from '@/views/UploadView.vue'
import LoginInput from '@/components/LoginInput.vue'
import { useTokenStore } from '@/stores/token'
import { login } from '@/service/LoginService'

const loginVisible = ref(false)

const newLoginVisible = ref(false)
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

<style scoped>
</style>