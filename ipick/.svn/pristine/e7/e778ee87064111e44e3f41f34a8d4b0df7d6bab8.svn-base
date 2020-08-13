
'use strict';
const InitialState = require('./activityInitialState').default;

const {
  ACTIVITY_MY_REQUEST,
  ACTIVITY_MY_SUCCESS,
  ACTIVITY_MY_FAIL,
  ACTIVITY_FRIEND_REQUEST,
  ACTIVITY_FRIEND_SUCCESS,
  ACTIVITY_FRIEND_FAIL,

} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function activityReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

    //activity friend feeed
    case ACTIVITY_FRIEND_REQUEST:
      return state.setIn(['loading'], true);
    
    case ACTIVITY_FRIEND_SUCCESS:
      if(action.action == 'LM') {
        return state.removeIn(['friendFeed'])
                    .setIn(['friendFeed'], state.getIn(['friendFeed']).concat(action.data))
                    .setIn(['loadMoreFr'], action.data.length >= 15 ? true : null)
                    .setIn(['loading'], null);
      } else {
        return state.setIn(['loading'], null)
                    .setIn(['friendFeed'], action.data)
                    .setIn(['loadMoreFr'], action.data.length >= 15 ? true : null);
      }
    
    case ACTIVITY_FRIEND_FAIL: 
      return state.setIn(['loading'], null)

    //activity my feeed
    case ACTIVITY_MY_REQUEST:
      return state.setIn(['loading'], true);
    
    case ACTIVITY_MY_SUCCESS:
      if(action.action == 'LM') {
        return state.removeIn(['myFeed'])
                    .setIn(['myFeed'], state.getIn(['myFeed']).concat(action.data))
                    .setIn(['loadMoreMy'], action.data.length >= 15 ? true : null)
                    .setIn(['loading'], null);
      } else {
        return state.setIn(['loading'], null)
                    .setIn(['myFeed'], action.data)
                    .setIn(['loadMoreMy'], action.data.length >= 15 ? true : null);
      }
    
    case ACTIVITY_MY_FAIL: 
      return state.setIn(['loading'], null)

  }
  return state;
}
