
import React, { Component, PureComponent } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import Nav from '../../components/cart/Nav';
import { screen, Color } from '../../config/Constant';
import VerifyAddress from '../../components/cart/VerifyAddress';
import VerifyTotal from '../../components/cart/VerifyTotal';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import LoadingFull from '../../components/register/Loading';

class OrderDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentWillMount = () => {
    this.props.orderDetail(this.props.id)
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.profile.orderDetail) {
      this.setState({
        data: nextProps.profile.orderDetail
      })
    }
  };

  renderCancelOrder(data) {
    var date = data.split(" ");
    var date1 = date[0].split("-");
    var time = date[1].split(":");
    var date2 = new Date(date1[0], parseInt(date1[1])-1, date1[2], time[0], time[1], time[2])
    var offset = (Date.now() - date2.getTime())/1000/60;
    if(offset > 30) {
      return null
    }else return (
      <View style={{alignItems: 'center',}}>
        <Button
          label={'HUỶ ĐƠN HÀNG'}
          marginTop={10}
          color= '#fff'
          onPress={() => this.cancel()}
          borderRadius={20}
          backgroundColor={Color}
        />
      </View>
    )
  }

  cancel = () => {
    this.props.orderCancel(this.props.id)
  }

  render() {
    const { data} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#e6eff1', }}>
        <Nav label='CHI TIẾT ĐƠN HÀNG'
        />
        {
          this.props.profile.loadingMoney ? 
            <LoadingFull />
          : null
        }
        {
          this.props.profile.loading ? 
            <Loading size={100} source={require('../../icons/loading.gif')}/>
          : 
          data ?
          <ScrollView>
            <View style={{flex: 1,width: screen.width, padding: 10}}>
              <View style={styles.ctHeader}>
                <Text style={styles.id}>Mã đơn hàng: <Text style={{color: '#0674c1', fontWeight: 'bold', fontSize: 15}}>{data.id}</Text></Text>
                <Text style={{color: '#333', fontSize: 16}}>{data.provider.name}</Text>
                <Text style={{color: '#0674c1', fontSize: 13}}>{renderCate(data.provider.types)}</Text>
                 {/* <Text style={{color: '#888', marginTop: 5, fontSize: 13}}>Phí ship: <Text style={{fontWeight: 'bold', color: '#333'}}>{renderVND(data.ship)}<Text style={{textDecorationLine: 'underline'}}>đ</Text></Text></Text> */}
              </View>
              {
                data.items.map((item, index) => {
                  return (
                    <ItemOrderDetail
                      data={item}
                      key={index}
                    />
                  )
                }) 
              }
              <VerifyAddress data={data}/>
              <View style={styles.ct}>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                  <CtIcon source={require('../../icons/ic_location.png')}/>
                  <Text style={styles.label}>Kho hàng</Text>
                </View>
                <Text style={[styles.add, {marginTop: 15}]}>{data.provider.address}</Text>
              </View>
              <View style={styles.ct}>
                <View>
                  <Text style={styles.addTotal}>Tổng</Text>
                  <Text style={styles.name}>{renderVND(data.total)} đ</Text>
                </View>
                <View style={{marginTop: 8}}>
                  <Text style={styles.addTotal}>Phí ship</Text>      
                  <Text style={styles.name}>{renderVND(data.ship)} đ</Text>
                </View>
              </View>

              <View style={styles.ct}>
                <Text style={[styles.add, {color: '#333'}]}>Thành tiền</Text>
                <Text style={{fontWeight: 'bold',fontSize: 16,color: '#333',}}>{renderVND(data.ship+data.total)} đ</Text>
                <View>
                  <Text style={[styles.add, {color: '#333',  marginTop: 5}]}>Giá thu hộ</Text>
                  <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between',}}>
                    <Text style={{fontWeight: 'bold',fontSize: 16,color: '#0674c1',}}>{renderVND(data.real_total)} đ</Text>
                    
                  </View>
                  <View >
                      <Text style={[styles.add, {color: '#333',  marginTop: 5}]}>Lãi trả lại</Text>
                      <Text style={{fontWeight: 'bold',fontSize: 16,color: '#333',}}>{renderVND(data.real_total-(data.ship+data.total))} đ</Text>
                    </View>
                </View>
                
              </View>
              
              {
                data.status == 5 || data.status == 6 ? 
                null
                :
                this.renderCancelOrder(data.created_at.date)
              }
            </View>
           
          </ScrollView>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  addTotal: {
    color: '#333',
  },
  ct: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  add: {
    color: '#9a9a9a',
    marginTop:2
  },
  ct: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333'
  },
  ctProduct: {
    backgroundColor: '#fff'
  },
  id: {
    color: '#4192cb',
    fontSize: 13
  },
  ctHeader: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    marginBottom: 1
 },
})

import {connect} from 'react-redux';
import {orderDetail, orderCancel} from '../../actions/profile';
import ItemOrderDetail from '../../components/profile/ItemOrderDetail';
import { renderCate, renderVND } from '../../components/Functions';
import CtIcon from '../../components/product/CtIcon';

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    orderDetail: (id) => dispatch(orderDetail(id)),
    orderCancel: (id) => dispatch(orderCancel(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
