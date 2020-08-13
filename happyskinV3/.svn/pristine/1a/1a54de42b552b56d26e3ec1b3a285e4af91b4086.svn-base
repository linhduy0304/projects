
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
  HS_IS_LOGIN: null,
  HS_IS_FIRST: null,
  HS_DATA_USER: null,
  HS_HEADER_REQUEST: null,

  HS_SKIN_QUESTION: null,
  HS_SKIN_IS_FINISHED: null,
  HS_SKIN_CONTINUE_PAGE: null,

  HS_POST_CATEGORY: null,

  HS_TOKEN_KEY: null,

  HS_PRODUCT_CATEGORY: null,

  SET_SESSION_TOKEN: null,
  SET_STORE: null,
  SET_STATE: null,
  GET_STATE: null,
  ON_AUTH_FORM_FIELD_CHANGE: null,
  
  HS_SHOW_ALERT_NOT_CONNECT: null
});