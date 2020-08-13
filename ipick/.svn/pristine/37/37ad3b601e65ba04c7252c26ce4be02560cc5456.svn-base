
'use strict';
const InitialState = require('./homeInitialState').default;

const {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
  POPULAR_REQUEST,
  POPULAR_SUCCESS,
  POPULAR_FAIL,
  HOME_SEARCH_REQUEST,
  HOME_SEARCH_SUCCESS,
  HOME_SEARCH_FAIL,
  UPDATE_POST_POPULAR,
  TOPPICKS_REQUEST,
  TOPPICKS_SUCCESS,
  TOPPICKS_FAIL
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function homeReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

    case UPDATE_POST_POPULAR: 
      var popular = state.getIn(['popular']);
      var topPicks = state.getIn(['topPicks']);
      if(topPicks) {
        var data = action.data;
        topPicks.map((item, index) => {
          if(item.id == data.id) {
            // myPost.splice(index, 1, data)
            topPicks[index] = data;
          }
        })
        return state.removeIn(['topPicks']).setIn(['topPicks'], topPicks);
      }
      if(popular) {
        var data = action.data;
        popular.map((item, index) => {
          if(item.id == data.id) {
            // myPost.splice(index, 1, data)
            popular[index] = data;
          }
        })
        return state.removeIn(['popular']).setIn(['popular'], popular);
      }else {
        return state
      }
      
      
    //search
    case HOME_SEARCH_REQUEST:
      if(action.action == 'L') {
        return state.setIn(['isFetching'], true);
      }else {
        return state.setIn(['isFetching'], null);
      }
    
    case HOME_SEARCH_SUCCESS:
      if(action.typeLoad == 'post') {
        if(action.action == 'LM') {
          return state.removeIn(['searchPost'])
                      .setIn(['searchPost'], state.getIn(['searchPost']).concat(action.data))
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null)
                      .setIn(['isFetching'], null);
        } else {
          return state.setIn(['isFetching'], null)
                      .setIn(['searchPost'], action.data)
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null);
        }
      }else {
        if(action.action == 'LM') {
          return state.removeIn(['searchUser'])
                      .setIn(['searchUser'], state.getIn(['searchUser']).concat(action.data))
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null)
                      .setIn(['isFetching'], null);
        } else {
          return state.setIn(['isFetching'], null)
                      .setIn(['searchUser'], action.data)
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null);
        }
      }
      

    case HOME_SEARCH_FAIL: 
      return state.setIn(['isFetching'], null)

    //toppick
    case TOPPICKS_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case TOPPICKS_SUCCESS:
      if(action.action == 'LM') {
        return state.removeIn(['topPicks'])
                    .setIn(['topPicks'], state.getIn(['topPicks']).concat(action.data))
                    .setIn(['loadMore'], action.data.length >= 15 ? true : null)
                    .setIn(['isFetching'], null);
      } else {
        return state.setIn(['isFetching'], null)
                    .setIn(['topPicks'], action.data)
                    .setIn(['topPickers'], action.topPickers)
                    .setIn(['starPickers'], action.starPickers)
                    .setIn(['starPicks'], action.starPicks)
                    .setIn(['loadMore'], action.data.length >= 15 ? true : null);
      }
    
    case TOPPICKS_FAIL: 
      return state.setIn(['isFetching'], null)

    //pick to peak
    case POPULAR_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case POPULAR_SUCCESS:
      if(action.action == 'LM') {
        return state.removeIn(['popular'])
                    .setIn(['popular'], state.getIn(['popular']).concat(action.data))
                    .setIn(['loadMorePeak'], action.data.length >= 15 ? true : null)
                    .setIn(['isFetching'], null);
      } else {
        return state.setIn(['isFetching'], null)
                    .setIn(['popular'], action.data)
                    .setIn(['loadMorePeak'], action.data.length >= 15 ? true : null);
      }
    
    case POPULAR_FAIL: 
      return state.setIn(['isFetching'], null)

    //home
    case HOME_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case HOME_SUCCESS:
      if(action.action == 'LM') {
        return state.removeIn(['posts'])
                    .setIn(['posts'], state.getIn(['posts']).concat(action.posts))
                    .setIn(['loadMoreMyPage'], action.posts.length >= 15 ? true : null)
                    .setIn(['isFetching'], null);
      } else {
        return state.setIn(['isFetching'], null)
                    .setIn(['posts'], action.posts)
                    .setIn(['userSuggests'], action.userSuggests)
                    .setIn(['dailys'], action.dailys)
                    .setIn(['breaking'], action.breaking)
                    .setIn(['loadMoreMyPage'], action.posts.length >= 15 ? true : null);
      }
    
    case HOME_FAIL: 
      return state.setIn(['isFetching'], null)
  }
  return state;
}
