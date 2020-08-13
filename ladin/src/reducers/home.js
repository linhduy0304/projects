import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
  HOME_DETAIL_REQUEST,
  HOME_DETAIL_SUCCESS,
  HOME_DETAIL_FAIL,
} from '../config/types';

const initialState = {
  slides: null,
  loadSlise: null,

  banners: null,
  loadBanner: null,

  categories: null,
  loadCate: null,

  providers: null,
  loadProvider: null,

  hot: null,
  loadHot: null,

  new: null,
  loadNew: null,

  old: null,
  loadOld: null,

  loadMadeBy: null,
  madeBy: null,

  loadDetail: null,
  homeDetail: null,
  categoriesMore: null,
  providersMore: null,
  madeByMore: null,

  loadSale: null,
  sale: null,
}

export default function auth (state = initialState, action) {
  switch(action.type) {
    case HOME_DETAIL_REQUEST:
      var loadDetail = action.load == 'L' ? true : null;
      return {
        ...state,
        loadDetail,
        homeDetail: null,
      }
    case HOME_DETAIL_SUCCESS:
      switch(action.action) {
        case 'categories':
          return {
            ...state,
            categoriesMore: action.data,
            loadDetail: null
          }
        case 'providers':
          return {
            ...state,
            providersMore: action.data,
            loadDetail: null
          }
        case 'madeBy':
          return {
            ...state,
            madeByMore: action.data,
            loadDetail: null
          }
        default: 
          return {
            ...state,
            loadDetail: null,
            homeDetail: action.data,
          }
      }
      
    case HOME_DETAIL_FAIL:
      return {
        ...state,
        loadDetail: null,
      }

    case HOME_REQUEST: 
      switch(action.action) {
        case 'slides':
          return {
            ...state,
            loadSlise: true
          }
        case 'banners':
          return {
            ...state,
            loadBanner: true
          }
        case 'categories':
          return {
            ...state,
            loadCate: true
          }
        case 'providers':
          return {
            ...state,
            loadProvider: true
          }
        case 'madeBy':
          return {
            ...state,
            loadMadeBy: true
          }
        case 'hot':
          return {
            ...state,
            loadProvider: true
          }
        case 'listNew':
          return {
            ...state,
            loadNew: true
          }
        case 'listOld':
          return {
            ...state,
            loadOld: true
          }
        default: 
          return {
            ...state,
            loadSale: true,
          }
      }

    case HOME_SUCCESS: 
      switch(action.action) {
        case 'slides':
          return {
            ...state,
            slides: action.data,
            loadSlise: null
          }
        case 'banners':
          return {
            ...state,
            banners: action.data,
            loadBanner: null
          }
        case 'categories':
          return {
            ...state,
            categories: action.data,
            loadCate: null
          }
        case 'providers':
          return {
            ...state,
            providers: action.data,
            loadProvider: null
          }
        case 'madeBy':
          return {
            ...state,
            madeBy: action.data,
            loadMadeBy: null
          }
        case 'hot':
          return {
            ...state,
            hot: action.data,
            loadHot: null
          }
        case 'listNew':
          return {
            ...state,
            new: action.data,
            loadNew: null
          }
        case 'listOld':
          return {
            ...state,
            old: action.data,
            loadOld: null
          }
        default: 
          return {
            ...state,
            loadSale: null,
            sale: action.data,
          }
      }
    case HOME_FAIL: 
      switch(action.action) {
        case 'slides':
          return {
            ...state,
            slides: [],
            loadSlise: null
          }
        case 'banners':
          return {
            ...state,
            banners: [],
            loadBanner: null
          }
        case 'categories':
          return {
            ...state,
            categories: [],
            loadCate: null
          }
        case 'providers':
          return {
            ...state,
            providers: [],
            loadProvider: null
          }
        case 'madeBy':
          return {
            ...state,
            madeBy: [],
            loadMadeBy: null
          }
        case 'hot':
          return {
            ...state,
            hot: [],
            loadHot: null
          }
        case 'listNew':
          return {
            ...state,
            new: [],
            loadNew: null
          }
        default: 
          return {
            ...state,
            sale: [],
            loadSale: null,
          }
      }
    default: 
      return state
  }
}