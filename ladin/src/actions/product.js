

import {
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  QA_REQUEST,
  QA_SUCCESS,
  QA_FAIL,
  SEND_QA_SUCCESS
} from '../config/types';
import SimpleToast from 'react-native-simple-toast';

const Const = require('../services/Const');
const Product = require('../services/Product');

//productView
export const productView = (id) => {
  return dispatch => {
    return Product.productView(id)
      .then(res => {
        // console.log(res)
      })
      .catch((error) => {
        console.log(error)
      });
  };
}
//sendQuestion
export const sendQASuccess = (data) => {
  return {
    type: SEND_QA_SUCCESS,
    data,
  }
}
export const sendQuestion = (id) => {
  return dispatch => {
    dispatch(QARequest())
    return Product.sendQA(id)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(sendQASuccess(res.data));
            return;
          default:
            dispatch(QAFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(productDetailFail())
      });
  };
}

//getHome
export const QARequest = () => {
  return {
    type: QA_REQUEST,
  }
}
export const QASuccess = (data) => {
  return {
    type: QA_SUCCESS,
    data,
  }
}

export const QAFail = () => {
  return {
    type: QA_FAIL,
  }
}

export const getQA = (id) => {
  return dispatch => {
    dispatch(QARequest())
    return Product.getQA(id)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(QASuccess(res.data));
            return;
          default:
            dispatch(QAFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(productDetailFail())
      });
  };
}

//getHome
export const productCategoryRequest = () => {
  return {
    type: PRODUCT_CATEGORY_REQUEST,
  }
}
export const productCategorySuccess = (data) => {
  return {
    type: PRODUCT_CATEGORY_SUCCESS,
    data,
  }
}

export const productCategoryFail = () => {
  return {
    type: PRODUCT_CATEGORY_FAIL,
  }
}

export const productCategory = (body, load) => {
  return dispatch => {
    dispatch(productCategoryRequest())
    return Product.productCategory(body, load)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(productCategorySuccess(res.data));
            return;
          default:
            dispatch(productCategoryFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(productCategoryFail())
      });
  };
}

//getHome
export const productDetailRequest = () => {
  return {
    type: PRODUCT_DETAIL_REQUEST,
  }
}
export const productDetailSuccess = (data) => {
  return {
    type: PRODUCT_DETAIL_SUCCESS,
    data,
  }
}

export const productDetailFail = () => {
  return {
    type: PRODUCT_DETAIL_FAIL,
  }
}

export const productDetail = (body, action = 'L') => {
  return dispatch => {
    if(action == 'L') {
      dispatch(productDetailRequest())
    }
    return Product.productDetail(body)
      .then(res => {
        switch(res.meta.code) {
          case 1:
            dispatch(productDetailSuccess(res.data[0]));
            return;
          default:
            dispatch(productDetailFail());
            return;
        }
      })
      .catch((error) => {
        dispatch(productDetailFail())
      });
  };
}