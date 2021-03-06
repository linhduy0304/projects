
'use strict';

const InitialState = require('./profileInitialState').default;

const {
  PROFILE_SUCCESS,
  PROFILE_MY_POST_REQUEST,
  PROFILE_MY_POST_SUCCESS,
  PROFILE_MY_POST_FAIL,
  PROFILE_MY_PICK_REQUEST,
  PROFILE_MY_PICK_SUCCESS,
  PROFILE_MY_PICK_FAIL,
  OTHER_PROFILE_REQUEST,
  OTHER_PROFILE_SUCCESS,
  OTHER_PROFILE_FAIL,
  FOLLOWING_REQUEST,
  FOLLOWING_SUCCESS,
  FOLLOWING_FAIL,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
  FOLLOWER_FAIL,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  INVITE_FAIL,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CREATE_PASS_SUCCESS,
  UPDATE_POST_PROFILE,
  } = require('../../libs/actionTypes');

const initialState = new InitialState;

export default function profileReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    // updatePost when edit post
    case UPDATE_POST_PROFILE: 
      var myPost = state.getIn(['myPost']);
      if(myPost) {
        var data = action.data;
        var add = null;
        myPost.map((item, index) => {
          if(item.id == data.id) {
            // myPost.splice(index, 1, data)
            myPost[index] = data;
            return add = true
          }
        })
        if(!add) {
          myPost.unshift(data)
        }
        return state.removeIn(['myPost']).setIn(['myPost'], myPost);
      }else {
        return state
      }
      

    //createPass
    case CREATE_PASS_SUCCESS: 
      return state.setIn(['loading'], null).removeIn(['currentUser']).setIn(['currentUser'], action.data);

      //update Profile
    case UPDATE_PROFILE_REQUEST:
      return state.setIn(['loading'], true);

    case UPDATE_PROFILE_SUCCESS:
      return state.setIn(['loading'], null).removeIn(['currentUser']).setIn(['currentUser'], action.data);

    case UPDATE_PROFILE_FAIL:
      return state.setIn(['loading'], null);

    //follow user
    case FOLLOW_REQUEST:
      return state.setIn(['loadFollow'], true);

    case FOLLOW_SUCCESS:
      return state.setIn(['loadFollow'], null);

    case FOLLOW_FAIL:
      return state.setIn(['loadFollow'], null);

    //invite
    case INVITE_REQUEST:
      return state.setIn(['loading'], true);

    case INVITE_SUCCESS:
      return state.setIn(['loading'], null);

    case INVITE_FAIL:
      return state.setIn(['loading'], null);


    //follower
    case FOLLOWER_REQUEST:
      if(action.keyword == null) {
        return state.setIn(['loading'], true);
      }else return state.setIn(['loadingSearch'], true);
    
    case FOLLOWER_SUCCESS:
      if(action.action == 'LM') {
        return state.removeIn(['follower'])
                    .setIn(['follower'], state.getIn(['follower']).concat(action.data))
                    .setIn(['loadMore'], action.data.length >= 15 ? true : null)
                    .setIn(['loading'], null);
      } else {
        if(action.keyword == null) {
          return state.setIn(['loading'], null)
                      .setIn(['follower'], action.data)
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null);
        }else {
          return state.setIn(['loadingSearch'], null)
                      .setIn(['follower'], action.data)
                      .setIn(['loadMore'], action.data.length >= 15 ? true : null);
        }
       
      }
    
    case FOLLOWER_FAIL: 
      return state.setIn(['loading'], null).setIn(['loadingSearch'], null)

    //following
    case FOLLOWING_REQUEST:
      if(action.keyword == null) {
        return state.setIn(['loading'], true);
      }else return state.setIn(['loadingSearch'], true);
    
    case FOLLOWING_SUCCESS:
      if(action.action == 'LM') {
        return state.removeIn(['following'])
                    .setIn(['following'], state.getIn(['following']).concat(action.data))
                    .setIn(['loadMore'], action.data.length >= 15 ? true : null)
                    .setIn(['loading'], null);
      } else {
        if(action.keyword == null) {
          return state.setIn(['loading'], null)
                    .setIn(['following'], action.data)
                    .setIn(['loadMore'], action.data.length >= 15 ? true : null);
        }else 
          return state.setIn(['loadingSearch'], null)
                    .setIn(['following'], action.data)
                    .setIn(['loadMore'], action.data.length >= 15 ? true : null);
      }
    
    case FOLLOWING_FAIL: 
      return state.setIn(['loading'], null).setIn(['loadingSearch'], null)

    //other profile
    case OTHER_PROFILE_REQUEST:
      return state.setIn(['loadOther'], true).setIn(['otherProfile'], null);
    
    case OTHER_PROFILE_SUCCESS:
      return state.setIn(['loadOther'], null)
                  .setIn(['otherProfile'], action.data)

    case OTHER_PROFILE_FAIL: 
      return state.setIn(['loadOther'], null)

    //profile my pick
    case PROFILE_MY_PICK_REQUEST:
      return state.setIn(['loading'], true).setIn(['otherCountPick'], null);
    
    case PROFILE_MY_PICK_SUCCESS:
      if(action.id == null) {
        if(action.action == 'LM') {
          return state.removeIn(['myPick'])
                      .setIn(['myPick'], state.getIn(['myPick']).concat(action.data))
                      .setIn(['lmMyPick'], action.data.length >= 15 ? true : null)
                      .setIn(['loading'], null);
        } else {
          return state.setIn(['loading'], null)
                      .setIn(['myPick'], action.data)
                      .setIn(['myCountPick'], action.total)
                      .setIn(['lmMyPick'], action.data.length >= 15 ? true : null);
        }
      }else {
        if(action.action == 'LM') {
          return state.removeIn(['otherPick'])
                      .setIn(['otherPick'], state.getIn(['otherPick']).concat(action.data))
                      .setIn(['lmOtherPick'], action.data.length >= 15 ? true : null)
                      .setIn(['loading'], null);
        } else {
          return state.setIn(['loading'], null)
                      .setIn(['otherCountPick'], action.total)
                      .setIn(['otherPick'], action.data)
                      .setIn(['lmOtherPick'], action.data.length >= 15 ? true : null);
        }
      }
    
    case PROFILE_MY_PICK_FAIL: 
      return state.setIn(['loading'], null)

    //profile my post
    case PROFILE_MY_POST_REQUEST:
      return state.setIn(['loading'], true).setIn(['otherCountPost'], null);
    
    case PROFILE_MY_POST_SUCCESS:
      if(action.id == null) {
        if(action.action == 'LM') {
          return state.removeIn(['myPost'])
                      .setIn(['myPost'], state.getIn(['myPost']).concat(action.data))
                      .setIn(['lmMyPost'], action.data.length >= 15 ? true : null)
                      .setIn(['loading'], null);
        } else {
          return state.setIn(['loading'], null)
                      .setIn(['myCountPost'], action.total)
                      .setIn(['myPost'], action.data)
                      .setIn(['lmMyPost'], action.data.length >= 15 ? true : null);
        }
      }else {
        if(action.action == 'LM') {
          return state.removeIn(['otherPost'])
                      .setIn(['otherPost'], state.getIn(['otherPost']).concat(action.data))
                      .setIn(['lmOtherPost'], action.data.length >= 15 ? true : null)
                      .setIn(['loading'], null);
        } else {
          return state.setIn(['loading'], null)
                      .setIn(['otherPost'], action.data)
                      .setIn(['otherCountPost'], action.total)
                      .setIn(['lmOtherPost'], action.data.length >= 15 ? true : null);
        }
      }
      
    
    case PROFILE_MY_POST_FAIL: 
      return state.setIn(['loading'], null)

    case PROFILE_SUCCESS: 
      return state.setIn(['currentUser'], action.data);

  }
 
  return state;
}
