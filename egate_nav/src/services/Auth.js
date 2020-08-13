

let HTTP = require('./HTTP');
let URL = require('./URL');

//checkSecurity
export const checkSecurity = (token) => {
  return HTTP.getWithAuth(`${URL.account}security`, token)
}

//checkSession
export const checkSession = (token) => {
  return HTTP.getWithAuth(`${URL.account}check-session`, token)
}

//forgot pass
export const forgotPass = (body) => {
  return HTTP.post(`${URL.user}reset-password`, body)
}

//register
export const register = (body) => {
  return HTTP.post(`${URL.user}signup`, body)
}

//login
export const login = (body) => {
  return HTTP.post(`${URL.user}signin`, body)
}

//check serVer
export const checkServer = () => {
  return HTTP.get(`${URL.user}index`)
}