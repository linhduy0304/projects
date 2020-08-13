

import React, { Component } from 'react';

import {Router, Scene} from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import Login from './screens/account/Login';
import Register from './screens/account/Register';
import ResetPass from './screens/account/ResetPass';
import RegisterSuccess from './screens/account/RegisterSuccess';
import Tab from './screens/tab/Tab';
import Security from './screens/setting/Security';
import About from './screens/setting/About';
import Api from './screens/setting/Api';
import QRCode from './screens/QRCode';
import ChangePass from './screens/setting/ChangePass';
import Kyc from './screens/setting/Kyc';
import EditProfile from './screens/setting/EditProfile';
import PayOut from './screens/send/PayOut';
import PayAddress from './screens/send/PayAddress';
import SendSuccess from './screens/send/SendSuccess';
import Detail from './screens/Detail';
import Rate from './screens/Rate';
import Detail2 from './screens/Detail2';
import App from './screens/App';
import ScanAddress from './screens/ScanAddress';
import PinCode from './screens/pincode/PinCode';

const store = createStore(reducer, applyMiddleware(thunk)) 

const Root = () => (
    <Provider store = {store}>
      <Router>
        <Scene key="root">
          <Scene key="app" initial={true} hideNavBar={true} component={App}/>
          <Scene key="login"  hideNavBar={true} component={Login}/>
          <Scene key="register"  hideNavBar={true} component={Register}/>
          <Scene key="resetPass" hideNavBar={true} component={ResetPass}/>
          <Scene key="registerSuccess" hideNavBar={true} component={RegisterSuccess}/>
          <Scene key="tab"  hideNavBar={true} component={Tab}/>

          <Scene key="security"  hideNavBar={true} component={Security}/>
          <Scene key="about"  hideNavBar={true} component={About}/>
          <Scene key="api"  hideNavBar={true} component={Api}/>
          <Scene key="changePass" hideNavBar={true} component={ChangePass}/>
          <Scene key="kyc" hideNavBar={true} component={Kyc}/>
          <Scene key="editProfile" hideNavBar={true} component={EditProfile}/>
          <Scene key="pinCode" hideNavBar={true} component={PinCode}/>

          <Scene key="rate" hideNavBar={true} component={Rate}/>
          <Scene key="detail" hideNavBar={true} component={Detail}/>
          <Scene key="detail2" hideNavBar={true} component={Detail2}/>
          <Scene key="qrCode" hideNavBar={true} component={QRCode}/>
          <Scene key="scanAddress"  hideNavBar={true} component={ScanAddress}/>
          <Scene key="payOut" hideNavBar={true} component={PayOut}/>
          <Scene key="payAddress" hideNavBar={true} component={PayAddress}/>
          <Scene key="sendSuccess" hideNavBar={true} component={SendSuccess}/>
        </Scene>
      </Router>
    </Provider>
);

export default Root;
