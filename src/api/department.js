import request from '@/utils/request'

// 获取企业部门列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除部门 /company/department
export function delDepartments(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
// 添加部门 /company/department
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 根据id获取部门详情
export function getDepartDetail(id) {
  return request({
    url: '/company/department/' + id
  })
}

// 编辑部门
export function editDepartDetail(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}
