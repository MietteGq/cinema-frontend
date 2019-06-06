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
