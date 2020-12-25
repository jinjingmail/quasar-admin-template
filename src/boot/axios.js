import axios from 'axios'
import Cookies from 'js-cookie'
import { Notify } from 'quasar'

import setting from '@/default-setting'

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
      // 兼容blob下载出错json提示
      if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
        const reader = new FileReader()
        reader.readAsText(error.response.data, 'utf-8')
        reader.onload = function(e) {
          const errorMsg = JSON.parse(reader.result).message
          Notify.create({
            type: 'negative',
            message: errorMsg,
            timeout: 5000
          })
        }
      } else {
        let code = 0
        try {
          code = error.response.data.status
        } catch (e) {
          if (error.toString().indexOf('Error: timeout') !== -1) {
            Notify.create({
              type: 'negative',
              message: '网络请求超时',
              timeout: 5000
            })
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
            const errorMsg = error.response.data.message
            if (errorMsg !== undefined) {
              Notify.create({
                type: 'negative',
                message: errorMsg,
                timeout: 5000
              })
            }
          }
        } else {
          Notify.create({
            type: 'negative',
            message: '接口请求失败',
            timeout: 5000
          })
        }
      }
      return Promise.reject(error)
    }
  )

  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
