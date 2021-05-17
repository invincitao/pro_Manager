import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: []
}
const mutations = {
  setRoutes(state, data) {
    state.routes = [...constantRoutes, ...data]
  }
}
const actions = {
  filterRoutes(store, menu) {
    const res = asyncRoutes.filter(route => menu.includes(route.name))
    store.commit('setRoutes', res)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

