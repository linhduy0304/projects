

import React, { Component } from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import App from './screens/App';
import Tab from './screens/tab/Tab';
import RegisterEmail from './screens/register/RegisterEmail';
import RegisterOTP from './screens/register/RegisterOTP';
import RegisterInfo from './screens/register/RegisterInfo';
import Login from './screens/Login';
import ForgotPass from './screens/forgotPass/ForgotPass';
import ForgotPassVerify from './screens/forgotPass/ForgotPassVerify';
import ForgotPassSuccess from './screens/forgotPass/ForgotPassSuccess';
import Category from './screens/category/Category';
import ProductDetail from './screens/product/ProductDetail';
import ProductDetailMore from './screens/product/ProductDetailMore';
import CartAdd from './screens/cart/CartAdd';
import CartAddress from './screens/cart/CartAddress';
import CartSuccess from './screens/cart/CartSuccess';
import CartVerify from './screens/cart/CartVerify';
import ProviderMore from './screens/ProviderMore';
import MadeByMore from './screens/MadeByMore';
import Profile from './screens/profile/Profile';
import GuideBuy from './screens/profile/GuideBuy';
import ListOrder from './screens/profile/ListOrder';
import AddressOrder from './screens/profile/AddressOrder';
import NotifyDetail from './screens/notify/NotifyDetail';
import Search from './screens/Search';
import ProductCategory from './screens/product/ProductCategory';
import About from './screens/profile/About';
import CartListAddress from './screens/cart/CartListAddress';
import Contact from './screens/profile/Contact';
import OrderDetail from './screens/profile/OrderDetail';
import CategoryMore from './screens/CategoryMore';
import CartEditAddress from './screens/cart/CartEditAddress';

const store = createStore(reducer, applyMiddleware(thunk)) 
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <Provider store = {store}>
      <Router>
        <Stack key="root">
          <Scene key="app" hideNavBar={true} component={App}/>
          <Scene key="tab" hideNavBar={true} component={Tab}/>
          <Scene key="registerEmail" hideNavBar={true} component={RegisterEmail}/>
          <Scene key="registerOTP" hideNavBar={true} component={RegisterOTP}/>
          <Scene key="registerInfo" hideNavBar={true} component={RegisterInfo}/>
          <Scene key="login" hideNavBar={true} component={Login}/>

          <Scene key="forgotPass" hideNavBar={true} component={ForgotPass}/>
          <Scene key="forgotPassVerify" hideNavBar={true} component={ForgotPassVerify}/>
          <Scene key="forgotPassSuccess" hideNavBar={true} component={ForgotPassSuccess}/>

          <Scene key="category" hideNavBar={true} component={Category}/>

          <Scene key="productDetail" id={36} hideNavBar={true} component={ProductDetail}/>
          <Scene key="productDetailMore" hideNavBar={true} component={ProductDetailMore}/>
          <Scene key="productCategory" hideNavBar={true} component={ProductCategory}/>

          <Scene key="cartAdd" hideNavBar={true} component={CartAdd}/>
          <Scene key="cartListAddress" hideNavBar={true} component={CartListAddress}/>
          <Scene key="cartAddress" hideNavBar={true} component={CartAddress}/>
          <Scene key="cartEditAddress" hideNavBar={true} component={CartEditAddress}/>
          <Scene key="cartSuccess" hideNavBar={true} component={CartSuccess}/>
          <Scene key="cartVerify" hideNavBar={true} component={CartVerify}/>

          <Scene key="categoryMore" hideNavBar={true} component={CategoryMore}/>
          <Scene key="providerMore" hideNavBar={true} component={ProviderMore}/>
          <Scene key="madeByMore" hideNavBar={true} component={MadeByMore}/>

          <Scene key="profile" hideNavBar={true} component={Profile}/>
          <Scene key="guideBuy" hideNavBar={true} component={GuideBuy}/>
          <Scene key="listOrder" hideNavBar={true} component={ListOrder}/>
          <Scene key="addressOrder" hideNavBar={true} component={AddressOrder}/>
          <Scene key="about" hideNavBar={true} component={About}/>
          <Scene key="orderDetail" id={122}  hideNavBar={true} component={OrderDetail}/>
          <Scene key="contact" hideNavBar={true} component={Contact}/>


          <Scene key="notifyDetail" hideNavBar={true} component={NotifyDetail}/>

          <Scene key="search" hideNavBar={true} component={Search}/>
        </Stack>
      </Router>
    </Provider>
    )
  }
}

export default Root;
