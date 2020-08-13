

let HTTP = require('./HTTP');
let URL = require('./URL');

//productView
export const productView = (id) => {
  return HTTP.put(`${URL.products}view/${id}`, {})
}

// sendQA
export const sendQA = (body) => {
  return HTTP.postWithAuth(`${URL.url}questions/saveQuestion`, body)
}

//get QA getQA
export const getQA = (id) => {
  return HTTP.put(`${URL.url}questions/listByProductId/${id}`, {})
}

//productCategory
export const productCategory = (body, load) => {
  switch(load) {
    case 'filter':
      return HTTP.post(`${URL.products}filterBy`, body)
    case 'category':
      return HTTP.post(`${URL.products}getByCate`, body)
    case 'madeBy':
      return HTTP.post(`${URL.products}getByCountry`, body)
    default: //provider
      return HTTP.post(`${URL.products}getByProvider`, body)
  }
}

//search
export const productDetail = (body) => {
  return HTTP.post(`${URL.products}getByArrId`, body)
}
