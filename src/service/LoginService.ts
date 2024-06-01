import { Service } from '@/service/Service'

export function login(email: string, password: string) {
  return Service({
    url: '/login',
    method: 'post',
    data: {
      email: email,
      password: password,
    },
  })
}