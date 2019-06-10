import request from '@/utils/request'

export function getCoupons (userId) {
  return request({
    url: `/coupon/${userId}/get`,
    method: 'get'
  })
}
