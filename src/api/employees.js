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
// 添加员工
export function addEmployee(data) {
  return router({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 删除员工
export function delEmployee(id) {
  return router({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}

// 保存员工基本信息
export function saveUserDetailById(data) {
  return router({
    url: '/sys/user/' + data.id,
    method: 'put',
    data
  })
}

// 获取员工的个人信息
export function getPersonalDetail(id) {
  return router({
    url: `/employees/${id}/personalInfo`
  })
}

// 保存员工个人信息
export function updatePersonal(data) {
  return router({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取员工岗位信息
export function getJobDetail(id) {
  return router({
    url: `/employees/${id}/jobs`
  })
}

// 保存员工岗位信息
export function updateJob(data) {
  return router({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

// 给员工分配角色
export function assignRoles(data) {
  return router({
    url: `/sys/user/assignRoles`,
    method: 'put',
    data
  })
}
