import request from '@/utils/request'

export function getVIPCard (userId) {
  return request({
    url: `/vip/${userId}/get`,
    method: 'get'
  })
}

export function buyByVIPCard (ticketId, couponId) {
  return request({
    url: `/ticket/vip/buy`,
    method: 'post',
    params: {
      ticketId: ticketId,
      couponId: couponId
    }
  })
}
