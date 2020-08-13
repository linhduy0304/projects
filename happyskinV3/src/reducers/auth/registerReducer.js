'use strict';
const InitialState = require('./registerInitialState').default;
const {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  ON_REGISTER_FORM_FIELD_CHANGE
  } = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    case REGISTER_REQUEST:
      let nextState =  state.setIn(['disable'], true)
        .setIn(['isFetching'], true)
        .setIn(['isError'],false);
      return nextState;

    case REGISTER_SUCCESS:
      let succeState =
        state.setIn(['isFetching'], false)
          .setIn(['isError'],false)
          .setIn(['disable'], false);
      return succeState;

    case REGISTER_FAILURE:
      let failState =  state.setIn(['isFetching'], false)
        .setIn(['isError'],true)
        .setIn(['error'],action.error)
        .setIn(['disable'], false);
      return failState;

    case ON_REGISTER_FORM_FIELD_CHANGE: {
      const {field, value} = action.payload;
      let nextState =
        state.setIn(['fields', field], value)
          .setIn(['isError'],false)
          .setIn(['isErrorEmail'],false);
      var finalState = nextState.setIn(['isValid'],false);
      return finalState;
    }
  }
  return state;
}
