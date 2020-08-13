let URL_PATH = "https://mapipro3.happyskin.vn/v2/";
// let URL_PATH = "http://mapi.happyskin.vn/v2/";
let URL_APANEL = "https://apanel.happyskin.vn/";


module.exports = {
  config: URL_PATH+'config',

  home: URL_PATH+'home_feed',
  //auth
  profile: URL_PATH+'user/profile',
  forgotPassword: URL_PATH+'user/forgetPassword',
  register: URL_PATH+'user',
  editProfile: URL_PATH+'user/update',

  //feedback
  feedBack: URL_PATH+'feedback',
  posts: URL_PATH+'posts',
  post: URL_PATH+ 'post',
  
  //skintest
  skintest: URL_PATH+'skintest',
  skinQuestion: URL_PATH+'skintest/question',
  skinSave: URL_PATH+'skintest/save',
  skinresultGroup: URL_PATH+'skintest/group-suggess',
  skinResult: URL_PATH+'skintest/result',
  skinProduct: URL_PATH+'skintest/product',
  skinCategory: URL_PATH+'skintest/category',

  //event
  event: URL_PATH+'event_feeds',
  eventDetail: URL_PATH+'event/',
  //hotDebate
  hotDebate: URL_PATH+'hotdebate',
  
  //video
  videos: URL_PATH+'video',

  //postliked
  product: URL_PATH+'product',
  postLiked: URL_PATH+'post/like',
  productLiked: URL_PATH+'product/like',
  productFilter: URL_PATH+'product/filter',
  
  //skinDIary
  skinDiary: URL_PATH + 'skindiary',
  coachs: URL_PATH + 'room_coaches',

  //routin
  routine: URL_PATH + 'routine',
  routines: URL_PATH + 'routines',
  userRoutine: URL_PATH+ 'userRoutine',
  userRatyRoutine: URL_PATH + 'userRatyRoutine',

  //like
  likePost: URL_PATH+'post/like',
  likeProduct: URL_PATH+'product/like',
  likeGroupFeed: URL_PATH+'group-feed/like',
  likeVideo: URL_PATH+'video/like',
  likeHotdebate: URL_PATH+'hotdebate/like',
  deleteFeed: URL_PATH+'groupfeed',

  //review
  review: URL_PATH+'userRaty',
  //comment
  comment: URL_PATH+'comment',
  //explore
  explore: URL_PATH+'magazine',
  relatePost: URL_PATH+'posts?per_page=6',
  productCategory: URL_PATH+'productCategory',
  // search
  searchProducts: URL_PATH+'product/search',
  searchNews: URL_PATH+'post/search2',
  searchUsers: URL_PATH+'user/search',
  searchRoutine: URL_PATH+'routine/search',

  //chat
  chat: URL_PATH + 'rooms',
  room: URL_PATH + 'room',
  message: URL_PATH + 'message',

  //cosmetic
  cosmeticDetail: URL_PATH+'productCosmetic/',

  // community
  sendQuestion: URL_PATH+'groups/question',
  sendTips: URL_PATH+'groups/tips',
  sendReview: URL_PATH+'groups/review',
  sendLookOfTheDay: URL_PATH+'groups/gImage',
  communityGroup: URL_PATH+'users/groups',
  communityTabGroup: URL_PATH+'group/',
  communityGroupNews: URL_PATH+'feeds/news',
  sendReviewOnProduct: URL_PATH+'userRaty',
  groupPost: URL_PATH+'group/',
  joinGroup: URL_PATH+'groups/join',
  groups: URL_PATH+'groups',
};