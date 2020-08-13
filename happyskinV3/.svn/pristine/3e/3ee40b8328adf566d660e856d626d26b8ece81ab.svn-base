'use strict';
const InitialState = require('./profileInitialState').default;
let ConstantSystem = require('../../services/ConstantSystem');

const {Record} = require('immutable');

const {
  EMPTY_DATA_USER,
  PROFILE_USER_REQUEST,
  PROFILE_USER_SUCCESS,
  PROFILE_USER_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  OTHER_PROFILE_REQUEST,
  OTHER_PROFILE_SUCCESS,
  OTHER_PROFILE_FAIL,
  UPDATE_COACH_PROFILE,
  UPDATE_ROUTINE_PROFILE,
  UPDATE_USER_SKINTEST,
  UPDATE_DATA_USER_SKINTEST
} = require('../../libs/actionTypes');


const initialState = new InitialState;

export default function profileReducer(state = initialState, action) {

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {
    
    //update count routine
    case UPDATE_ROUTINE_PROFILE:
      var currentUser = state.getIn(['currentUser']);
      currentUser.dashboard.count_routine = currentUser.dashboard.count_routine + 1;
      return state.removeIn(['currentUser']).setIn(['currentUser'], currentUser);

    //update count coach
    case UPDATE_COACH_PROFILE:
      var currentUser = state.getIn(['currentUser']);
      currentUser.dashboard.count_coach = currentUser.dashboard.count_coach + 1;
      return state.removeIn(['currentUser']).setIn(['currentUser'], currentUser);

    //otherProfile
    case OTHER_PROFILE_REQUEST:
      return  state.setIn(['isFetching'], true).setIn(['otherProfile'], '');

    case OTHER_PROFILE_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['otherProfile'], action.data);

    case OTHER_PROFILE_FAIL:
      return state.setIn(['isFetching'], false);
    //editProfile
    case EDIT_PROFILE_REQUEST:
      return  state.setIn(['isFetching'], true);

    case EDIT_PROFILE_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['currentUser'], action.data);

    case EDIT_PROFILE_FAIL:
      return state.setIn(['isFetching'], false);

    case EMPTY_DATA_USER:
      return InitialState;

    case PROFILE_USER_REQUEST:
      return  state.setIn(['isFetching'], true);

    case PROFILE_USER_SUCCESS:
      return state.setIn(['currentUser'], action.data);

    case PROFILE_USER_FAIL:
      return state.setIn(['isFetching'], false);
      
    case CHANGE_PASSWORD_REQUEST:
    case FEEDBACK_REQUEST:
      return state.setIn(['isFetching'], true);
    
    case CHANGE_PASSWORD_SUCCESS:
      return state.setIn(['closeModalChangePass'], true).setIn(['isFetching'], false);
    
    case CHANGE_PASSWORD_FAILURE:
      return state.setIn(['isError'],true).setIn(['error'],action.error).setIn(['isFetching'], false);
    
    case FEEDBACK_FAILURE: 
      return state.setIn(['isFetching'], false)

    case FEEDBACK_SUCCESS:
      return state.setIn(['closeModalFeedBack'], true).setIn(['isFetching'], false);
    
    case UPDATE_USER_SKINTEST:
      var currentUser = state.getIn(['currentUser']);
      currentUser.skintest = action.skintest;
      return state.removeIn(['currentUser']).setIn(['currentUser'], currentUser);
    case UPDATE_DATA_USER_SKINTEST:
      var currentUser = state.getIn(['currentUser']);
      currentUser.full_name = action.data.full_name;
      currentUser.birthday = action.data.birthday;
      currentUser.gender = action.data.gender;
      currentUser.city = action.data.city;
      currentUser.job = action.data.job;
      return state.removeIn(['currentUser']).setIn(['currentUser'], currentUser);
  }
  return state;
}
