

let HTTP = require('./HTTP');
let URL = require('./URL');

//getShip
export const getShip = (body) => {
  return HTTP.post(`${URL.orders}getShip`, body)
}

//verifyOrder
export const verifyOrder = (body) => {
  return HTTP.postWithAuth(`${URL.orders}saveRequest`, body)
}

//delAddress
export const delAddress = (id) => {
  return HTTP.delWithAuth(`${URL.address}delete/${id}`)
}

//editAddress
export const editAddress = (body, id) => {
  return HTTP.putWithAuth(`${URL.address}update/${id}`, body)
}

// addAddress
export const addAddress = (body) => {
  return HTTP.postWithAuth(`${URL.address}create`, body)
}
//load
export const loadAddress = () => {
  return HTTP.getWithAuth(`${URL.address}list`)
}
