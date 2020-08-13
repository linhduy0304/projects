import React from 'react';
import {
  Alert,
  Platform
} from "react-native";
import Const from './Const';
import Store from './Store';

export function delWithAuth(url) {
  return new Store().getSession(Const.TOKEN).then(token => {
    return fetch(
      url, 
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'accessToken': token
        },
        // body: JSON.stringify({})
      }
    ).then(res => {
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
  })
}

export function putWithAuth(url, body) {
  return new Store().getSession(Const.TOKEN).then(token => {
    return fetch(
      url, 
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'accessToken': token
        },
        body: JSON.stringify(body)
      }
    ).then(res => {
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
  })
}

export function put(url, data) {
  return fetch(
    url, 
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
  ).then(res => {
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

export function post(url, data) {
  return fetch(
    url, 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
  ).then(res => {
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

export function postWithAuth(url, body) {
  return new Store().getSession(Const.TOKEN).then(token => {
    return fetch(
      url, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'accessToken': token
        },
        body: JSON.stringify(body)
      }
    ).then(res => {
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
  })
}

export function getWithAuth(url) {
  return new Store().getSession(Const.TOKEN).then(token => {
    return fetch(
      url, 
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'accessToken': token
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
        code: 500
      }
    })
  })
  
}

export function get(url) {
  // if(token) {
  //   headers['accessToken'] = token;
  // }
  return fetch(
    url, 
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
      code: 500
    }
  })
}

