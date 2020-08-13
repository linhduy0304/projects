
import {countries, Entities } from '../config/Constant'
export const renderCountry = (id) => {
  for(let i of countries) {
    if(i.id === id) {
      return i.name
    }
  }
  return id
}

export const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const renderCate = (data) => {
  if(data != null) {
    var a ='';
    var length= data.length;
    for(var i = 0; i<length; i++) {
      if(i !== length -1) {
        a= a+data[i]+', ';
      }else a = a+data[i]
    }
    return a;
  }else return '';
  
}

export const renderSaleVND = (price, sale) => {
  if(price != null && sale != null) {
    var a = price - Math.floor(price*sale/100);
    let b = a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    // var b = a.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    return b;
  }else return 0;
}

export const renderVND = (data) => {
  if(data != null) {
    let a = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  // var a = data.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    return a;
  }else return 0;
}

export const renderView = (data) => {
  let a = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return a;
}

export const renderHtmlEntities = (string) => {
  var entityMap = Entities;
  for (var key in entityMap) {
      var entity = entityMap[key];
      var regex = new RegExp(entity, 'g');
      string = string.replace(regex, key);
  }
  string = string.replace(/&quot;/g, '"');
  string = string.replace(/&amp;/g, '&');
  return string;
}

export const renderDateTime = (data) => {
  let a = data.split(" ");
  date = a[0].split('-');
  time = a[1].split(':')
  return `${time[0]}:${time[1]} ${date[2]}-${date[1]}-${date[0]}`;
}
