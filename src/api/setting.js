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
