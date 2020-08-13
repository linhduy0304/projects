import React from 'react';
import {
  Alert,
  Platform
} from "react-native";

var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
let Constant = require('./Constant');

import RNFetchBlob from 'react-native-fetch-blob'
import {Actions} from "react-native-router-flux";
const StoreService = require('./StoreService').default;
// import Toast from 'react-native-simple-toast';

export function get(url) {
  return new StoreService().getSession(Constant.IP_HEADER_REQUEST)
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
  return new StoreService().getSession(Constant.IP_HEADER_REQUEST)
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

export function postImage(url, title, content, category_ids, atribute_image, tags) {
  return new StoreService().getSession(Constant.IP_HEADER_REQUEST)
  .then((header) => {
    var data = [
      {
        name: 'title',
        data: title
      },
      {
        name: 'content',
        data: content
      },
      // {
      //   name: 'category_ids[]',
      //   data : category_ids
      // },
      // {
      //   name: 'attachment',
      //   filename: 'duy.jpg',
      //   data : RNFetchBlob.wrap(path),
      // },
    ];
    if(category_ids) {
      category_ids.map((id, index) => {
        return data.push({
          name: 'category_ids[]',
          data: id
        })
      })
    }
    if(atribute_image) {
      atribute_image.map((path, index) => {
        return data.push({
          name: 'atribute_image[]',
          filename: 'duyg.jpg',
          data : RNFetchBlob.wrap(path),
        })
        
      })
    }
      return RNFetchBlob.fetch(
          'POST', 
          url, 
          {
            'Authorization' : header.Authorization,
            'Content-Type' : 'multipart/form-data'
          },
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

  //postArticle
  export function postArticle(url, body) {
    return new StoreService().getSession(Constant.IP_HEADER_REQUEST)
    .then((header) => {
      var data = [
        {
          name: 'title',
          data: body.title
        },
        {
          name: 'content',
          data: body.content
        },
        {
          name: 'tags',
          data: body.tags
        },
       
      ];
      if(body.image_upload) {
         data.push({
          name: 'image_upload',
          filename: 'duy.jpg',
          data : RNFetchBlob.wrap(body.image_upload),
        })
      }
      if(body.category_ids) {
        body.category_ids.map((id, index) => {
          return data.push({
            name: 'category_ids[]',
            data: id
          })
        })
      }
      if(body.atribute_image) {
        body.atribute_image.map((path, index) => {
          return data.push({
            name: 'atribute_image[]',
            filename: 'duyg.jpg',
            data : RNFetchBlob.wrap(path),
          })
        })
      }
      if(body.atribute_url_video) {
        body.atribute_url_video.map((url, index) => {
          return data.push({
            name: 'atribute_url_video[]',
            data : url,
          })
        })
      }
      if(body.atribute_link_radio) {
        body.atribute_link_radio.map((url, index) => {
          return data.push({
            name: 'atribute_link_radio[]',
            data : url,
          })
        })
      }
        return RNFetchBlob.fetch(
            'POST', 
            url, 
            {
              'Authorization' : header.Authorization,
              'Content-Type' : 'multipart/form-data'
            },
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
    return new StoreService().getSession(Constant.IP_HEADER_REQUEST)
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


 