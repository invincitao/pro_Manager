import router from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return router({
    url: '/sys/user/simple'
  })
}

// 获取员工简单列表
export function getEmployeeList(params) {
  return router({
    url: '/sys/user',
    params
  })
}
