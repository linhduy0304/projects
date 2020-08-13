
var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror({
  SET_SESSION_TOKEN: null,
  SET_STORE: null,
  SET_STATE: null,
  GET_STATE: null,

  //search
  SEARCH: null,
  SEARCH_REQUEST: null,
  SEARCH_SUCCESS: null,
  SEARCH_FAIL: null,
  
  //profile
  PROFILE: null,
  FEED_BACK_REQUEST: null,
  FEED_BACK_SUCCESS: null,
  FEED_BACK_FAIL: null,
  UPDATE_PROFILE_REQUEST: null,
  UPDATE_PROFILE_SUCCESS: null,
  UPDATE_PROFILE_FAIL: null,
  SEARCH_USER_REQUEST: null,
  SEARCH_USER_SUCCESS: null,
  SEARCH_USER_FAIL: null,

  //Calendar
  CALENDAR: null,
  EVENT_REQUEST: null,
  EVENT_SUCCESS: null,
  EVENT_FAIL: null,
  ADD_EVENT_REQUEST: null,
  ADD_EVENT_SUCCESS: null,
  ADD_EVENT_FAIL: null,

  DELETE_EVENT_SUCCESS: null,
  EDIT_EVENT_SUCCESS: null,
  LOAD_DATA_CREATE_EVENT_REQUEST: null,
  LOAD_DATA_CREATE_EVENT_SUCCESS: null,
  LOAD_DATA_CREATE_EVENT_FAIL: null,
  LOAD_DATA_EDIT_EVENT_SUCCESS: null,

  AUTH: null,
  LOGIN_REQUEST: null,
  LOGIN_SUCCESS:  null,
  LOGIN_FAIL: null,
  REGISTER_REQUEST: null,
  REGISTER_SUCCESS: null,
  REGISTER_FAIL: null,
  CHECK_LOGIN_SUCCESS: null,
  PROFILE_SUCCESS: null,
  FORGOT_PASS_REQUEST: null,
  FORGOT_PASS_SUCCESS: null,
  FORGOT_PASS_FAIL: null,

  //chat
  CHAT: null,
  CHATS_REQUEST: null,
  CHATS_SUCCESS: null,
  CHATS_FAIL: null,
  CHAT_DETAIL_REQUEST: null,
  CHAT_DETAIL_SUCCESS: null,
  CHAT_DETAIL_FAIL: null,
  FRIEND_LIST_REQUEST: null,
  FRIEND_LIST_SUCCESS: null,
  FRIEND_LIST_FAIL: null,
  CREATE_GROUP_REQUEST: null,
  CREATE_GROUP_SUCCESS: null,
  CREATE_GROUP_FAIL: null,
  SEND_SUCCESS: null,
  SEND_FAIL: null,

  //post
  POST: null,
  CATEGORY_REQUEST: null,
  CATEGORY_SUCCESS: null,
  CATEGORY_FAIL: null,
  POST_CATE_REQUEST: null,
  POST_CATE_SUCCESS: null,
  POST_CATE_FAIL: null,
  POST_DETAIL_REQUEST: null,
  POST_DETAIL_SUCCESS: null,
  POST_DETAIL_FAIL: null,
  LIKE_REQUEST: null,
  LIKE_SUCCESS: null,
  LIKE_FAIL: null,
  LOAD_COMMENT_REQUEST: null,
  LOAD_COMMENT_SUCCESS: null,
  LOAD_COMMENT_FAIL: null,
  COMMENT_REQUEST: null,
  COMMENT_SUCCESS: null,
  COMMENT_FAIL: null,

  CATEGORY_LV2_SUCCESS: null,

  INDIVIDUAL_REQUEST: null,
  INDIVIDUAL_SUCCESS: null,
  INDIVIDUAL_FAIL: null,
  INDIVIDUAL: null,
  ADD_INDIVIDUAL_REQUEST: null,
  ADD_INDIVIDUAL_SUCCESS: null,
  ADD_INDIVIDUAL_FAIL: null,
  EDIT_INDIVIDUAL_REQUEST: null,
  EDIT_INDIVIDUAL_SUCCESS: null,
  EDIT_INDIVIDUAL_FAIL: null,
  UPDATE_INDIVIDUAL_REQUEST: null,
  UPDATE_INDIVIDUAL_SUCCESS: null,
  UPDATE_INDIVIDUAL_FAIL: null,
  DELETE_INDIVIDUAL_REQUEST: null,
  DELETE_INDIVIDUAL_SUCCESS: null,
  DELETE_INDIVIDUAL_FAIL: null,
  REQUEST_RELATIONSHIP_REQUEST: null,
  REQUEST_RELATIONSHIP_SUCCESS: null,
  REQUEST_RELATIONSHIP_FAIL: null,

  HOME: null,
  HOME_REQUEST: null,
  HOME_SUCCESS: null,
  HOME_FAIL: null,
  RELATIONSHIP_REQUEST: null,
	RELATIONSHIP_SUCCESS: null,
  RELATIONSHIP_FAIL: null,
  POST_STATUS_REQUEST: null,
  POST_STATUS_SUCCESS: null,
  POST_STATUS_FAIL: null,
  POST_IMAGE_SUCCESS: null,
  CONFIRM_RELATION_REQUEST: null,
  CONFIRM_RELATION_SUCCESS: null,
  CONFIRM_RELATION_FAIL: null,

  
})


