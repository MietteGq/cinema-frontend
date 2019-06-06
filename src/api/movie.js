import request from '@/utils/request'

export function allMovieOn () {
  return request({
    url: '/movie/all/exclude/off',
    method: 'get'
  })
}
export function movieDetail (id, userId) {
  return request({
    url: `/movie/${id}/${userId}`,
    method: 'get'
  })
}
