'use strict';
const {
    EXPLORE_REQUEST,
    EXPLORE_SUCCESS,
    EXPLORE_FAIL,
    EX_RELATE_REQUEST,
    EX_RELATE_SUCCESS,
    EX_RELATE_FAIL,
    EX_DETAIL_REQUEST,
    EX_DETAIL_SUCCESS,
    EX_DETAIL_FAIL,
    HOT_DEBATE_REQUEST,
    HOT_DEBATE_SUCCESS,
    HOT_DEBATE_FAIL,
    HOT_DEBATE_FOLLOW_REQUEST,
    HOT_DEBATE_FOLLOW_SUCCESS,
    HOT_DEBATE_FOLLOW_FAIL,
    REVIEW_REQUEST,
    REVIEW_SUCCESS,
    REVIEW_FAIL,
    LOAD_MORE_REVIEW_REQUEST,
    LOAD_MORE_REVIEW_SUCCESS,
    LOAD_MORE_REVIEW_FAIL,
  } = require('../libs/actionTypes');
import Constant from '../services/Constant';
const StoreService = require('../services/StoreService').default;
const Explore = require('../services/Explore');
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';

//loadmore review
export function loadMoreReviewRequest() {
  return {
    type: LOAD_MORE_REVIEW_REQUEST
  };
}

export function loadMoreReviewSuccess(data) {
  return {
    type:  LOAD_MORE_REVIEW_SUCCESS,
    data: data
  };
}
export function loadMoreReviewFail(error) {
  return {
    type: LOAD_MORE_REVIEW_FAIL,
    error: error
  };
}
export function  loadMoreReview(id, page) {
  return dispatch => {
    dispatch(loadMoreReviewRequest());
    Explore.loadMoreReview(id, page)
      .then((res) => {
        switch(res.status) {
          case 200:
            dispatch(loadMoreReviewSuccess(res.user_raties));
            return;
          case 500: 
            Actions.login({type: 'reset'});
            return;
          default:
            Toast.show(res.errors)
            dispatch(loadMoreReviewFail(res.errors));
            return;
        }
      })
      .catch((error) => {
        dispatch(loadMoreReviewFail());
      });
  };
}

//review product
export function reviewRequest() {
  return {
    type: REVIEW_REQUEST
  };
}

export function reviewSuccess(data) {
  return {
    type:  REVIEW_SUCCESS,
    data: data
  };
}
export function reviewFail(error) {
  return {
    type: REVIEW_FAIL,
    error: error
  };
}
export function review(content, product_id, raty_score, name = '') {
  return dispatch => {
    dispatch(reviewRequest());
    Explore.review(content, product_id, raty_score, name)
      .then((res) => {
        switch(res.status) {
          case 200:
            dispatch(reviewSuccess(res.data));
            return;
          case 500: 
            Actions.login({type: 'reset'});
            return;
          default:
            Toast.show(res.errors)
            dispatch(reviewFail(res.errors));
            return;
        }
      })
      .catch((error) => {
        dispatch(reviewFail());
      });
  };
}

//hotdebate Detail

export function hotDebateRequest() {
  return {
    type: HOT_DEBATE_REQUEST,
  }
}

export function hotDebateSuccess(data) {
  return {
    type: HOT_DEBATE_SUCCESS,
    data: data,
  }
}

export function hotDebateFail() {
  return {
    type: HOT_DEBATE_FAIL,
  }
}


export  function loadHotDebate(id) {
  return dispatch => {
    dispatch(hotDebateRequest());
    Explore.loadHotDebate(id).then( (res) => {
      switch(res.status) {
        case 200:
          dispatch(hotDebateSuccess(res.data))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(hotDebateFail());
          return;
      }
    }).catch((error) => {
      return dispatch(hotDebateFail());
    });
  }
}

//followHotDebate

export function hotDebateFollowRequest(isFollow) {
  return {
    type: HOT_DEBATE_FOLLOW_REQUEST,
    data: {isFollow: isFollow}
  }
}
export function hotDebateFollowSuccess(data) {
  return {
    type: HOT_DEBATE_FOLLOW_SUCCESS,
    data: data
  }
}
export function hotDebateFollowFail() {
  return {
    type: HOT_DEBATE_FOLLOW_FAIL,
  }
}

export function followHotdebate(id, isFollow) {
  return dispatch => {
    dispatch(hotDebateFollowRequest(isFollow));
    Explore.followHotdebate(id)
    .then( (res) => {
      switch(res.status) {
        case 200:
          dispatch(hotDebateFollowSuccess(res.data))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(hotDebateFollowFail());
          return;
      }
    }).catch((error) => {
      return dispatch(hotDebateFollowFail());
    });
  }
}

//laod Detail
export function loadDetailRequest() {
  return {
    type: EX_DETAIL_REQUEST,
  };
}
export function loadDetailSuccess(data, relate, firstLoad) {
  return {
    type: EX_DETAIL_SUCCESS,
    data: data,
    relate: relate,
    firstLoad: firstLoad,
  };
}
export function loadDetailFail() {
  return {
    type: EX_DETAIL_FAIL,
  };
}

export function loadDetail(id, type, firstLoad) {
  return dispatch => {
    // dispatch(exRelateRequest());
    return Explore.loadDetail(id, type).then((res) => {
      switch(res.status) {
        case 200:
          if(res.data.categories.length > 0) {
            Explore.exploreRelate(res.data.categories[0].id, res.data.id, type).then((relate) => {
              if(relate.status == 200) {
                dispatch(loadDetailSuccess(res.data, relate.data, firstLoad))
              }else dispatch(loadDetailFail());
            })
          }else dispatch(loadDetailSuccess(res.data))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(loadDetailFail());
          return;
      }
    }).catch((err) => {
      return dispatch(loadDetailFail())
    })
  }
}

//explore Relate
export function exRelateRequest() {
  return {
    type: EX_RELATE_REQUEST,
  };
}
export function exRelateSuccess(data) {
  return {
    type: EX_RELATE_SUCCESS,
    data: data
  };
}
export function exRelateFail() {
  return {
    type: EX_RELATE_FAIL,
  };
}

export function exploreRelate(id, productId, type) {
  return dispatch => {
    dispatch(exRelateRequest());
    return Explore.exploreRelate(id, productId, type).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(exRelateSuccess(res.data))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(exRelateFail());
          return;
      }
    }).catch((err) => {
      return dispatch(exRelateFail())
    })
  }
}

//load explore
export function exploreRequest() {
  return {
    type: EXPLORE_REQUEST
  };
}

export function exploreSuccess(action, explore, exTrending, exHotDebate) {
  return {
    type: EXPLORE_SUCCESS,
    explore: explore,
    exTrending: exTrending,
    exHotDebate: exHotDebate,
    action: action
  };
}
export function exploreFail() {
  return {
    type: EXPLORE_FAIL,
  };
}

export function explore(action, page=1) {
  return dispatch => {
    return Explore.explore(page).then((res) => {
      switch(res.status) {
        case 200:
          dispatch(exploreSuccess(action, res.data.data_feeds, res.data.slides, res.data.hotdebate))
          return;
        case 500: 
          Actions.login({type: 'reset'});
          return;
        default:
          dispatch(exploreFail());
          return;
      }
    }).catch((err) => {
      return dispatch(exploreFail())
    })
  }
}


