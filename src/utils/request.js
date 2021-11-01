// 封装 axios 请求模块

import axios from 'axios'
import store from '@/store'


const request = axios.create({
    baseURL: "http://toutiao.itheima.net"
})

/**
 * 设置请求拦截器
 * 让发送请求前携带token
 */
request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
},function(error){
    return Promise.reject(error)
})

export default request



