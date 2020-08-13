import { Alert } from 'react-native';
import { channel } from 'redux-saga';
import { put, take } from "redux-saga/effects";

import { logoutUser } from "../components/login/action";
import NavigatorService from '../utils/Navigator';

export default ApiUtils = {
  fetchData(url, requestInit, returnOriginResponse) {
    if (!returnOriginResponse) {
      return fetch(url, requestInit)
          .then((response) => handleErrors(response, url, requestInit))
          .then((response) => {
              return response.json();
          });
    }
    return fetch(url, requestInit)
        .then((response) => handleErrors(response, url, requestInit));
  }
}

function handleErrors(response, url, request) {
  if (!response.ok) {
    // If have request return 401: Unauthenticated
    // Logout user to get new token
    if (response.status === 401) {
      apiChannel.put(logoutUser());
      showTokenExpiredDialog();
    }

      console.log('request error:url:', url, request);
    // if (response.text() && typeof response.text() === 'function') {
    //     response.text()
    //         .then(result => {
    //             console.log('request error:result:', result);
    //         })
    // }
    throw Error((response.statusText ? response.statusText : 'Có lỗi xảy ra trong quá trình xử lý!') + response.status);
  }
  return response;
}

function showTokenExpiredDialog() {
  Alert.alert(
    'Thông báo',
    'Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục!',
    [
      { text: "Đóng" },
      { text: "Đăng nhập", onPress: () => NavigatorService.navigate('Login') }
    ]
  )
}

// Create channel by middle-ware redux-saga
// to dispatch redux action 'logoutUser'
export const apiChannel = channel()
export function* watchApiChannel() {
  while (true) {
    const action = yield take(apiChannel)
    yield put(action)
  }
}