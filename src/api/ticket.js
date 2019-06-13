import request from '@/utils/request'

export function seatStatus (id) {
  return request({
    url: '/ticket/get/occupiedSeats',
    method: 'get',
    params: {
      scheduleId: id
    }
  })
}
export function lockSeat (ticketForm) {
  return request({
    url: '/ticket/lockSeat',
    method: 'post',
    data: ticketForm
  })
}
export function getUserTickets (userId) {
  return request({
    url: `/ticket/get/${userId}`,
    method: 'get'
  })
}

export function buyByVIPCard (ticketId, couponId) {
  return request({
    url: `/ticket/vip/buy`,
    method: 'post',
    params: {
      ids: ticketId,
      couponId: couponId
    }
  })
}

export function buyByCard (ticketId, couponId) {
  return request({
    url: `/ticket/buy`,
    method: 'post',
    params: {
      ids: ticketId,
      couponId: couponId
    }
  })
}

export function getConsume (userId) {
  return request({
    url: `/ticket/consume/${userId}`,
    method: 'get'
  })
}

export function ticketComment (commentForm) {
  return request({
    url: '/ticket/evaluate',
    method: 'post',
    data: commentForm
  })
}

export function ticketReturn (ticketId) {
  return request({
    url: `/ticket/return/${ticketId}`,
    method: 'post'
  })
}
