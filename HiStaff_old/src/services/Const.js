

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
  HS_HEADER: null,

  SET_SESSION_TOKEN: null,
  SET_STORE: null,
  SET_STATE: null,
  GET_STATE: null,
});