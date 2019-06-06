import request from '@/utils/request'

export function movieSchedule (id) {
  return request({
    url: '/schedule/search/audience',
    method: 'get',
    params: {
      movieId: id
    }
  })
}
export function idSchedule (id) {
  return request({
    url: `/schedule/${id}`,
    method: 'get'
  })
}
