import axios from 'axios'
import Cookies from 'js-cookie'
import { Notify } from 'quasar'

import setting from '@/default-setting'

function notifyError(errorMsg, timeout) {
  Notify.create({
    type: 'negative',
    message: errorMsg,
    timeout,
    position: 'bottom',
    actions: [
      { label: '', color: 'yellow', handler: () => { /* ... */ } },
      { label: '关闭', color: 'yellow', handler: () => { /* ... */ } }
    ]
  })
}

console.log('process.env.VUE_APP_BASE_API=', process.env.VUE_APP_BASE_API)
// 创建axios实例
console.log('create axios')
const axiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/quasar-admin-template', // api 的 base_url
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: setting.timeout // 请求超时时间
})

export default ({ app, router, store, Vue }) => {
  console.log('init axios')
  // request拦截器
  axiosInstance.interceptors.request.use(
    config => {
      // eslint-disable-next-line dot-notation
      config.headers['Authorization'] = 'xxx-token' // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Content-Type'] = 'application/json'
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  // response 拦截器
  axiosInstance.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      if (error.response) {
        // 兼容blob下载出错json提示
        if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
          const reader = new FileReader()
          reader.readAsText(error.response.data, 'utf-8')
          reader.onload = function(e) {
            const errorMsg = JSON.parse(reader.result).message
            notifyError(errorMsg, 30 * 1000)
          }
        } else {
          let code = 0
          try {
            code = error.response.data.status
          } catch (e) {
            if (error.toString().indexOf('Error: timeout') !== -1) {
              notifyError('网络请求超时', 5 * 1000)
              return Promise.reject(error)
            }
          }
          console.log(code)
          if (code) {
            if (code === 401) {
              store.dispatch('user/logout').then(() => {
                // 用户登录界面提示
                Cookies.set('point', 401)
                location.reload()
              })
            } else if (code === 403) {
              router.push({ path: '/401' })
            } else {
              if (error && error.response && error.response.data && error.response.data.message) {
                notifyError(error.response.data.message, 30 * 1000)
              } else {
                notifyError('错误：' + JSON.stringify(error), 30 * 1000)
              }
            }
          } else {
            notifyError('接口请求失败', 5 * 1000)
          }
        }
      } else {
        notifyError('网络连接失败')
      }
      return Promise.reject(error)
    }
  )

  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
