

import {
  LOGIN_REQUEST,
  LOGIN_SUCC,
  LOGIN_FAIL,
  PROFILE_SUCCESS,
  SET_LOGIN,
  UPDATE_REQUEST,
  CITIES_SUCCESS,
  BANKS_SUCCESS,
  COUNTRIES_SUCCESS
} from '../config/types';
import {Actions} from 'react-native-router-flux';
const Auth = require('../services/Auth');
import Store from '../services/Store';
import SimpleToast from 'react-native-simple-toast';
const Const = require('../services/Const');

//getMadeBy
export const getCountriesJsonSuccess = (data) => {
  return {
    type: COUNTRIES_SUCCESS,
    data,
  };
}

export const getCountriesJson = () => {
  return dispatch => {
    return Auth.getCountriesJson()
      .then(res =>  {
        // new Store().storeSession(Const.CITIES, res);
        dispatch(getCountriesJsonSuccess(res.data));
        return;
      })
      .catch((error) => {
        console.log(error)
      });
  };
}

//getBankJson
export const getBankJsonSuccess = (data) => {
  return {
    type: BANKS_SUCCESS,
    data,
  };
}

export const getBankJson = () => {
  return dispatch => {
    return Auth.getBankJson()
      .then(res =>  {
        // new Store().storeSession(Const.CITIES, res);
        dispatch(getBankJsonSuccess(res));
        return;
      })
      .catch((error) => {
        console.log(error)
      });
  };
}

//getCityJson
export const getCityJsonSuccess = (data) => {
  return {
    type: CITIES_SUCCESS,
    data,
  };
}

export const getCityJson = () => {
  return dispatch => {
    return Auth.getCityJson()
      .then(res =>  {
        // new Store().storeSession(Const.CITIES, res);
        dispatch(getCityJsonSuccess(res));
        return;
      })
      .catch((error) => {
        dispatch(getCityJsonSuccess([]));
        console.log(error)
      });
  };
}

//update request when logged
export const updateRequest = (data) => {
  return {
    type: UPDATE_REQUEST,
    data,
  };
}

export const setLogin = (data) => {
  return {
    type: SET_LOGIN,
    data,
  };
}
//profile
export const profileUserSuccess = (data) => {
  return {
    type: PROFILE_SUCCESS,
    data,
  };
}

//forgotPassSuccess
export const forgotPassSuccess = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.forgotPassSuccess(body)
      .then(res =>  {
        switch(res.meta.code) {
          case 1:
            new Store().storeSession(Const.TOKEN, res.data.token);
            new Store().storeSession(Const.IS_LOGIN, true);
            Actions.tab({type: 'reset'});
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.meta.message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}

//forgotPassVerify
export const forgotPassVerify = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.registerOTP(body)
      .then(res =>  {
        switch(res.meta.code) {
          case 1:
            Actions.forgotPassSuccess({email: body.email});
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.meta.message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}

//forgotPassEmail
export const forgotPassEmail = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.registerEmail(body)
      .then(res =>  {
        switch(res.meta.code) {
          case 1:
            Actions.forgotPassVerify({email: body.email});
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.meta.message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}

//registerInfo
export const registerInfo = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.registerInfo(body)
      .then(res =>  {
        switch(res.meta.code) {
          case 1:
            new Store().storeSession(Const.ARR_ID_NOTI, []);
            new Store().storeSession(Const.TOKEN, res.data.token);
            new Store().storeSession(Const.IS_LOGIN, true);
            Actions.tab({type: 'reset'});
            dispatch(profileUserSuccess(res.data.info));
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.meta.message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}

//registerOTP
export const registerOTP = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.registerOTP(body)
      .then(res =>  {
        switch(res.meta.code) {
          case 1:
            Actions.registerInfo({email: body.email});
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.meta.message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}

//otp again
export const otpAgain = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.registerEmail(body)
      .then(res =>  {
        switch(res.meta.code) {
          case 1:
            SimpleToast.show('Đã gửi lại mã xác nhận')
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.meta.message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}

//regiter email
export const registerEmail = (body) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.registerEmail(body)
      .then(res =>  {
        switch(res.meta.code) {
          case 1:
            Actions.registerOTP({email: body.email});
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.meta.message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}

//check Login
export const checkLogin = () => {
  return dispatch => {
    return new Store().getSession(Const.IS_LOGIN).then(is_login => {
      if(is_login) {
        return Auth.getUser().then(res => {
          switch(res.meta.code) {
            case 1:
              dispatch(profileUserSuccess(res.data.info));
              Actions.tab({type: 'reset'})
              return;
            default:
              SimpleToast.show(res.meta.message)
              return;
          }
        })
      }else {
        Actions.tab({type: 'reset'})
      }
    })
  };
}

//submit Login

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  }
}

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCC,
  }
}
export const loginFail = () => {
  return {
    type: LOGIN_FAIL,
    
  }
}
export const login = (data) => {
  return dispatch => {
    dispatch(loginRequest())
    return Auth.login(data)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            new Store().storeSession(Const.ARR_ID_NOTI, []);
            new Store().storeSession(Const.TOKEN, res.data.token);
            new Store().storeSession(Const.IS_LOGIN, true);
            Actions.tab({type: 'reset'})
            dispatch(profileUserSuccess(res.data.info));
            dispatch(loginSuccess());
            return;
          default:
            SimpleToast.show(res.meta.message)
            dispatch(loginFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loginFail())
      });
  };
}


