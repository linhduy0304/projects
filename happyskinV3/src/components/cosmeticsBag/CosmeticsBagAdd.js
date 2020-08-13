import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Picker,
    TouchableWithoutFeedback
} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import * as cosmeticsActions from '../../actions/cosmeticsActions';

const actions = [
  cosmeticsActions
];
function mapStateToProps(state) {
  return {
    cosmetics: state.cosmetics,
  };
}
function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class CosmeticsBagAdd extends React.Component {
    constructor(props) {
			super(props);
			this.state = {
        title: '',
        expire: '',
        begin_time: '',
        frequency: '',
        show: false,
        frequency: '1',
        product_id: '',
        error: '',
        isCheck: 0,
			}
    }

    componentWillMount () {
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
  
    _keyboardDidHide () {
   
      this.setState({show: false})
    }
    
    dateNow() {
      var date = new Date();
      var now = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
      return now;
    }

    onChange(title) {
      var timeout;
      this.setState({title: title})
      if(title == '') {
        this.setState({
          image: '',
          product_id: ''
        })
        return;
      }
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.setState({
          show: true
        })
        this.props.actions.search(title)
      }, 1000)
    }

    pickProduct(product) {
      dismissKeyboard()
      this.setState({
        show: false,
        title: product.name,
        product_id: product.id,
        image: product.image_thumb
      })
    }

    addProduct() {
      dismissKeyboard()
      this.setState({error: ''})
      if(this.state.product_id == '') {
        if(this.state.title == '') {
          this.setState({ error: 'Bạn phải nhập tên sản phẩm'});
          return;
        }else {
          var product = {
            product_name: this.state.title,
            time_start: this.state.begin_time,
            expiry_date: this.state.expire,
            frequency: this.state.frequency
          }
          this.props.actions.addProduct(product)
        }
      }else {
        var product = {
          product_id: this.state.product_id,
          time_start: this.state.begin_time,
          expiry_date: this.state.expire,
          frequency: this.state.frequency
        }
        this.props.actions.addProduct(product)
      }
    }

    check() {
      if(this.state.isCheck === 1) {
        this.setState({
          isCheck: 0,
          expire: '',
        })
      }else {
        this.setState({
          isCheck: 1,
        })
      }
    }
		
    render() {
			return (
				<View style={styles.container}>
        <View style={main.container}>
					<NavBar style={{navBar: main.navBarWhite, statusBar: main.statusBar}} statusBar={{barStyle: 'dark-content', backgroundColor: '#fff'}} >
            <NavButton onPress={() => Actions.pop()} style={main.navButton}>
              <Image style={{height: 12, width: 13}} source={require('../../images/icons/ic_back_blue2.png')}/>
              <Text style={{fontSize: 14, color: 'rgb(68, 110, 182)', marginLeft: 7}}>Tủ mỹ phẩm</Text>
            </NavButton>
					</NavBar>

          <ScrollView 
            bounces={false}
            keyboardShouldPersistTaps={'always'}>
						<View style={styles.ctContent}>
              <Text style={styles.titleAdd}>Thêm sản phẩm mới</Text>
              <Text style={styles.des}>Nhập tên sản phẩm bạn muốn thêm vào Tủ mỹ phẩm</Text>
              <TextField
                value={this.state.title}
                label='Tên sản phẩm'
                autoCorrect={false}
                onChangeText={(title) => this.onChange(title)}
                tintColor="rgb(90, 94, 111)"
                textColor="rgb(14, 14, 17)"
                baseColor="rgb(194, 197, 208)"
              />
              {
                this.props.cosmetics.isFetching ? 
                  <View style={{alignItems: 'center'}}>
                    <Image style={{width: 75, height: 75}} source={require('../../images/spinner.gif')} />
                  </View>
                  : null
              }  
              {
                this.props.cosmetics.searchProduct.length !== 0 && this.state.show ?
                  <View>
                    {
                      this.props.cosmetics.searchProduct.map((item, index) => {
                        return (
                          <TouchableOpacity key={index} style={{flexDirection: 'row',alignItems: 'center', padding: 5}} onPress={() => this.pickProduct(item)}>
                            <Image style={{height: 40, width: 40, marginRight: 10}} source={{uri: item.image_thumb+'.png'}} />
                            <Text style={{color: 'rgb(68, 110, 182)'}}>{item.name}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                  : null
              }
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                  <View style={styles.ctEmail}>
                    <Text style={styles.txtEmail}>Ngày bắt đầu sử dụng</Text>
                    <DatePicker
                      style={styles.txtInput}
                      // date={(this.props.profile.currentUser.birthday)}
                      date={this.state.begin_time}
                      mode="date"
                      placeholder="DD-MM-YYYY"
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      minDate='01-01-1900'
                      maxDate={'01-01-2100'}
                      showIcon={false}
                      onDateChange={(begin_time) => this.setState({begin_time: begin_time})}
                      customStyles={
                        {dateInput: {
                          borderWidth: 0,
                          alignItems:'flex-start'
                        },
                        dateIcon: {
                          height: 25,
                          width: 25,
                          marginRight: 10
                        },
                        placeholderText:{color:'#c2c5d0',fontSize: 15}
                      }}
                    />
                  </View>
                  {
                    this.state.isCheck === 1 ? null :
                  <View style={styles.ctEmail}>
                    <Text style={styles.txtEmail}>Hạn sử dụng</Text>
                    <DatePicker
                      style={styles.txtInput}
                      // date={(this.props.profile.currentUser.birthday)}
                      date={this.state.expire}
                      mode="date"
                      placeholder="DD-MM-YYYY"
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      minDate='01-01-1900'
                      maxDate={'01-01-2100'}
                      showIcon={false}
                      onDateChange={(expire) => this.setState({expire: expire})}
                      customStyles={
                        {dateInput: {
                          borderWidth: 0,
                          alignItems:'flex-start'
                        },
                        dateIcon: {
                          height: 25,
                          width: 25,
                          marginRight: 10
                        },
                        placeholderText:{color:'#c2c5d0',fontSize: 15}
                      }}
                    />
                  </View>
                  }
                  <TouchableWithoutFeedback onPress={() => this.check()} >
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                      <Text style={{fontSize: 12}}>Tôi không biết hạn sử dụng</Text>
                      <View style={styles.ctCheck}>
                        {
                          this.state.isCheck === 1  ?
                            <Image style={{width: 15, height: 10}} source={require('../../images/icons/ic_check_red.png')}/>
                          : null
                        }
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
               
                {
                  this.state.image != '' ?
                    <Image style={{height: 100, width: 100}} source={{uri: this.state.image+ '.png'}} />
                  : null
                }
              </View>

              <View style={[styles.ctEmail,{borderBottomWidth: 0}]}>
                <Text style={styles.txtEmail}>Tần suất sử dụng</Text>
                <Picker
                  selectedValue={this.state.frequency}
                  onValueChange={(itemValue, itemIndex) => this.setState({frequency: itemValue})}>
                  <Picker.Item label="Ít hơn 1 lần / tuần" value="1" />
                  <Picker.Item label="1 lần / tuần" value="2" />
                  <Picker.Item label="2-3 lần / tuần" value="3" />
                  <Picker.Item label="Hàng ngày" value="4" />
                </Picker>
              </View>
              {
                this.state.error ?
                <Text style={styles.txtError}>{this.state.error}</Text>
                : null
              }
            
              <Button name="facebook"
                onPress={() => this.addProduct()}
                containerStyle={{marginTop: 30, backgroundColor:"rgb(227, 0, 82)", borderRadius:2,height: 48, alignItems: 'center',justifyContent: 'center'}}
                style={styles.btnAdd}>
                Thêm sản phẩm này 
              </Button>
						</View>
          </ScrollView>
          </View>
				</View>
			);
    }
}

let main = require('../../styles/Main');
const styles = StyleSheet.create({
  ctCheck: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtError: {
    color: 'rgb(255, 183, 101)',
    fontSize: 16
  },
  txtEmail: {
    fontSize: 12
  },
  ctEmail: {
    borderBottomColor: 'rgb(228, 232, 242)',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  des: {
    marginTop: 21,
    color: 'rgb(51, 51, 51)'
  },
  titleAdd: {
    color: 'rgb(215, 53, 84)',
    fontSize: 32,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  ctContent: {
    flex: 1,
    paddingLeft: 15, 
    paddingRight: 15
  },
  btnAdd: {
    fontSize: 16,
    color: '#fff',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CosmeticsBagAdd);
