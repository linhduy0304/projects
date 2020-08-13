
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import Loading from './Loading';
var Modal = require('react-native-modalbox');

const window1 = Dimensions.get('window');

{/* <Modal
      style={[css.ctModal]}
      isOpen={isOpen}
      position="center"
      swipeToClose={true}
      backdropColor="#292c34"
      onClosed={close}
      >
       */}
       
const ModalConfirm = ({
  loading,
  isOpen,
  close,
  data,
  onPress = (status, id)
}) => (
  
        <View style={[css.ctModal]}>
          <View style={{alignItems: 'center'}}>
            <Image style={css.thumb} source={require('../images/intro3.png')} />
            <Image style={css.avatar} source={data.user_request.avatar ? {uri: data.user_request.avatar+'.png'} : require('../images/avatar_default.png')} />
            <Text style={css.fullName}>{data.user_request.full_name}</Text>
            <Text style={css.city}>{data.city}</Text>
            <Text style={css.confirm}>XÁC NHẬN KẾT NỐI</Text>
            <Text style={css.des}>{data.user_request.full_name} yêu cầu xác nhận kết nối mối quan hệ gia đình với bạn</Text>
          </View>
          <View style={css.ctBirthday}>
            <Image source={require('../images/icons/ic_birthday.png')} />
            <Text style={css.txtBirthday}>Ngày sinh</Text>
            <Text style={css.birthday}>{data.birthday}</Text>
          </View>
          <View style={css.ctBirthday}>
            <Image source={require('../images/icons/ic_relationship.png')} />
            <Text style={css.txtBirthday}>Mối quan hệ</Text>
            <Text style={css.birthday}>{data.role_request.description}</Text>
          </View>
          {
            loading ? 
            <Loading title={''}/>
            :
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => onPress(1, data.id)} style={[css.btn,  {backgroundColor: '#c6247d'}]}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>XÁC NHẬN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress(-1, data.id)} style={[css.btn,  {backgroundColor: '#e5e9ea'}]}>
              <Text style={{color: '#535353', fontWeight: 'bold'}}>TỪ CHỐI</Text>
            </TouchableOpacity>
          </View>
          }
          
          
        </View>
)

const css = StyleSheet.create({
  btn: {
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthday: {
    color: '#000',
    // fontWeight: 'bold',
    fontFamily: 'verdana'
  },
  txtBirthday: {
    color: '#bcc0c8',
    fontSize: 12,
    flex: 1,
    marginLeft: 10,
  },
  fullName: {
    color: '#000',
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'verdana'
  },
  city: {
    color: '#8e8e93',
    fontSize: 12,
  },
  confirm: {
    color: '#000000',
    marginTop: 15,
    fontSize: 17,
    fontWeight: 'bold',
  },
  des: {
    color: '#808080',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 13,
    marginTop: 10,
    marginBottom: 20
  },
  ctBirthday: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e9ea'
  },
  ctModal: {
    height: window.height,
    backgroundColor: '#fff',
    width: window1.width - 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 60
    // position: 'absolute',
    // top: 70
  },
  thumb: {
    position: 'absolute',
    height: 100
  },
 
})

export default ModalConfirm;
  