

let HTTP = require('./HTTP');
let URL = require('./URL');

//search
export const search = (body) => {
  return HTTP.post(`${URL.products}search`, body)
}
