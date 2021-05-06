import { login, getUserInfo, getUserDetailById } from '@/api/user.js'
import { getToken, setToken, removeToken, setTime } from '@/utils/auth.js'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 设置token
  setToken(state, data) {
    state.token = data
    setToken(data)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, data) {
    state.userInfo = { ...data }
  },
  removeInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 获取数据设置token
  async login(store, data) {
    try {
      const res = await login(data)
      // const token = res.data.data
      setTime()
      store.commit('setToken', res)
    } catch (error) {
      console.log(error)
    }
  },
  // 获取用户基本信息
  async getUserInfo(store) {
    const simpleData = await getUserInfo()
    const detail = await getUserDetailById(simpleData.userId)
    const data = {
      ...simpleData,
      ...detail
    }
    store.commit('setUserInfo', data)
  },
  // 退出登录
  loginOut(store) {
    store.commit('removeToken')
    store.commit('removeInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

