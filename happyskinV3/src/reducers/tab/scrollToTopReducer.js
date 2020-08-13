'use strict';

const InitialState = require('./scrollToTopInitialState').default;
let ConstantSystem = require('../../services/ConstantSystem');

const {
  SCROLL_TO_TOP_START,
  SCROLL_TO_TOP_FINISH
} = require('../../libs/actionTypes');

const initialState = new InitialState;

export default function scrollReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    case SCROLL_TO_TOP_START:
      return state.setIn([action.tab], true);
    case SCROLL_TO_TOP_FINISH:
      return state.setIn([action.tab], false);
  }
  return state;
}
