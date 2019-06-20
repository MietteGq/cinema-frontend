import request from '@/utils/request'

export function getVIPCard (userId) {
  return request({
    url: `/vip/${userId}/get`,
    method: 'get'
  })
}

export function addVIPCard (userId) {
  return request({
    url: '/vip/add',
    method: 'post',
    params: {
      userId: userId
    }
  })
}

export function getVIPInfo () {
  return request({
    url: '/vip/getVIPInfo',
    method: 'get'
  })
}

export function chargeVIP (vipId, amount) {
  return request({
    url: '/vip/charge',
    method: 'post',
    data: {
      vipId: parseInt(vipId),
      amount: parseInt(amount)
    }
  })
}

export function record (userId) {
  return request({
    url: `/vip/record/${userId}`,
    method: 'get'
  })
}

export function recordCharge (userId, amount) {
  return request({
    url: `/vip/${userId}/record`,
    method: 'post',
    params: {
      amount: amount
    }
  })
}
