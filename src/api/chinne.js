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