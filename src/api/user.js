import request from '@/utils/request'

// 1、登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

