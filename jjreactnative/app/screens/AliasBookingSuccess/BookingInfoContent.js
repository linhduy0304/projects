import React from 'react';
import {View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import {BaseComponent} from "../../common/base/BaseComponent";
import Text from '../../common/view/text/JJText';

import BookingDetailForm1 from '../../common/view/form/BookingDetailForm1';
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import ReservationHotLine from '../../common/view/notice/ReservationHotLine';

export default class BookingInfoContent extends BaseComponent {

    render() {

        return (
            <View style={{flex: 1, backgroundColor: 'white', borderRadius: 8, paddingBottom: 80}}>

                <View style={{width: 56, height: 3, borderRadius: 1.5, margin: 8, alignSelf: 'center', backgroundColor: '#D8D8D8'}}/>

                <ScrollView style={{flex: 1}}>

                    <BookingDetailForm1 coupon={this.props.item}/>

                    <Text style={{color: COLOR_TEXT_INACTIVE, paddingLeft: DIMENSION_PADDING_MEDIUM, paddingRight: DIMENSION_PADDING_MEDIUM}}>
                        Lưu ý: Mã đặt chỗ đã được gửi về email của bạn. Vui lòng kiểm tra email hoặc xem lại trong <Text style={{color: COLOR_TEXT_INACTIVE, fontWeight: 'bold'}}>Mã Khuyến mãi của tôi</Text> trên ứng dụng
                    </Text>

                    <Text style={{fontSize: 12, color: COLOR_TEXT_INACTIVE, marginTop: 24, alignSelf: 'center'}}>
                        Để nhận ưu đãi, bấm <Text style={{color: COLOR_PRIMARY, fontSize: 12, fontWeight: 'bold'}}>Sử dụng mã</Text> & làm theo hướng dẫn
                    </Text>

                </ScrollView>

                <ReservationHotLine screen={this.props.screen}/>

            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();
    }
}

BookingInfoContent.propTypes = {
    item: PropTypes.object,
    screen: PropTypes.string
}