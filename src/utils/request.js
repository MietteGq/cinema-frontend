import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: '/api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    console.log('send request with config' + JSON.stringify(config))
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(res.message || 'error')
    }
    return res
  },
  error => {
    console.log('err: ' + error)
  }
)

export default service
