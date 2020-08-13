

import {all, call, fork} from 'redux-saga/effects';
import {watchLogin, watchDataUser} from './login';

export default function* rootSaga() {
  // yield call(watchLogin)
  yield all([
    watchLogin(),
    watchDataUser()
  ]);
  // yield [
  //   fork(watchDataUser),
  //   fork(watchLogin)
  // ]
}