
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
  ON_AUTH_FORM_FIELD_CHANGE: null,
  ON_LOGIN_FORM_FIELD_CHANGE: null,

  AUTH: null,
  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAIL: null,
  REGISTER_REQUEST: null,
  REGISTER_SUCCESS: null,
  REGISTER_FAIL: null,
  CHECK_LOGIN_REQUEST: null,
  CHECK_LOGIN_SUCCESS: null,
  FORGOT_PASS_REQUEST: null,
  FORGOT_PASS_SUCCESS: null,
  FORGOT_PASS_FAIL: null,
  
  //tab
  TAB: null,
  SCROLL_TO_TOP_START: null,
  SCROLL_TO_TOP_FINISH: null,

  //profile
  PROFILE: null,
  PROFILE_SUCCESS: null,
  PROFILE_MY_POST_REQUEST: null,
  PROFILE_MY_POST_SUCCESS: null,
  PROFILE_MY_POST_FAIL: null,
  PROFILE_MY_PICK_REQUEST: null,
  PROFILE_MY_PICK_SUCCESS: null,
  PROFILE_MY_PICK_FAIL: null,
  OTHER_PROFILE_REQUEST: null,
  OTHER_PROFILE_SUCCESS: null,
  OTHER_PROFILE_FAIL: null,
  FOLLOWING_REQUEST: null,
  FOLLOWING_SUCCESS: null,
  FOLLOWING_FAIL: null,
  FOLLOWER_REQUEST: null,
  FOLLOWER_SUCCESS: null,
  FOLLOWER_FAIL: null,
  INVITE_REQUEST: null,
  INVITE_SUCCESS: null,
  INVITE_FAIL: null,
  FOLLOW_REQUEST: null,
  FOLLOW_SUCCESS: null,
  FOLLOW_FAIL: null,
  UPDATE_PROFILE_REQUEST: null,
  UPDATE_PROFILE_SUCCESS: null,
  UPDATE_PROFILE_FAIL: null,
  CREATE_PASS_SUCCESS: null,
  UPDATE_POST_PROFILE: null,

  //home
  HOME: null,
  HOME_REQUEST: null,
  HOME_SUCCESS: null,
  HOME_FAIL: null,
  POPULAR_REQUEST: null,
  POPULAR_SUCCESS: null,
  POPULAR_FAIL: null,
  HOME_SEARCH_REQUEST: null,
  HOME_SEARCH_SUCCESS: null,
  HOME_SEARCH_FAIL: null,
  UPDATE_POST_POPULAR: null,
  TOPPICKS_REQUEST: null,
  TOPPICKS_SUCCESS: null,
  TOPPICKS_FAIL: null,

  //explore
  EXPLORE: null,
  EXPLORE_REQUEST: null,
  EXPLORE_SUCCESS: null,
  EXPLORE_FAIL: null,
  CATEGORY_REQUEST: null,
  CATEGORY_SUCCESS: null,
  CATEGORY_FAIL: null,
  PICK_CATEGORY_REQUEST: null,
  PICK_CATEGORY_SUCCESS: null,
  PICK_CATEGORY_FAIL: null,

  //post
  POST: null,
  POST_DETAIL_REQUEST: null,
  POST_DETAIL_SUCCESS: null,
  POST_DETAIL_FAIL: null,
  LOAD_COMMENT_REQUEST: null,
  LOAD_COMMENT_SUCCESS: null,
  LOAD_COMMENT_FAIL: null,
  COMMENT_REQUEST: null,
  COMMENT_SUCCESS: null,
  COMMENT_FAIL: null,
  LIKE_REQUEST: null,
  LIKE_SUCCESS: null,
  LIKE_FAIL: null,
  GET_LINK_REQUEST: null,
  GET_LINK_SUCCESS: null,
  GET_LINK_FAIL: null,
  POST_IMAGE_REQUEST: null,
  POST_IMAGE_SUCCESS: null,
  POST_IMAGE_FAIL: null,
  POST_LINK_REQUEST: null,
  POST_LINK_SUCCESS: null,
  POST_LINK_FAIL: null,
  EDIT_CONTENT: null,

  //activity
  ACTIVITY: null,
  ACTIVITY_MY_REQUEST: null,
  ACTIVITY_MY_SUCCESS: null,
  ACTIVITY_MY_FAIL: null,
  ACTIVITY_FRIEND_REQUEST: null,
  ACTIVITY_FRIEND_SUCCESS: null,
  ACTIVITY_FRIEND_FAIL: null,
});


