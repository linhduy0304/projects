
'use strict';
const InitialState = require('./commonInitialState').default;

const {
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAIL,
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAIL,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAIL,
} = require('../../libs/actionTypes');

const initialState = new InitialState;
export default function commonReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {

    case EDIT_COMMENT_FAIL:
      return state.setIn(['error'], action.error)

    case EDIT_COMMENT_SUCCESS:
      var comments = state.getIn(['comments']).slice();
      var data = action.data;
      if (data.parent_id == '') {
        comments = comments.map((comment, index) => {
          if(comment.id == data.id){
            return comment = data 
            // return data
          }
          return comment
        })
      } else {
        comments = comments.map((comment, index) => {
          if (comment.id == data.parent_id) {
            comment.comments = comment.comments.map((comm, ind) => {
              if (comm.id == data.id) {
                return data;
              }
              return comm;
            })
          } 
          return comment;
        });
      }
      var new_comments = comments.slice();
      return state.removeIn(['comments']).setIn(['comments'], new_comments).setIn(['error'], null);
    
    //delete Comment
    case DELETE_COMMENT_SUCCESS:
    case DELETE_COMMENT_FAIL:
      return state

    //action comment

    // case COMMENT_REQUEST:
    //   return state.setIn(['error'], '');

    case COMMENT_SUCCESS: 
      var comments = state.getIn(['comments']);
      var data = action.data;
      if (data.parent_id == '') {
        comments.unshift(data);
      } else {
        comments.map((comment, index) => {
          if (comment.id == data.parent_id) {
            comment.comments = comment.comments.concat(data);
            comment.comments_total = comment.comments_total + 1;
          }
        });
      }
      var new_comment = state.removeIn(['comments']).setIn(['comments'], comments).setIn(['error'], null);
      return new_comment;
    
    case COMMENT_FAIL:
      return state.setIn(['error'], action.error)


    //laod COmment
    case COMMENTS_REQUEST: 
      if(action.action != 'LM') {
        return state.setIn(['comments'], [])
      }else {
        return state.setIn(['fetchingLoadMore'], true)
      }

    case COMMENTS_SUCCESS:
      return state.setIn(['comments'], state.getIn(['comments']).concat(action.data)).setIn(['loadMore'],  action.data.length == 15 ? true : false ).setIn(['fetchingLoadMore'], false)
        // .setIn(['page'], action.page)
        // .setIn(['hasMoreComment'], action.data.length > 10 ? true : false)
        // .setIn(['isLoadMore'], false);

    //action like
    case LIKE_SUCCESS:
      return state.setIn(['isFetching'], false)

    case LIKE_FAIL:
      return state.setIn(['isFetching'], false)
  }
  return state;
}
