/**
 * 文章接口模块
 */

import request from '@/utils/request'

export const getArticles = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}
/**
 * 获取文章详情
 */

export const getArticleById = (articleID) => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articleID}`
    })
}