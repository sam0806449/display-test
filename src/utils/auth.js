import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
const Culture = 'Culture'

export function getTokenFromCookie () {
  return Cookies.get(TokenKey);
}

export function setTokenFromCookie (token) {
  return Cookies.set(TokenKey, token);
}

export function removeTokenFromCookie () {
  return Cookies.remove(TokenKey);
}

export function getCultureFromCookie () {
  return Cookies.get(Culture);
}

export function setCultureFromCookie (culture) {
  return Cookies.set(Culture, culture);
}

export function removeCulture () {
  return Cookies.remove(Culture);
}
