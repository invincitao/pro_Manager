import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTime } from '@/utils/auth'
import router from '@/router'
// create an axios instance
const checkTimeout = () => {
  const currentTime = (new Date()).getTime()
  const loginTime = getTime()
  const duration = 1000 * 60 * 60 * 2
  return currentTime - loginTime > duration
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// 请求拦截器-注入token
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      if (checkTimeout()) {
        // 销毁数据并返回登录页
        store.dispatch('user/loginOut')
        router.push('/login')
      } else {
        config.headers.Authorization = 'Bearer ' + token
      }
    }
    return config
  })

// 响应拦截器
service.interceptors.response.use(
  res => {
    const { data, success, message } = res.data
    //  完全正确
    if (success) {
      return data
    } else {
      // 账号密码输入不对
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  err => {
    // 请求错误  路径  网络问题
    console.dir(err)
    if (err.response && err.response.data && err.response.data.code === 10002) {
      store.dispatch('user/loginOut')
      router.push('/login')
    } else {
      Message.error(err.messag)
    }
    return Promise.reject(err)
  }
)

export default service
