//Configs
export const DEBUG_MODE = true;
export const PREFIX = DEBUG_MODE ? 'dev' : 'merchant';
export const API_URL = `https://${PREFIX}.jamja.vn/api/v3`;
export const API_USER_URL = `https://${PREFIX}.jamja.vn/api/user`;
export const API_FOLLOW_BRAND = `https://${PREFIX}.jamja.vn/api/v3/brandfollow/`;
export const BASE_HEADER = {
  'Accept': '*/*',
  'Content-Type': 'application/json',
};
export const CLIENT_ID = DEBUG_MODE ? '8uG7QrxY4xrCwBL0xXDYwf6cGLpmP39nuTIuAGkq' : '8uG7QrxY4xrCwBL0xXDYwf6cGLpmP39nuTIuAGkq';//6NxzSGpuzBls5YuFLv5Ws69Oxie2VQ1LPTb00hgy
export const GOOGLE_API_KEY = DEBUG_MODE ? 'AIzaSyDtd31DD4JMJ1ckHlaPIbWwU_ET2OuW7tU' : 'AIzaSyBMVfXW21bRTx1q2BTJj-p0F64zmAsCypo';

export const DEAL_TYPE_LAST_MIN = 'LAST_MINUTE_DEAL';
export const DEAL_TYPE_EXCLUSIVE = 'EXCLUSIVE_DEAL';
export const DEAL_TYPE_NORMAL_DEAL = 'NORMAL_DEAL';
export const DEAL_TYPE_INVITATION_DEAL = 'INVITATION_DEAL';
export const DEAL_TYPE_GIVEAWAY_DEAL = 'GIVEAWAY_DEAL';
export const DEAL_TYPE_ECOUPON = 'ECOUPON';
export const DEAL_TYPE_MOVIE = 'MOVIE_BOOKING';

export const STATUS_EXPIRED = 3;
export const STATUS_REDEEMED = 4;
export const STATUS_REJECTED = 5;
export const STATUS_WAIT_FOR_MERCHANT = 7;
export const STATUS_MERCHANT_REJECT = 8;
export const STATUS_MERCHANT_ACCEPTED = 1;
export const STATUS_MERCHANT_CANCEL = 9;
export const STATUS_USER_CANCEL = 10;
export const STATUS_ADMIN_CANCEL = 11;

export const REDEEMED = 1;
export const CANCEL = 2;
export const EXPIRED = 3;

export const TYPE_SAVED = 2;
export const TYPE_GOT = 1;

export const API_REDEEM = `https://${PREFIX}.jamja.vn/api/v3/redeemcoupon/`;
export const API_LIST_NOTIFY = `https://${PREFIX}.jamja.vn/api/v1/notification/`;

export const AVAILABLE_HEADER_TYPE = 1;
export const NOT_AVAILABLE_HEADER_TYPE = 2;

export const PROMOCODE_UPGRADE = 'upgrade';
export const PROMOCODE_REPLACE = 'replace';

export const HOTLINE = '1900 565665';
export const STORAGE = '@JAMJAStorage';

export const ERROR_AUTH_MESSAGE = 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn! Vui lòng đăng nhập.';
export const ERROR_NORMAL = 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!';

export const KEY_ANDROID_UPDATE_CONFIGURATION = 'android_update_configuration';
export const KEY_IOS_UPDATE_CONFIGURATION = 'ios_update_configuration';
export const KEY_VERSION_NAME = 'latest_version_name';
export const KEY_VERSION_CODE = 'latest_version_code';
export const KEY_FORCE_UPDATE = 'force_update';
export const KEY_UPDATE_MESSAGE = 'update_message';




