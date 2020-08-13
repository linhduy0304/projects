
'use strict';

const InitialState = require('./state').default;

const {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAIL,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  EDIT_EVENT_SUCCESS,
  LOAD_DATA_CREATE_EVENT_REQUEST,
  LOAD_DATA_CREATE_EVENT_SUCCESS,
  LOAD_DATA_CREATE_EVENT_FAIL,
  LOAD_DATA_EDIT_EVENT_SUCCESS
  } = require('../../config/actionTypes');

const initialState = new InitialState;

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case EDIT_EVENT_SUCCESS:
      var event = state.getIn(['event']);
      if(event) {
        var data = action.data
        event.map((item, index) => {
          if(item.id === data.id) {
            event[index] = data
          }
        })
        return state.setIn(['event'], event).setIn(['loading'], null);
      }else return state

    //delete event
    case DELETE_EVENT_SUCCESS:
      var event = state.getIn(['event']);
      var newEvent = event.filter(a => a.slug !== action.slug);
      return state.setIn(['event'], newEvent).setIn(['loading'], null);
    //add event
    case ADD_EVENT_REQUEST:
      return state.setIn(['loading'], true);
    case ADD_EVENT_SUCCESS:
      var event = state.getIn(['event'])
      event.unshift(action.data)
      return state.setIn(['loading'], null).setIn(['event'], event);
    case ADD_EVENT_FAIL:
      return state.setIn(['loading'], null);

    //load event
    case EVENT_REQUEST:
      return state.setIn(['loading'], true);
    case EVENT_SUCCESS:
      return state.setIn(['loading'], null).setIn(['event'], action.data);
    case EVENT_FAIL:
      return state.setIn(['loading'], null);

    case LOAD_DATA_CREATE_EVENT_REQUEST:
      return state.setIn(['is_loading_create'], true);
    case LOAD_DATA_CREATE_EVENT_SUCCESS:
      return state.setIn(['is_loading_create'], null).setIn(['individuals'], action.data.individuals).setIn(['event_types'], action.data.event_types);
    case LOAD_DATA_CREATE_EVENT_FAIL:
      return state.setIn(['is_loading_create'], null);
    case LOAD_DATA_EDIT_EVENT_SUCCESS:
      return state.setIn(['is_loading_create'], null).setIn(['individuals'], action.data.individuals).setIn(['event_types'], action.data.event_types).setIn(['itemEditing'], action.data.data);
  }
 
  return state;
}
