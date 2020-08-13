

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

const initialState = {
  loadQA: null,
  loading: null,
  productDetail: null,
  productCategory: null,
  qa: null,
}

export default function search (state = initialState, action) {
  switch(action.type) {

    // sendQA
    case SEND_QA_SUCCESS:
      var newQA = state.qa;
      newQA.unshift(action.data)
      return {
        ...state,
        loadQA: null,
        qa: newQA
      }

    //get qa
    case QA_REQUEST: 
      return {
        ...state,
        loadQA: true
      }
    case QA_SUCCESS:
      return {
        ...state,
        loadQA: null,
        qa: action.data
      }
    case QA_FAIL:
      return {
        ...state,
        loadQA: null,
      }

    //product category
    case PRODUCT_CATEGORY_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: null,
        productCategory: action.data
      }
    case PRODUCT_CATEGORY_FAIL:
      return {
        ...state,
        loading: null,
      }

    //detail 
    case PRODUCT_DETAIL_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: null,
        productDetail: action.data
      }
    default: 
      return state
  }
}