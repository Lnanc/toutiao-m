/**
 * 用户相关的请求模块
 */
import request from "@/utils/request"

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
