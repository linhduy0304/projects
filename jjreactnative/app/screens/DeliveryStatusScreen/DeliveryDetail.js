import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
} from '../../resources/dimens';
import {
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE,
    COLOR_TEXT_GRAY,
    COLOR_GRAY_BG_2
} from '../../resources/colors';
import JJIcon from '../../common/view/icon/JJIcon';
import PopUpHeader from '../../common/view/header/PopUpHeader';
import Text from '../../common/view/text/JJText';
import MenuSelectedItem from "../DeliveryOrderConfirmation/MenuSelectedItem";
import PaymentInfo from '../DeliveryOrderConfirmation/PaymentInfo';
import SolidLineView from '../../common/view/line/SolidLineView';
import {BasePureComponent} from "../../common/base/BasePureComponent";

const Dash = ({ propStyle }) => <View style={[styles.dash, { ...propStyle }]} />;

export default class DeliveryDetail extends BasePureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isMap: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <PopUpHeader
                    mainText={'CHI TIẾT ĐƠN MUA HỘ'}
                    onClose={this.props.close} />

                <ScrollView style={{flex: 1, paddingTop: DIMENSION_PADDING_MEDIUM, paddingBottom: DIMENSION_PADDING_MEDIUM}}>
                    <View style={styles.placeContainer}>

                        <View style={{flexDirection: 'row'}}>
                            <JJIcon name="shop_o" size={20} color={COLOR_TEXT_GRAY} />
                            <Text style={styles.labelStyle}>Từ cửa hàng</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 2}}>
                            <View style={styles.dashList}>
                                <Dash propStyle={{marginTop: 2}}/>
                                <Dash propStyle={{marginTop: 4}}/>
                                <Dash propStyle={{marginTop: 4}}/>
                                <Dash propStyle={{marginTop: 4}}/>
                            </View>
                            <Text style={styles.address}>{this.props.storeAddress}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <JJIcon name="map_pin_o" size={20} color={COLOR_PRIMARY} />
                            <Text style={styles.labelStyle}>Nhờ mua hộ đến</Text>
                        </View>

                        <Text style={[styles.address, {marginLeft: 32}]}>
                            {this.props.shippingAddress} {!!this.props.shippingAddressNote && `- ${this.props.shippingAddressNote}`}
                        </Text>
                    </View>

                    <View style={styles.infoDetail}>
                        <Text style={styles.labelText}>Khách đặt</Text>
                        <Text style={styles.infoText}>{this.props.userName}</Text>
                    </View>
                    <View style={[styles.infoDetail, {marginBottom: DIMENSION_PADDING_SMALL}]}>
                        <Text style={styles.labelText}>Điện thoại liên hệ</Text>
                        <Text style={styles.infoText}>{this.props.userPhone}</Text>
                    </View>

                    {
                        !!this.props.products &&
                        this.props.products.map((item, index) => {
                            return <MenuSelectedItem item={item}
                                                     editable={false}
                                                     key={`${index}_${item.get('product_code')}`}
                                                     lastItem={index >= this.props.products.size - 1}/>
                        })
                    }

                    <SolidLineView/>

                    <PaymentInfo
                        totalQuantity={this._getTotalQuantity()}
                        couponHighlight={this.props.couponHighlight}
                        originalPrice={this.props.originalPrice}
                        discountPrice={this.props.discountPrice}
                        deliverPromoCode={this.props.deliverPromoCode}
                        deliveryDiscountPrice={this.props.deliveryDiscountPrice}
                        deliveryPrice={this.props.deliveryPrice}
                        finalPrice={this.props.finalPrice}/>

                    <View style={{height: 48}}/>

                </ScrollView>
            </View>
        );
    }

    _getTotalQuantity = () => {
        if (!this.props.products) return `0 ${this.props.slotUnit}`;
        return this.props.products.reduce((acc,p) => acc + (!!p && !!p.get ? p.get('count', 0) : 0), 0) + ` ${this.props.slotUnit}`;
    }
}

DeliveryDetail.propTypes = {
    products: PropTypes.object,
    slotUnit: PropTypes.string,
    storeAddress: PropTypes.string,
    shippingAddress: PropTypes.string,
    shippingAddressNote: PropTypes.string,
    userName: PropTypes.string,
    userPhone: PropTypes.string,
    originalPrice: PropTypes.number,
    discountPrice: PropTypes.number,
    couponHighlight: PropTypes.string,
    deliveryPrice: PropTypes.number,
    deliveryDiscountPrice: PropTypes.number,
    deliverPromoCode: PropTypes.string,
    finalPrice: PropTypes.number
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dash: {
        width: 1,
        height: 4,
        borderRadius: 1,
        backgroundColor: COLOR_TEXT_GRAY,
        marginVertical: 2
    },
    labelText: {
        color: COLOR_TEXT_INACTIVE
    },
    infoText: {
        color: COLOR_TEXT_BLACK_1,
        fontWeight: 'bold'
    },
    infoDetail: {
        flexDirection: 'row',
        marginTop: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: DIMENSION_PADDING_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5'
    },
    menuDetail: {
        marginTop: DIMENSION_PADDING_SMALL,
        color: COLOR_TEXT_BLACK_1,
        backgroundColor: COLOR_GRAY_BG_2,
        padding: DIMENSION_PADDING_MEDIUM,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        width: '100%'
    },
    labelStyle: {
        fontSize: 14,
        color: '#454545',
        marginBottom: 8,
        marginLeft: DIMENSION_PADDING_MEDIUM
    },
    address: {
        fontSize: 14,
        marginBottom: 16,
        color: '#454545',
        fontWeight: 'bold',
        flex: 1
    },
    placeContainer: {
        backgroundColor: '#ffffff',
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM
    },
    dashList: {
        width: 20,
        marginRight: DIMENSION_PADDING_MEDIUM,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center'
    }
});
