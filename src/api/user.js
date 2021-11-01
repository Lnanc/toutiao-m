/**
 * 用户相关的请求模块
 */
import request from "@/utils/request"
// import store from "@/store"
/**
 * 用户登录
 */
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    },
    )
}

/**
 * 发送短信验证
 */
export const getSmsCode = mocile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mocile}`,
        mocile
    })
}
/**
 * 获取用户个人信息
 */

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}
