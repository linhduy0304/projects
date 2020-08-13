

import Const from './Const';
import Store from './Store';

export function post(url, data) {
  return fetch(url, {
    method: "post",
    body: data
  }).then(res => {
    return res.json()
  })
  .then(res => {
    return res
  })
  .catch(error => {
    return {
      code: 500
    }
  })
}

export function getWithAuth(url, token) {
    return fetch(
      url, 
      {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      }
    ).then(res => {
      return res.json()
    })
    .then(res => {
      return res
    })
    .catch(error => {
      return {
        status: 500
      }
    })
}

export function get(url) {
  return fetch(
    url, 
    {
      method: 'GET',
     
    }
  ).then(res => {
    return res.json()
  })
  .then(res => {
    return res
  })
  .catch(error => {
    console.log(error)
    return {
      status: 500
    }
  })
}