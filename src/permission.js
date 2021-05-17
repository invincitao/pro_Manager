// 引入router
import router from '@/router'
import store from '@/store'
router.beforeEach(async(to, from, next) => {
  const token = store.getters.token
  // 设置白名单列表
  const writeList = ['/login', '/404']
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        const res = await store.dispatch('user/getUserInfo')
        console.log(res)
        const routes = await store.dispatch('permission/filterRoutes', res.roles.menus)
        router.addRoutes(routes)
      }
      next()
    }
  } else {
    if (writeList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
