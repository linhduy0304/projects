import React from 'react';
import {View, TouchableOpacity, Easing} from 'react-native';
import Popover from "react-native-popover-view";
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../common/base/BasePureComponent";
import Text from '../../common/view/text/JJText';
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM
} from "../../resources/dimens";
import JJIcon from '../../common/view/icon/JJIcon';
import {styles} from './styles';
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import BottomLineListItem from "../../common/view/line/BottomLineListItem";
import {StringUtil} from '../../utils/string-util';

export default class PaymentInfo extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            popoverInfoVisible: false
        }
    }


    render() {

        return (
            <View style={{marginTop: DIMENSION_PADDING_LARGE, backgroundColor: 'white', padding: DIMENSION_PADDING_MEDIUM}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Tổng cộng - <Text style={{color: COLOR_PRIMARY}}>{this.props.totalQuantity}</Text>
                    </Text>

                    <Text style={{flex: 1, textAlign: 'right'}}>
                        {StringUtil.beautyNumber(this.props.originalPrice)}đ
                    </Text>
                </View>

                <View style={{flexDirection: 'row', marginLeft: DIMENSION_PADDING_MEDIUM, alignItems: 'center', marginTop: DIMENSION_PADDING_TINY}}>
                    <View style={styles.dot}/>
                    <Text style={{marginLeft: DIMENSION_PADDING_TINY}}>
                        Ưu đãi JAMJA: <Text style={{color: COLOR_PRIMARY, fontWeight: 'bold'}}>{this.props.couponHighlight}</Text>
                    </Text>

                    <Text style={{flex: 1, textAlign: 'right'}}>
                        {(this.props.discountPrice >= 0 ? '' : '+') + StringUtil.beautyNumber(this.props.discountPrice*-1)}đ
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: DIMENSION_PADDING_MEDIUM}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Phí mua hộ:
                    </Text>

                    <Text style={{flex: 1, textAlign: 'right'}}>
                        {StringUtil.beautyNumber(this.props.deliveryPrice)}đ
                    </Text>
                </View>

                {
                    !!this.props.deliverPromoCode &&
                    <View style={{flexDirection: 'row', marginLeft: DIMENSION_PADDING_MEDIUM, alignItems: 'center', marginTop: DIMENSION_PADDING_TINY}}>
                        <View style={styles.dot}/>
                        <Text style={{marginLeft: DIMENSION_PADDING_TINY}}>
                            Mã giảm thêm: <Text style={{color: COLOR_PRIMARY, fontWeight: 'bold'}}>{this.props.deliverPromoCode}</Text>
                        </Text>

                        <Text style={{flex: 1, textAlign: 'right'}}>
                            {(this.props.deliveryDiscountPrice >= 0 ? '-' : '') + StringUtil.beautyNumber(this.props.deliveryDiscountPrice)}đ
                        </Text>
                    </View>
                }

                <BottomLineListItem
                    style={{
                        marginTop: DIMENSION_PADDING_MEDIUM
                    }}/>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Tổng tiền tạm tính:
                    </Text>

                    <TouchableOpacity
                        style={{padding: DIMENSION_PADDING_MEDIUM}}
                        activeOpacity={0.8}
                        ref={this._onInfoButtonRef}
                        onPress={this._onInfoButtonPress}>
                        <JJIcon
                            name={'info_o'}
                            size={14}
                            color={COLOR_TEXT_INACTIVE}/>
                    </TouchableOpacity>

                    <Text style={{flex: 1, textAlign: 'right', fontWeight: 'bold'}}>
                        {StringUtil.beautyNumber(this.props.finalPrice)}đ
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Hình thức thanh toán:</Text>
                    <Text style={{flex: 1, textAlign: 'right'}}>Tiền mặt</Text>
                </View>

                <Popover
                    popoverStyle={{
                        backgroundColor: '#3399ff',
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        width: '90%'
                    }}
                    showBackground={false}
                    onClose={this._onClosePopoverInfo}
                    isVisible={this.state.popoverInfoVisible}
                    fromView={this.infoButtonRef}
                    animationConfig={{
                        duration: 50,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }}>

                    <Text style={{color: 'white', padding: DIMENSION_PADDING_MEDIUM}}>
                        Lưu ý: Đây là giá tiền tạm tính. Giá trị đơn hàng có thể thay đổi tuỳ theo mặt hàng bạn gọi thêm (topping,...) hoặc có sự thay đổi giữa người mua và người bán trong quá trình thực hiện mua hộ.
                    </Text>
                </Popover>

            </View>
        )
    }

    _onInfoButtonRef = ref => this.infoButtonRef = ref;

    _onInfoButtonPress = () => {
        this.setState({
            popoverInfoVisible: true
        })
    }

    _onClosePopoverInfo = () => {
        this.setState({
            popoverInfoVisible: false
        })
    }
}

PaymentInfo.propTypes = {
    totalQuantity: PropTypes.string,
    originalPrice: PropTypes.number,
    discountPrice: PropTypes.number,
    couponHighlight: PropTypes.string,
    deliveryPrice: PropTypes.number,
    deliveryDiscountPrice: PropTypes.number,
    deliverPromoCode: PropTypes.string,
    finalPrice: PropTypes.number
}