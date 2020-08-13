import React from 'react';
import {
  Alert,
  Platform
} from "react-native";

let Constant = require('./Constant');

import RNFetchBlob from 'react-native-fetch-blob'
const Store = require('./Store').default;

export function get(url) {
  return new Store().getSession(Constant.HF_HEADER_REQUEST)
  .then((header) => {
      return fetch(url,
        {
          method: "GET",
          headers: header
        }
      )
      .then(function(response) {
        return response.json()
      })
      .then(function(res) {
        return res
      })
      .catch(function(error) {
        return {
          status: 500
        }
      });
  });
}

export function getHasHeader(url, header) {
    return fetch(url,
      {
        method: "GET",
        headers: header
      }
    )
    .then(function(response) {
      return response.json()
    })
    .then(function(res) {
      return res
    })
    .catch(function(error) {
      return {
        status: 500
      }
    });
}

export function post(url, values) {
  if (typeof values === 'undefined' || values == undefined) {
    values = {};
  }
  values['platform'] = (Platform.OS == 'ios') ? 'ios' : 'android';
  return fetch(url,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    }
  )
  .then(function(response) {
    return response.json()
  })
  .then(function(res) {
    return res
  })
  .catch(function(error) {
    return {
      status: 500
    }
  });
}

export function postWithAuth(url, values) {
  if (typeof values === 'undefined' || values == undefined) {
    values = {};
  }
  values['platform'] = (Platform.OS == 'ios') ? 'ios' : 'android';
  return new Store().getSession(Constant.HF_HEADER_REQUEST)
  .then((header) => {
      return fetch(url,
        {
          method: "POST",
          headers: header,
          body: JSON.stringify(values)
        }
      )
      .then(function(response) {
        return response.json()
      })
      .then(function(res) {
        return res
      })
      .catch(function(error) {
        return {
          status: 500
        }
      });
  });
}

export function postImage(url, image) {
  return new Store().getSession(Constant.HF_HEADER_REQUEST)
  .then((header) => {
      var data = [];
      if(image) {
        image.map((path, index) => {
          return data.push({
            name: 'images[]',
            filename: 'duyg.jpg',
            data : RNFetchBlob.wrap(path),
          })
          
        })
      }
      return RNFetchBlob.fetch(
        'POST', 
        url,
        header,
        data
          
        ).then(function(res) {
          return res.json()
        })
        .then(function(response) {
          return response
        })
        .catch(function(error) {
          return {
            status: 500
          }
      });
  });}

  

    //update avatar
  export function updateAvatar(url, path) {
    return new Store().getSession(Constant.HF_HEADER_REQUEST)
    .then((header) => {
      return RNFetchBlob.fetch(
          'POST', 
          url, 
          {
            'Authorization' : header.Authorization,
            'Content-Type' : 'multipart/form-data'
          },
          [{
            name: 'avatar',
            data: RNFetchBlob.wrap(path),
            filename: 'duyg.jpg',
          }],
          
        ).then(function(res) {
          return res.json()
        })
        .then(function(response) {
          return response
        })
        .catch(function(error) {
          return {
            status: 500
          }
      });
    });}


 