import React from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
  Provider,
  connect
} from 'react-redux';

import App from './src/screens/App';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Tab from './src/screens/Tab';
import Category from './src/screens/explore/Category';
import Setting from './src/screens/setting/Setting';
import ForgotPass from './src/screens/ForgotPass';
import ChangePass from './src/screens/setting/ChangePass';
import CreatePass from './src/screens/setting/CreatePass';
import CreateNewPass from './src/screens/setting/CreateNewPass';
import Invite from './src/screens/setting/Invite';
import AppInfo from './src/screens/setting/AppInfo';
import FeedBack from './src/screens/setting/FeedBack';
import Activity from './src/screens/activity/Activity';
import PostBlank from './src/screens/post/PostBlank';
import PostAdd from './src/screens/post/PostAdd';
import EditArticle from './src/screens/post/EditArticle';
import EditImage from './src/screens/post/EditImage';
import EditVideo from './src/screens/post/EditVideo';
import EditAudio from './src/screens/post/EditAudio';
import EditLink from './src/screens/post/EditLink';
import EditHtml from './src/screens/post/EditHtml';
import Following from './src/screens/Following';
import Follower from './src/screens/Follower';
import OtherProfile from './src/screens/profile/OtherProfile';
import Profile from './src/screens/profile/Profile';
import EditProfile from './src/screens/profile/EditProfile';
import Explore from './src/screens/explore/Explore';
import Search from './src/screens/home/Search';
import PostDetail from './src/screens/PostDetail';
import Video from './src/screens/Video';

import configureStore from './src/libs/configureStore';
import {setStore} from './src/actions/globalActions';

function getInitialState() {
  const _initState = {
  };
  return _initState;
}

export default class Main extends React.Component {
    render() {
      const store = configureStore(getInitialState());
      store.dispatch(setStore(store));
      return (
        <Provider store = {store}>
          <Router>
            <Scene key="root">
              <Scene key="app" initial={true} component={App} hideNavBar={true} panHandlers={null} />
              <Scene key="welcome" component={Welcome} hideNavBar={true} panHandlers={null} />
              <Scene key="login" component={Login} hideNavBar={true} panHandlers={null} />
              <Scene key="register" component={Register} hideNavBar={true} panHandlers={null} />
              <Scene key="tab" component={Tab} hideNavBar={true} panHandlers={null} />
              <Scene key="category" component={Category} hideNavBar={true} panHandlers={null} />
              <Scene key="setting" component={Setting} hideNavBar={true} panHandlers={null} />
              <Scene key="invite" component={Invite} hideNavBar={true} panHandlers={null} />
              <Scene key="appInfo" component={AppInfo} hideNavBar={true} panHandlers={null} />
              <Scene key="changePass"  component={ChangePass} hideNavBar={true} panHandlers={null} />
              <Scene key="createPass" component={CreatePass} hideNavBar={true} panHandlers={null} />
              <Scene key="createNewPass" component={CreateNewPass} hideNavBar={true} panHandlers={null} />
              <Scene key="forgotPass" component={ForgotPass} hideNavBar={true} panHandlers={null} />
              <Scene key="feedback" component={FeedBack} hideNavBar={true} panHandlers={null} />
              <Scene key="postBlank" component={PostBlank} hideNavBar={true} panHandlers={null} />
              <Scene key="postAdd" component={PostAdd} hideNavBar={true} panHandlers={null} />
              <Scene key="editArticle" component={EditArticle} hideNavBar={true} panHandlers={null} />
              <Scene key="editImage" component={EditImage} hideNavBar={true} panHandlers={null} />
              <Scene key="editLink" component={EditLink} hideNavBar={true} panHandlers={null} />
              <Scene key="editAudio" component={EditAudio} hideNavBar={true} panHandlers={null} />
              <Scene key="editVideo" component={EditVideo} hideNavBar={true} panHandlers={null} />
              <Scene key="editHtml" component={EditHtml} hideNavBar={true} panHandlers={null} />
              <Scene key="otherProfile" id={'5a3334d5e13823538c70cf8d'} component={OtherProfile} hideNavBar={true} panHandlers={null} />
              <Scene key="profile" component={Profile} hideNavBar={true} panHandlers={null} />
              <Scene key="editProfile" component={EditProfile} hideNavBar={true} panHandlers={null} />
              <Scene key="following" component={Following} hideNavBar={true} panHandlers={null} />
              <Scene key="follower" component={Follower} hideNavBar={true} panHandlers={null} />
              <Scene key="explore" component={Explore} hideNavBar={true} panHandlers={null} />
              <Scene key="video" component={Video} hideNavBar={true} panHandlers={null} />
              <Scene key="search" keyword={'ngo hong quang'} component={Search} hideNavBar={true} panHandlers={null} />
              <Scene key="postDetail" slug={'xem-truoc-tuan-le-thoi-trang-quoc-te-viet-nam-xuan-he-2018'} component={PostDetail} hideNavBar={true} panHandlers={null} />
            </Scene>
          </Router>
        </Provider>
      );
    }
}
