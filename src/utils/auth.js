import Cookies from 'js-cookie'

const TokenKey = 'gq_cinema_token'

export function setUserId (userId) {
  return Cookies.set(TokenKey, userId)
}

export function getUserId () {
  return Cookies.get(TokenKey)
}

export function removeUserId () {
  return Cookies.remove(TokenKey)
}
