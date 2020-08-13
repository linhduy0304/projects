

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image, 
  StatusBar,
  Platform,
  NativeModules
} from 'react-native';
import Modal from 'react-native-modalbox';
import { screen } from '../../config/Constant';
import Category from './Category';
import Button from '../Button';
import Provider from './Provider';
import MadeBy from './MadeBy';
import Price from './Price';

const { StatusBarManager } = NativeModules;
const height = Platform.OS === 'ios' ? screen.height : screen.height-StatusBar.currentHeight

class ModalFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightStatus: 20,
      open: false,
      arrCountry: this.props.load === 'madeBy' ? [this.props.id] : [],
      arrProvider: this.props.load === 'provider' ? [this.props.id] : [],
      arrCategory: this.props.load === 'category' ? [this.props.id] : [],
      min: 0, 
      max: 20000000,
      active: 'Khoảng giá',
      categories: ['Khoảng giá','Xuất xứ','Nhà cung cấp','Danh mục']
      // categories: this.renderCategories()
    };
  }

  renderCategories() {
    switch(this.props.load) {
      case 'provider':
        return ['Khoảng giá','Xuất xứ','Danh mục'];
      case 'madeBy':
        return ['Khoảng giá','Nhà cung cấp','Danh mục'];
      case 'category':
        return ['Khoảng giá','Xuất xứ','Nhà cung cấp'];
      default: 
        return ['Khoảng giá','Xuất xứ','Nhà cung cấp','Danh mục'];
    }
  }

  componentWillMount = () => {
    if(Platform.OS === 'ios') {
      StatusBarManager.getHeight(({height}) => this.setState({heightStatus: height}));
    }
  };
  

  renderContent(type) {
    switch(type) {
      case 'Xuất xứ':
        return <MadeBy arrCountry={this.state.arrCountry} />
      case 'Danh mục':
        return <Category arrCategory={this.state.arrCategory}/>
      case 'Nhà cung cấp':
        return <Provider arrProvider={this.state.arrProvider}/>
      default:
        return <Price max={this.state.max} min={this.state.min} setPrice={(min, max) => this.setState({min, max})}/>
    }
  }

  submit = () => {
    const {arrCountry,arrProvider,arrCategory, min, max} = this.state
    var body = {
      min,
      max,
      countries: arrCountry,
      providers: arrProvider,
      categories: arrCategory,
    }
    this.setState({open: true})
    this.props.filter(body)
  }

  deleAll() {
    this.setState({
      arrCountry:this.props.load === 'madeBy' ? [this.props.id] : [],
      arrProvider: this.props.load === 'provider' ? [this.props.id] : [],
      arrCategory: this.props.load === 'category' ? [this.props.id] : [],
      min: 0, 
      max: 20000000,
      open: false
    })
    this.props.loadAgain()
  }

  render() {
    const {open, categories, active} = this.state;
    return (
      <Modal
        isOpen={open}
        entry={'bottom'}
        position={'bottom'}
        onClosed={() => this.setState({open: false})}
        style={{backgroundColor: '#fff', width: screen.width,height, justifyContent: 'flex-end' }}
      >
        <View style={{width: screen.width,height}}>
          {
            Platform.OS === 'ios' ?
            <View style={{height: this.state.heightStatus, backgroundColor: '#c41a36'}}></View>
            : null
          }
          <View style={css.ctBack}>
            <TouchableOpacity onPress={() => this.setState({open: false})} style={{padding: 15}}>
              <Image style={css.icBack} source={require('../../icons/ic_close_black.png')} />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', flex: 1, marginTop: 5}}>
            <View style={css.ctLeft}>
              {
                categories.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => this.setState({active: item})} style={[css.ctItem, {backgroundColor: active === item ? '#c41a36' : null}]} key={index}>
                      <Text style={{color: active === item ? '#fff' : '#333'}}>{item}</Text>
                    </TouchableOpacity>
                  )
                }) 
              }
            </View>
            <View style={{flex: 1,  marginLeft: 10, marginRight: 10,backgroundColor: '#fff'}}>
              {this.renderContent(this.state.active)}
            </View>
          </View>
          
          <View style={{padding:15, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button 
              label='Xoá tất cả'
              borderWidth={1}
              onPress={() => this.deleAll()}
              borderColor='#f1f1f1'
              backgroundColor='#fff'
              color='#2c2c2c'
            />
            <Button 
              label='Áp dụng'
              onPress={() => this.submit()}
              width={screen.width*2/3 - 40}
              backgroundColor='#e9492f'
              color='#fff'
            />
          </View>
         
        </View>
        
      </Modal>
    );
  }
}

const css = StyleSheet.create({
  ctItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#cfd7d8',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8
  },
  ctLeft: {
    backgroundColor: '#e6eff1',
    width: screen.width/3
  },
  ctBack: {
    borderBottomWidth: 1,
    borderBottomColor: '#e6eff1',
    flexDirection: 'row',
  },
  icBack: {
    height: 20,
    width: 20
  }
})

export default ModalFilter;