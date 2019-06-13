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

export function movieComment (movieId) {
  return request({
    url: '/movieMark/comment',
    method: 'get',
    params: {
      movieId: movieId
    }
  })
}

export function movieMark (movieId) {
  return request({
    url: '/movieMark/average',
    method: 'get',
    params: {
      movieId: movieId
    }
  })
}

export function getTop4 () {
  return request({
    url: '/movieLike/top10',
    method: 'get'
  })
}
