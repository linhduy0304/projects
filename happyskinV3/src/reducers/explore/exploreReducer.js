
'use strict';
const InitialState = require('./exploreInitialState').default;

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
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function exploreReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

    //loadmore review
    case LOAD_MORE_REVIEW_REQUEST:
      return state.setIn(['fetchingLoadMore'], true);

    case LOAD_MORE_REVIEW_SUCCESS:
      var data = state.getIn(['exDetail']);
      data.user_raties = data.user_raties.concat(action.data);
      return state.setIn(['exDetail'], data).setIn(['fetchingLoadMore'], false).setIn(['loadMoreReview'], action.data.length == 15 ? true : false);
  
    case REVIEW_REQUEST:
      return state.setIn(['fetchingModal'], true);

    case REVIEW_SUCCESS:
      var data = state.getIn(['exDetail']);
      data.user_raties.unshift(action.data);
      return state.setIn(['exDetail'], data).setIn(['fetchingModal'], false).setIn(['openModal'], true);

    case REVIEW_FAIL:
      return state.setIn(['fetchingModal'], false);

    case HOT_DEBATE_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case HOT_DEBATE_SUCCESS: 
      return state.setIn(['isFetching'], false).setIn(['hotDebate'], action.data);
    
    case HOT_DEBATE_FAIL:
      return state.setIn(['isFetching'], false);

    case HOT_DEBATE_FOLLOW_REQUEST:
      var isFollow = action.data.isFollow == 1 ? 0 : 1;
      return state.setIn(['hotDebate', 'isFollow'], isFollow);

    case HOT_DEBATE_FOLLOW_SUCCESS:
      var isFollow = action.data.isFollow;
      return state.setIn(['hotDebate', 'isFollow'], isFollow);

    case HOT_DEBATE_FOLLOW_FAIL:
      return state;

    //detail
    case EX_DETAIL_REQUEST: 
      return state.setIn(['isFetching'], true).setIn(['exDetail'], []);
      
    case EX_DETAIL_SUCCESS:
      if(action.data.user_raties) {
        return state.setIn(['isFetching'], false).setIn(['exDetail'], action.data).setIn(['exRelate'], action.relate).setIn(['loadMoreReview'], action.data.user_raties.length == 5 ? true : false) ;
      }else {
        return state.setIn(['isFetching'], false).setIn(['exDetail'], action.data).setIn(['exRelate'], action.relate)
      }
    
    case EX_DETAIL_FAIL: 
      return state.setIn(['isFetching'], false);

    //explore realate
    case EX_RELATE_REQUEST: 
      return state.setIn(['exRelate'], []);
      
    case EX_RELATE_SUCCESS: 
      return state.setIn(['exRelate'], action.data);
    
    case EX_RELATE_FAIL: 
      return state;
    
    //laod explore
    case EXPLORE_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case EXPLORE_SUCCESS:
      if(action.action == 'LM') {
        return state.setIn(['explore'], state.getIn(['explore']).concat(action.explore)).setIn(['loadMore'], action.explore.length >= 15 ? true : false).setIn(['isFetching'], false);
      }else {
        return state.setIn(['explore'], action.explore).setIn(['loadMore'], action.explore.length >= 15 ? true : false).setIn(['exTrending'], action.exTrending).setIn(['exHotDebate'], action.exHotDebate).setIn(['isFetching'], false);
      }
      
    
    case EXPLORE_FAIL: 
      return state.setIn(['isFetching'], false)
  }
  return state;
}
