import axios from 'axios'
import Promise from 'core-js'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use()

// 响应拦截器
// response interceptor
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
    Message.error(err.message)
    return Promise.reject(err)
  }
)

export default service
