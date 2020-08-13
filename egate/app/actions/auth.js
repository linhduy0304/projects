

import {
  Alert
} from 'react-native';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,

  CHECK_SERVER_SUCCESS,
  CHECK_SECURITY_SUCCESS,
} from '../config/types';
import { Actions } from 'react-native-router-flux';
import Store from '../services/Store';

const Auth = require('../services/Auth');
const Const = require('../services/Const');


//checkSecurity
export const checkSecuritySuccess = (data) => {
  return {
    type: CHECK_SECURITY_SUCCESS,
    data,
  }
}
export const checkSecurity = (token) => {
  return dispatch => {
    return Auth.checkSecurity(token)
      .then(res => {
        console.log(res)
        if(res.status == 200) {
          dispatch(checkSecuritySuccess(res.data.app_pin_code))
        }else {
          return
        }
      })
      .catch((error) => {
        return;
      });
  };
}

//checkSession
export const checkSession = (token) => {
  return dispatch => {
    if(token) {
      return Auth.checkSession(token).then(res => {
        if(res.status != 200) {
          Actions.login({type: 'reset'})
        }
      }).catch((error) => {
        return;
      });
    }else {
      return new Store().getSession(Const.TOKEN).then(token => {
        return Auth.checkSession(token).then(res => {
          if(res.status != 200) {
            Actions.login({type: 'reset'})
          }
        }).catch((error) => {
          return;
        });
      })
    }
  };
}

//forgotPass
export const forgotPass = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.forgotPass(body)
      .then(res => {
        switch(res.status) {
          case 200:
            Actions.registerSuccess({load: 'reset'})
            dispatch(loginSuccess())
            return
          default:
            Alert.alert(
              'Error!',
              res.message,
              [
                {text: 'OK', onPress: () => null},
              ],
            )
            dispatch(loginSuccess())
            return
        }
      })
      .catch((error) => {
         return dispatch(checkServerSuccess())
      });
  };
}

//register
export const register = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.register(body)
      .then(res => {
        switch(res.status) {
          case 200:
            Actions.registerSuccess({load: 'register'})
            dispatch(loginSuccess())
            return;
          default:
            Alert.alert(
              'Error!',
              res.message,
              [
                {text: 'OK', onPress: () => null},
              ],
            )
            dispatch(loginSuccess())
            return
        }
      })
      .catch((error) => {
         return dispatch(checkServerSuccess())
      });
  };
}

//login
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  }
}
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}
export const login = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.login(body)
      .then(res => {
        switch(res.status) {
          case 200:
            dispatch(checkSecurity(res.token))
            // dispatch(checkSession(res.token))
            new Store().storeSession(Const.TOKEN, res.token);
            new Store().storeSession(Const.IS_LOGIN, true);
            
            var a = res.data.wallet;
            var data = []
            Object.keys(a).map(key => {
              return data.push(a[key]);
            });
            Actions.tab({type: 'reset'})
            dispatch(loginSuccess(data))
            return
          default:
            Alert.alert(
              'Error!',
              res.message,
              [
                {text: 'OK', onPress: () => null},
              ],
            )
            dispatch(loginSuccess())
            return
        }
      })
      .catch((error) => {
         return dispatch(checkServerSuccess())
      });
  };
}

//checkLogin
// export const checkLogin = () => {
//   return dispatch => {
//     return new Store().getSession(Const.IS_LOGIN).then(is_login => {
//       if(is_login) {
//         return Auth.getUser().then(res => {
//           switch(res.meta.code) {
//             case 1:
//               dispatch(profileUserSuccess(res.data.info));
//               Actions.tab({type: 'reset'})
//               return;
//             default:
//               SimpleToast.show(res.meta.message)
//               return;
//           }
//         })
//       }else {
//         Actions.login({type: 'reset'})
//       }
//     })
//   };
// }

//check server
export const checkServerSuccess = () => {
  return {
    type: CHECK_SERVER_SUCCESS,
  }
}
export const checkServer = () => {
  return dispatch => {
    return Auth.checkServer()
      .then(res => {
        console.log(res)
        if(res.status === true) {
          Actions.login({type: 'reset'})
          dispatch(checkServerSuccess())
        }else {
          Alert.alert(
            'Error',
            'Not connected to server',
            [
              {text: 'Retry', onPress: () => dispatch(checkServer())},
            ],
          )
          dispatch(checkServerSuccess())
          return
        }
      })
      .catch((error) => {
        dispatch(checkServerSuccess())
        return;
      });
  };
}

