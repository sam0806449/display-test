import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
const Culture = 'Culture'

export function getTokenFromCookie () {
  return '4804f4166c1b41e38509989d7a8ed22f';
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
