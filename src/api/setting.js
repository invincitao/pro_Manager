import request from '@/utils/request'

// 根据id查询企业
export function getCompanyInfo(id) {
  return request({
    url: '/company/' + id
  })
}

// 获取所有角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 删除角色
export function delRole(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

// 根据ID获取角色详情
export function getRoleDetail(id) {
  return request({
    url: '/sys/role/' + id
  })
}

// 更新编辑角色
export function editRole(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}

// 添加角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
