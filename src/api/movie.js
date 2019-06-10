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
export function movieLike (movieId, userId) {
  return request({
    url: `/movie/${movieId}/like`,
    method: 'post',
    params: {
      userId: userId
    }
  })
}
export function movieUnlike (movieId, userId) {
  return request({
    url: `/movie/${movieId}/unlike`,
    method: 'post',
    params: {
      userId: userId
    }
  })
}
