

import {
  FETCH_LOGIN,
  LOGIN_SUCC,
  LOGIN_FAIL,
  DATA_USER,
} from '../actions/actionTypes'

const Store = require('../services/Store').default;
const URL = require('./URL')

import Const from '../services/Const';
import {Actions} from 'react-native-router-flux';
import {put, takeLatest, takeEvery} from 'redux-saga/effects';
import {Api} from './Api';


//load datauser
export function* loadDataUser(action) {
  try {
    const res = yield Api.getHasHeader(`${URL.user}/profile`, action.header);
    if(res.status === 200) {
      yield put({
        type: LOGIN_SUCC,
        data: res.data
      })
      Actions.home({type: 'reset'})
    }else {
      yield put({
        type: LOGIN_FAIL,
      })
    }
  } catch (error) {
    yield put({
      type: LOGIN_FAIL,
    })
  }
}
export function* watchDataUser() {
  yield takeLatest(DATA_USER, loadDataUser)
}

//login
export function* watchLogin() {
  yield takeLatest(FETCH_LOGIN, fetchLogin)
}

export function* fetchLogin(action) {
  const header = {
    'Authorization': action.header
  }
  try {
    const res = yield Api.getHasHeader(`${URL.user}/profile`, header);
    if(res.status === 200) {
      new Store().storeSession(Const.HS_HEADER, header);
      new Store().storeSession(Const.HS_IS_LOGIN, true);
      yield put({
        type: LOGIN_SUCC,
        data: res.data
      })
      Actions.home({type: 'reset'})
    }else {
      yield put({
        type: LOGIN_FAIL,
      })
    }
  } catch (error) {
    yield put({
      type: LOGIN_FAIL,
    })
  }
}