import router from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return router({
    url: '/sys/user/simple'
  })
}

// 获取员工列表
export function getEmployeeList(params) {
  return router({
    url: '/sys/user',
    params
  })
}

// 导入员工列表
export function importEmployee(data) {
  return router({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
