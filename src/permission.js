// 引入router
import router from '@/router'
import store from '@/store'
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  // 设置白名单列表
  const writeList = ['/login', '/404']
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
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
