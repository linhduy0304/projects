

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import Nav from '../../components/cart/Nav';
import Input from '../../components/Input';
import { screen } from '../../config/Constant';
import ContactVerify from '../../components/profile/ContactVerify';
import Button from '../../components/Button';

const Css = require('../../config/css');

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      name: '',
      phone:'',
      category: '',
      image: '',
      active: 1,
    };
  }

  update() {
    const {name, company, phone, category, image, active} = this.state;
    if(name === '' ||company === '' ||phone === '' ||category === '') {
      SimpleToast.show('Các trường không được để trống')
      return;
    }
    if(active === 1) {
      if(image === '') {
        SimpleToast.show('Bạn phải chụp ảnh giấy phép kinh doanh')
        return;
      }
      var body = {
        "name": name,
        "phone": phone,
        "company": company,
        "description": category,
        "image": image
      }
    }else {
      var body = {
        "name": name,
        "phone": phone,
        "company": company,
        "description": category,
      }
    }
    this.props.saveContact(body)
  }

  render() {
    const {company, name, phone, category, active} = this.state;
    return (
      <View style={Css.container}>
        {
          this.props.profile.loading ? 
            <Loading />
          : null
        }
        <Nav label='LIÊN HỆ HỢP TÁC'>
       
        </Nav>

        <ScrollView keyboardShouldPersistTaps={'always'}>
          <View style={{flex: 1, paddingTop: 20, alignItems: 'center'}}>
            <Input 
              label='Tên công ty/Shop/Nhà cung cấp'
              value={company}
              selectionColor='#333'
              color='#333'
              placeholderTextColor='#9a9a9a'
              width={screen.width-60}
              backgroundColor='#fff'
              onChange={text => this.setState({company: text})}
            />
            <Input 
              label='Tên người liên hệ'
              value={name}
              selectionColor='#333'
              color='#333'
              marginTop= {10}
              placeholderTextColor='#9a9a9a'
              width={screen.width-60}
              backgroundColor='#fff'
              onChange={text => this.setState({name: text})}
            />
            <Input 
              label='Số điện thoại'
              value={phone}
              selectionColor='#333'
              color='#333'
              marginTop= {10}
              keyboardType='numeric'
              placeholderTextColor='#9a9a9a'
              width={screen.width-60}
              backgroundColor='#fff'
              onChange={text => this.setState({phone: text})}
            />
            <Input 
              label='Lĩnh vực buôn bán'
              value={category}
              selectionColor='#333'
              color='#333'
              marginTop= {10}
              placeholderTextColor='#9a9a9a'
              width={screen.width-60}
              backgroundColor='#fff'
              onChange={text => this.setState({category: text})}
            />
            <ContactVerify
                setImage={data => this.setState({image: data})}
                setActive={type => this.setState({active: type})}
              />
            <Button
              label='CẬP NHẬT'
              borderRadius={20}
              marginTop={20}
              onPress={() => this.update()}
              color='#fff'
              fontWeight='bold'
              backgroundColor='#c41a36'
            />
          </View>
        </ScrollView>

      </View>

    );
  }
}

import {connect} from 'react-redux';
import {saveContact} from '../../actions/profile';
import Loading from '../../components/register/Loading';
import SimpleToast from 'react-native-simple-toast';

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveContact: (body) => dispatch(saveContact(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
