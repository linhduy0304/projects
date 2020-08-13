

let HTTP = require('./HTTP');
let URL = require('./URL');

//getHomeMore
export const getHomeMore = (action, page) => {
  switch(action) {
    case 'listNew':
    case 'listSale':
    case 'hot':
      return HTTP.get(`${URL.products}${action}?page=${page}`)
    case 'listOld':
      return HTTP.get(`${URL.products}list_secondhand?page=${page}`)
    case 'madeBy':
      return HTTP.get(`https://cms.aladin.pea.vn/json/origins.json`)
      default:
      return HTTP.get(`${URL.url}${action}?page=${page}`)
  }
}
//gethome
export const getHome = (action) => {
  switch(action) {
    case 'slides':
    case 'banners':
      return HTTP.get(`${URL.url}${action}`);
    case 'categories':
      return HTTP.get(`${URL.home}getCate`)
    // getProvidera
    case 'providers':
      return HTTP.get(`${URL.home}getProvider`)
    case 'madeBy':
      return HTTP.get(`${URL.home}countries`)
    //hot
    case 'hot':
      return HTTP.get(`${URL.home}hot`)
    case 'listNew':
      return HTTP.get(`${URL.home}listNew`)
    case 'listOld':
      return HTTP.get(`${URL.products}list_secondhand`)

    default: //list sale
      return HTTP.get(`${URL.home}listSale`)
  }
}
