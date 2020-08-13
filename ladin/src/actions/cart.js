

import {
  CREATE_ORDER,
  CART_ADDRESS_REQUEST,
  CART_ADDRESS_SUCCESS,
  CART_ADDRESS_FAIL,

  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,

  EDIT_ADDRESS_SUCCESS,

  DELETE_ADDRESS_SUCCESS,
  CART_VERIFY_SUCCESS,
  GET_SHIP_SUCCESS
} from '../config/types';
import {Actions} from 'react-native-router-flux'
import SimpleToast from 'react-native-simple-toast'
const Cart = require('../services/Cart');

//getShip
export const getShipSuccess = (data) => {
  return {
    type: GET_SHIP_SUCCESS,
    data,
  }
}
export const getShip = (body) => {
  return dispatch => {
    return Cart.getShip(body).then(res => {
      // switch(res.meta.code) {
      //   case 1:
      //     // Actions.cartSuccess({type: 'reset'})
      //     dispatch(getShipSuccess(res.data.price));
      //     return;
      //   default:
      //     return;
      // }
    })
    .catch((error) => {
      console.log(error)
    });
  };
}

//verifyOrder
export const verifyOrderSuccess = () => {
  return {
    type: CART_VERIFY_SUCCESS,
  }
}

export const verifyOrder = (body, orders) => {
  return dispatch => {
    dispatch(addAddressRequest());
    return Cart.verifyOrder(body).then(res => {
      switch(res.meta.code) {
        case 1:
          Actions.cartSuccess({type: 'reset', orders: orders})
          dispatch(verifyOrderSuccess());
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(addAddressFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(addAddressFail())
    });
  };
}

//delete addtess

export const delAddressSuccess = (id) => {
  return {
    type: DELETE_ADDRESS_SUCCESS,
    id
  }
}

export const delAddress = (id) => {
  return dispatch => {
    return Cart.delAddress(id).then(res => {
      switch(res.meta.code) {
        case 1:
          dispatch(delAddressSuccess(id));
          return;
        default:
          SimpleToast.show(res.meta.message);
          return;
      }
    })
    .catch((error) => {
      dispatch(addAddressFail())
    });
  };
}

//edit
export const editAddressSuccess = (data, id) => {
  return {
    type: EDIT_ADDRESS_SUCCESS,
    data,
    id,
  }
}

export const editAddress = (body, id) => {
  return dispatch => {
    dispatch(addAddressRequest());
    return Cart.editAddress(body, id).then(res => {
      switch(res.meta.code) {
        case 1:
          Actions.pop();
          dispatch(editAddressSuccess(res.data, id));
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(addAddressFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(addAddressFail())
    });
  };
}

//add
export const addAddressRequest = () => {
  return {
    type: ADD_ADDRESS_REQUEST,
  }
}
export const addAddressSuccess = (data) => {
  return {
    type: ADD_ADDRESS_SUCCESS,
    data,
  }
}
export const addAddressFail = () => {
  return {
    type: ADD_ADDRESS_FAIL,
  }
}
export const addAddress = (body, action) => {
  return dispatch => {
    dispatch(addAddressRequest());
    return Cart.addAddress(body).then(res => {
      switch(res.meta.code) {
        case 1:
          if(action !== 'cart') {
            Actions.pop();
          }else {
            // var shipcode = {
            //   code: renderTypeShip(body.city)
            // }
            // dispatch(getShip(shipcode))
            Actions.cartVerify({data: res.data})
          }
          dispatch(addAddressSuccess(res.data));
          return;
        default:
          SimpleToast.show(res.meta.message);
          dispatch(addAddressFail());
          return;
      }
    })
    .catch((error) => {
      dispatch(addAddressFail())
    });
  };
}

//
export const loadAddressRequest = () => {
  return {
    type: CART_ADDRESS_REQUEST,
  }
}
export const loadAddressSuccess = (data,) => {
  return {
    type: CART_ADDRESS_SUCCESS,
    data,
  }
}

export const loadAddressFail = () => {
  return {
    type: CART_ADDRESS_FAIL,
  }
}

export const loadAddress = () => {
  return dispatch => {
    dispatch(loadAddressRequest())
    return Cart.loadAddress()
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(loadAddressSuccess(res.data));
            return;
          default:
            dispatch(loadAddressFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(loadAddressFail())
      });
  };
}

//update Oders
export const createOder = (data, totalPrice, totalWeight) => {
  return {
    type: CREATE_ORDER,
    data,
    totalPrice, 
    totalWeight
  }
}
