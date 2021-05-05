import request from '@/utils/request'

// 1、登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 2、获取用户的基本信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 3、获取员工列表
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
