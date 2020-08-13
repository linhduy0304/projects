

let HTTP = require('./HTTP');
let URL = require('./URL');

//getCountNoti
export const getCountNoti = () => {
  return HTTP.getWithAuth(`${URL.notify}/count-by-status/1`)
}

//notify
export const loadNoti = (page) => {
  return HTTP.getWithAuth(`${URL.notify}?page=${page}`)
}

// notiDetail
export const notiDetail = (id) => {
  return HTTP.getWithAuth(`${URL.notify}/${id}`)
}
