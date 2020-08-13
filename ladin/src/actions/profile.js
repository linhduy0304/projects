

import {
  ABOUT_REQUEST,
  ABOUT_SUCCESS,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  SAVE_CONTACT_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  TAKE_MONEY_REQUEST,
  TAKE_MONEY_SUCCESS,
  TAKE_MONEY_FAIL,
  ORDER_CANCEL_SUCCESS,
  GET_MONEY_SUCCESS,
  SAVE_CONTACT_REQUEST
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux';

const Profile = require('../services/Profile');

//order cancel
export const orderCancelSuccess = (id) => {
  return {
    type: ORDER_CANCEL_SUCCESS,
    id
  }
}
export const orderCancel = (id) => {
  return dispatch => {
    dispatch(takeMoneyRequest());
    return Profile.orderCancel(id).then(res => {
      switch(res.meta.code) {
        case 1:
          dispatch(orderCancelSuccess(id));
          Actions.pop()
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(takeMoneyFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(takeMoneyFail())
    });
  };
}

//rate
export const rate = (body) => {
  return dispatch => {
    return Profile.rate(body)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            SimpleToast.show('Đánh giá sản phẩm thành công')
            return;
          default:
            // dispatch(QAFail());
            return;
        }
      })
      .catch((error) => {
      });
  };
}

//takeMoney
export const takeMoneyRequest = () => {
  return {
    type: TAKE_MONEY_REQUEST,
  }
}
export const takeMoneylSuccess = (data, pending_money) => {
  return {
    type: TAKE_MONEY_SUCCESS,
    data,
    pending_money
  }
}
export const takeMoneyFail = () => {
  return {
    type: TAKE_MONEY_FAIL,
  }
}
export const takeMoney = () => {
  return dispatch => {
    dispatch(takeMoneyRequest());
    return Profile.takeMoney().then(res => {
      switch(res.meta.code) {
        case 1:
          SimpleToast.show('Gửi yêu cầu rút tiền thành công');
          dispatch(takeMoneylSuccess(res.meta.paid_money, res.meta.pending_money));
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(takeMoneyFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(takeMoneyFail())
    });
  };
}

//orderDetail
export const orderDetailRequest = () => {
  return {
    type: ORDER_DETAIL_REQUEST,
  }
}
export const orderDetailSuccess = (data) => {
  return {
    type: ORDER_DETAIL_SUCCESS,
    data
  }
}
export const orderDetail = (id) => {
  return dispatch => {
    dispatch(orderDetailRequest());
    return Profile.orderDetail(id).then(res => {
      switch(res.meta.code) {
        case 1:
          dispatch(orderDetailSuccess(res.data[0]));
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(orderFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(orderFail())
    });
  };
}

// getAbout
export const saveContactRequest = () => {
  return {
    type: SAVE_CONTACT_REQUEST,
  }
}
export const saveContactSuccess = () => {
  return {
    type: SAVE_CONTACT_SUCCESS,
  }
}
export const saveContact = (body) => {
  return dispatch => {
    dispatch(saveContactRequest());
    return Profile.saveContact(body).then(res => {
      switch(res.meta.code) {
        case 1:
          SimpleToast.show('Gửi yêu cầu thành công');
          Actions.pop()
          dispatch(saveContactSuccess());
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(orderFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(orderFail())
    });
  };
}

// getAbout
export const getAboutRequest = () => {
  return {
    type: ABOUT_REQUEST,
  }
}
export const aboutSuccess = (data) => {
  return {
    type: ABOUT_SUCCESS,
    data
  }
}
export const getAbout = (body) => {
  return dispatch => {
    dispatch(getAboutRequest());
    return Profile.getAbout(body).then(res => {
      switch(res.meta.code) {
        case 1:
          dispatch(aboutSuccess(res.data));
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(orderFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(orderFail())
    });
  };
}

//editprofile
export const updateAddressRequest = () => {
  return {
    type: UPDATE_ADDRESS_REQUEST,
  }
}
export const updateAddressSuccess = () => {
  return {
    type: UPDATE_ADDRESS_SUCCESS,
    data,
  }
}
export const updateAddressFail = () => {
  return {
    type: UPDATE_ADDRESS_FAIL,
  }
}
export const updateAddress = (body) => {
  return dispatch => {
    dispatch(updateAddressRequest());
    return Profile.updateAddress(body).then(res => {
      switch(res.meta.code) {
        case 1:
          dispatch(updateAddressSuccess());
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(updateAddressFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(updateAddressFail())
    });
  };
}

//editprofile
export const editProfileRequest = () => {
  return {
    type: EDIT_PROFILE_REQUEST,
  }
}
export const editProfileSuccess = (data) => {
  return {
    type: EDIT_PROFILE_SUCCESS,
    data,
  }
}
export const editProfileFail = () => {
  return {
    type: EDIT_PROFILE_FAIL,
  }
}
export const editProfile = (body) => {
  return dispatch => {
    dispatch(editProfileRequest());
    return Profile.editProfile(body).then(res => {
      switch(res.meta.code) {
        case 1:
          Actions.pop();
          dispatch(editProfileSuccess(res.data.info));
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(editProfileFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(editProfileFail())
    });
  };
}

//getHome
export const orderRequest = (action) => {
  return {
    type: ORDER_REQUEST,
    action,
  }
}
export const orderSuccess = (data, action) => {
  return {
    type: ORDER_SUCCESS,
    data,
    action
  }
}
export const orderFail = () => {
  return {
    type: ORDER_FAIL,
  }
}

export const getMoneySuccess = (data) => {
  return {
    type: GET_MONEY_SUCCESS,
    data
  }
}

export const getMoney = () => {
  return dispatch => {
    return Profile.getMoney().then(res => {
      switch(res.meta.code) {
        case 1:
          dispatch(getMoneySuccess(res.data));
          return;
        default:
          return;
      }
    })
    .catch((error) => {
    });
  };
}

export const listOrder = (action = 'L', page = 1) => {
  return dispatch => {
    dispatch(orderRequest(action));
    dispatch(getMoney())
    return Profile.listOrder(page).then(res => {
      switch(res.meta.code) {
        case 1:
          dispatch(orderSuccess(res.data, action));
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(orderFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(orderFail())
    });
  };
}


