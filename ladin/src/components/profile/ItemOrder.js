

import React from 'react';
import { Text, View, StyleSheet , TouchableOpacity} from 'react-native';
import {renderVND, renderDateTime} from '../../components/Functions';
import { Actions } from 'react-native-router-flux';

// 0 - đang xử lý - chưa lấy hàng(đặt hàng thành công)(gửi mail)
          
//   1 - Đã duyệt bởi admin - chưa lấy hàng(gửi mail)
         
//    2 - Đã duyệt bởi admin - Đang giao hàng(gửi mail)
        
//     3 - Đã duyệt bởi admin - Đã giao hàng thành công(gửi mail)
        
//     4 - Đã duyệt bởi admin - giao hàng thất bại(gửi mail)
         
//    5 - Đã hủy bởi khách - Không lấy được hàng(gửi mail)
       
//      6 - Đã hủy bởi admin hoặc ncc - Không lấy được hàng (gửi mail)
       
//      7 - Đã duyệt bởi admin - Đã lấy được hàng (gửi mail)
         
//    8 - Đã duyệt bởi admin - Không lấy được hàng (gửi mail)

class ItemOrder extends React.Component{
  state = {}

  renderItem = (data, index) => {
    return (
      <View style={css.ctItem} key={index}>
        <Text style={css.name}>{data.name}</Text>
        <Text style={css.count}>Số lượng: <Text style={{fontWeight: 'bold'}}>{data.quantity}</Text></Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.props.openRate(data.id)} style={css.ctRate}>
            <Text style={{color: '#fff', fontSize: 13}}>Đánh giá sản phẩm</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderOrder(status) {
    switch(status) {
      case 0:
      case 1:
        return 'Chưa lấy hàng';
      case 2:
       return 'Đang giao hàng';
      case 3:
      case 9:
      case 10:
        return 'Đã giao hàng thành công';
      case 4:
       return 'Giao hàng thất bại';
      case 7:
        return 'Đã lấy được hàng';
      case 5:
      case 6:
      case 8:
        return 'Không lấy được hàng';
      default:
       return '';
    }
  }

  renderStatus(status) {
    switch(status) {
      case 0:
       return 'Đang xử lý đơn hàng';
      case 5:
        return 'Đã huỷ bởi khách hàng';
      case 6:
        return 'Đã huỷ bởi admin hoặc nhà cung cấp';
      case 1:
      case 2:
      case 3:
      case 4:
      case 7:
      case 8:
        return 'Đã duyệt bởi admin';
      case 9:
        return 'Đang chờ duyệt thanh toán';
      case 10:
        return 'Đã duyệt thanh toán';
      default:
       return '';
    }
  }
  
  render() {
    const {data} = this.props;
    return (
      <View style={css.ct}>
        <View style={css.ctHeader}>
          <Text style={css.id}>Mã đơn hàng: <Text style={{fontWeight: 'bold'}}>{data.id}</Text></Text>
        </View>
        <View style={{marginLeft: 10, marginRight: 10}}>
        {
          data.items.map((item, index) => {
            return this.renderItem(item, index, )
          })
        }
        <View style={css.ctItem}>
          <Text style={css.label}>Tổng: <Text style={{color: '#0674c1', fontWeight: 'bold'}}>{renderVND(data.real_total)} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text></Text>
          <Text style={css.label}>Ngày đặt hàng: <Text style={css.value}>{renderDateTime(data.created_at.date)}</Text></Text>
          <Text style={css.label}>Kho hàng: <Text style={css.value}>{data.provider.address}</Text></Text>
          <Text style={css.label}>Địa chỉ giao hàng: <Text style={css.value}>{data.address_detail}</Text></Text>
          <Text style={css.label}>Trạng thái: <Text style={css.value}>{this.renderStatus(data.status)}</Text></Text>
          <Text style={css.label}>Giao hàng: <Text style={css.value}>{this.renderOrder(data.status)}</Text></Text>
        </View>
        <TouchableOpacity onPress={() => Actions.orderDetail({id: data.id})} style={css.ctMore}>
          <Text style={{color: '#c41a36'}}>Xem chi tiết</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

const css = StyleSheet.create({
  ctRate: {
    height: 30,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#c41a36',
    marginTop: 5
  },
  ctMore: {
    height: 40, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctItem: {
    paddingTop: 10, 
    paddingBottom: 10, 
    borderBottomColor: '#ccc', 
    borderBottomWidth: 1
  },
  value: {
    color: '#333'
  },
  label:  {
    color: '#7d7d7d',
    marginBottom: 3,
  },
  name: {
    color: '#333',
    fontSize: 16
  },
  id: {
    color: '#0674c1'
  },
  ct: {
    marginTop: 8,
    backgroundColor: '#fff'
  },
  ctHeader: {
    backgroundColor: '#e5e5e5',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
})
export default ItemOrder;
