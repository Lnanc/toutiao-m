import request from '@/utils/request';

/**
 * 请求所有频道列表
 */

export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

/**
 * 设置用户频道列表
 */
export const setUserChannerls = (channel) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}

/**
 * 删除指定用户频道
 */
export const deleteChannerl = (channelId) => {
    return request({
        method: "DELETE",
        url: `/v1_0/user/channels/${channelId}`
    })
}