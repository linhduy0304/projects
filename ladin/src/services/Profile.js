

let HTTP = require('./HTTP');
let URL = require('./URL');

//getMoney
export const getMoney = () => {
  return HTTP.getWithAuth(`${URL.user}totalWithDraw`)
}

//cancel order
export const orderCancel = (id) => {
  return HTTP.getWithAuth(`${URL.orders}cancel/${id}`)
}
//takeMoney
export const takeMoney = () => {
  return HTTP.postWithAuth(`${URL.url}requests/saveRequest`)
}

////rate
export const rate = (body) => {
  return HTTP.post(`${URL.products}rate`, body)
}

//orderDetail
export const orderDetail = (id) => {
  return HTTP.getWithAuth(`${URL.orders}getById/${id}`)
}

//saveContact
export const saveContact = (body) => {
  return HTTP.postWithAuth(`${URL.url}contacts/saveRequest`, body)
}

//about
export const getAbout = (body) => {
  return HTTP.post(`${URL.url}helps/getBySlug`, body)
}
// updateAddress
export const updateAddress = (body) => {
  return HTTP.putWithAuth(`${URL.user}updateReceive`, body)
}

//edit Profile
export const editProfile = (body) => {
  return HTTP.postWithAuth(`${URL.user}update`, body)
}
//search
export const listOrder = (page) => {
  return HTTP.getWithAuth(`https://cms.aladin.pea.vn/api/orders?page=${page}`)
}
