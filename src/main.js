import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 封装指令，为了防止图片报错
import { imgerr } from '@/directive'
Vue.directive('imgerr', imgerr)

// 全局组件的封装
// import PageTools from '@/components/PageTools'
// Vue.component('PageTools', PageTools)

// 用Vue.use机制注册组件
import Component from '@/components/index.js'
Vue.use(Component)

// 一次性注册大量过滤器
import * as filter from '@/filters/index'

for (const key in filter) {
  const name = key
  const fn = filter[key]
  Vue.filter(name, fn)
}
// 设置element为当前的语言
import i18n from '@/Lang'
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// mixin混入的添加
import mixinObj from '@/mixin'
Vue.mixin(mixinObj)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
