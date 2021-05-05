import { login } from '@/api/user.js'
import { getToken, setToken } from '@/utils/auth.js'
const state = {
  token: getToken()
}
const mutations = {
  // 设置token
  setToken(state, data) {
    state.token = data
    setToken(data)
  },
  removeToken(state) {
    state.token = null
  }
}
const actions = {
  // 获取数据设置token
  async login(store, data) {
    try {
      const res = await login(data)
      // const token = res.data.data
      store.commit('setToken', res)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

