import Cookies from 'js-cookie'
// 设置token，时间戳值存在Cookie
const TokenKey = 'HR_token'
const TimeKey = 'HR_timekey'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 设置时间戳
export function getTime() {
  return Cookies.get(TimeKey)
}

export function setTime() {
  const date = new Date()
  return Cookies.set(TimeKey, date.getTime())
}
