

let HTTP = require('./HTTP');
let URL = require('./URL');
//getCountriesJson
export const getCountriesJson = () => {
  return HTTP.get('https://cms.aladin.pea.vn/api/home/getCountriesHasProd')
}

//getBankJson
export const getBankJson = () => {
  return HTTP.get('https://cms.aladin.pea.vn/json/banks.json')
}

// getCityJson
export const getCityJson = () => {
  return HTTP.get('https://cms.aladin.pea.vn/json/provinces.json')
}

//getUser
export const getUser = () => {
  return HTTP.getWithAuth(URL.user+'profile')
}

//forgotPassSuccess
export const forgotPassSuccess = (body) => {
  return HTTP.put(URL.user+'fogotPassword', body)
}
//registerInfo
export const registerInfo = (body) => {
  return HTTP.post(URL.user+'register', body);
}

//registerOTP
export const registerOTP = (body) => {
  return HTTP.post(URL.user+'verify', body);
}

//register Email
export const registerEmail = (body) => {
  return HTTP.post(URL.user+'checkMail', body);
}

//login
export function login(data) {
  return HTTP.post(URL.user+'login', data);
}
