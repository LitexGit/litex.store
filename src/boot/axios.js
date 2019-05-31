import axios from 'axios'
import { Notify } from 'quasar'
import config from '../store/config/state'

axios.defaults.timeout = 10000
// axios.defaults.baseURL = process.env.API
axios.defaults.baseURL = config.baseURL

axios.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken()
  // }
  console.log('================config====================')
  console.log(config)
  console.log('================config====================')
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  console.log('================response====================')
  console.log(response)
  console.log('================response====================')
  if (response.status === 200) {
    const { data } = response
    const { code = 0, msg = '', data: res } = data
    if (!code) {
      return Promise.resolve(res)
    }
    Notify.create({ message: msg, position: 'top', type: 'negative', timeout: config.duration })
  } else {
    return Promise.reject(response)
  }
}, error => {
  let status = error.response.status
  switch (status) {
    case 401:
    case 402:
    case 403:
    case 404:
      Notify.create({ message: '网络请求不存在', position: 'top', type: 'negative', timeout: config.duration })
      break
    default:
      Notify.create({ message: error.response.data.message, position: 'top', type: 'negative', timeout: config.duration })
      break
  }
  return Promise.reject(error.response)
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}
