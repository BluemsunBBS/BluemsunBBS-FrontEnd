import axios from 'axios'
import { getToken } from './token'
  
const http = axios.create({
  baseURL: 'http://bbs.wyy.ink:8080',
  timeout: 600000,
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers = {token: localStorage.getItem("token")}
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
},
    (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response?.status >= 400) {
    message.error(error.response.statusText);
  }
  // 请求出错：服务端返回错误状态码
  return Promise.reject(error);
    }
)

export { http }