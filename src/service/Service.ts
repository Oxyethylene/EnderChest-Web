import axios, { AxiosError } from 'axios'
import { useTokenStore } from '@/stores/token'
import { ElMessage } from 'element-plus'

//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

Service.interceptors.request.use(config => {
  const tokenStore = useTokenStore()
  if (tokenStore != null && tokenStore.getToken() != '') {
    config.headers['Authorization'] = 'Bearer ' + tokenStore.getToken()
  }
  return config
})

Service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.error(error)
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 401) {
        ElMessage.error('登陆失效')
        return Promise.reject()
      }
    }
    return Promise.reject(error)
  })