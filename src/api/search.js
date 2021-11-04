import request from "@/utils/request"

/**
 * 获取联想建议
 */

export const getLenovoSuggestion = (data) => {
    return request({
        method: "GET",
        url: '/v1_0/suggestion',
        params: {
            q: data
        }
    })
}

/**
 * 获取搜索结果
 */
export const getLenovoResult = (params) => {
    return request({
        method: "GET",
        url: "/v1_0/search",
        params
    })
}