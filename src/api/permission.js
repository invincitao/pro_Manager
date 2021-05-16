import router from '@/utils/request'

// 获取所有权限点
export function getPermList(params) {
  return router({
    url: '/sys/permission',
    params
  })
}

// 添加权限点
export function addPerm(data) {
  return router({
    url: '/sys/permission',
    data,
    method: 'post'
  })
}

// 根据id删除权限点
export function delPerm(id) {
  return router({
    url: '/sys/permission/' + id,
    method: 'delete'
  })
}

// 根据ID获取权限点详情
export function getPermById(id) {
  return router({
    url: '/sys/permission/' + id
  })
}

// 根据ID更新权限点详情
export function updatePerm(data) {
  return router({
    url: '/sys/permission/' + data.id,
    method: 'put',
    data
  })
}
