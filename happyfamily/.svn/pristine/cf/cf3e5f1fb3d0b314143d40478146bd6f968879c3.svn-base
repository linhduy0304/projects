
'use strict'
import { Alert } from 'react-native';
import {Actions} from 'react-native-router-flux'
import SimpleToast from 'react-native-simple-toast';
const {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAIL,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,

  DELETE_EVENT_SUCCESS,
  EDIT_EVENT_SUCCESS,
  LOAD_DATA_CREATE_EVENT_REQUEST,
  LOAD_DATA_CREATE_EVENT_SUCCESS,
  LOAD_DATA_CREATE_EVENT_FAIL,
  LOAD_DATA_EDIT_EVENT_SUCCESS
} = require('../config/actionTypes');
const Calendar = require('../services/Calendar');

//edit event
export function editEventSuccess(data) {
  return {
    type: EDIT_EVENT_SUCCESS,
    data
  }
}

export function editEvent(body, id) {
  return dispatch => {
    dispatch(addEventRequest());
    return Calendar.editEvent(body, id).then(res => {
      switch(res.status) {
        case 200:
          SimpleToast.show('Cập nhật thành công');
          Actions.pop()
          dispatch(editEventSuccess(res.data));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(addEventFail())
          return;
        default:
          SimpleToast.show(res.error)
          dispatch(addEventFail());
          return;
      }
    })
  }
}

//delete event
export function deleteEventRequest() {
  return {
    type: EVENT_REQUEST,
  }
}

export function deleteEventSuccess(id) {
  return {
    type: DELETE_EVENT_SUCCESS,
    id
  }
}

export function deleteEventFail() {
  return {
    type: EVENT_FAIL,
  }
}

export function deleteEvent(id) {
  return dispatch => {
    dispatch(deleteEventRequest());
    return Calendar.deleteEvent(id).then(res => {
      switch(res.status) {
        case 200:
          dispatch(deleteEventSuccess(id));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(deleteEventFail())
          return;
        default:
          dispatch(eventFail());
          return;
      }
    })
  }
}

//addEvent
export function addEventRequest() {
  return {
    type: ADD_EVENT_REQUEST,
  }
}

export function addEventSuccess(data) {
  return {
    type: ADD_EVENT_SUCCESS,
    data
  }
}

export function addEventFail() {
  return {
    type: ADD_EVENT_FAIL,
  }
}

export function addEvent(body) {
  return dispatch => {
    dispatch(addEventRequest());
    return Calendar.addEvent(body).then(res => {
      switch(res.status) {
        case 200:
          SimpleToast.show('Thêm mới thành công');
          Actions.pop();
          dispatch(addEventSuccess(res.data));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(addEventFail())
          return;
        default:
          SimpleToast.show(res.error)
          dispatch(addEventFail());
          return;
      }
    })
  }
}

//load event
export function eventRequest() {
  return {
    type: EVENT_REQUEST,
  }
}

export function eventSuccess(data) {
  return {
    type: EVENT_SUCCESS,
    data
  }
}

export function eventFail() {
  return {
    type: EVENT_FAIL,
  }
}

export function loadEvent(date) {
  return dispatch => {
    dispatch(eventRequest());
    return Calendar.event(date).then(res => {
      switch(res.status) {
        case 200:
          dispatch(eventSuccess(res.data));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(eventFail())
          return;
        default:
          dispatch(eventFail());
          return;
      }
    })
  }
}

//load event
export function loadDataCreateEventRequest() {
  return {
    type: LOAD_DATA_CREATE_EVENT_REQUEST,
  }
}

export function loadDataCreateEventSuccess(data) {
  return {
    type: LOAD_DATA_CREATE_EVENT_SUCCESS,
    data
  }
}

export function loadDataCreateEventFail() {
  return {
    type: LOAD_DATA_CREATE_EVENT_FAIL,
  }
}

export function loadDataEditEventSuccess(data) {
  return {
    type: LOAD_DATA_EDIT_EVENT_SUCCESS,
    data
  }
}

export function loadDataCreateEvent(event_type) {
  return dispatch => {
    dispatch(loadDataCreateEventRequest());
    return Calendar.loadDataCreateEvent(event_type).then(res => {
      switch(res.status) {
        case 200:
          dispatch(loadDataCreateEventSuccess(res.data));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(loadDataCreateEventFail())
          return;
        default:
          dispatch(loadDataCreateEventFail());
          return;
      }
    })
  }
}

export function loadDataEditEvent(id, event_type) {
  return dispatch => {
    dispatch(loadDataCreateEventRequest());
    return Calendar.loadDataEditEvent(id, event_type).then(res => {
      console.log(res);
      switch(res.status) {
        case 200:
          dispatch(loadDataEditEventSuccess(res.data));
          return;
        case 500: 
          Alert.alert(
            'Thông báo!',
            'Đã có lỗi xảy ra! Vui lòng kiểm tra lại',
            [{text: 'Ok', style: 'cancel'}],
          );
          dispatch(loadDataCreateEventFail())
          return;
        default:
          dispatch(loadDataCreateEventFail());
          return;
      }
    })
  }
}
