import axios from 'axios'

//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: import.meta.env.VITE_BASE_API
})