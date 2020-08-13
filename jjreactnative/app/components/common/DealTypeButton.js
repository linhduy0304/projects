import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'

import {DEAL_TYPE_ECOUPON, DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from '../../const';
import JJIcon from './JJIcon';
import {DIMENSION_PADDING_TINY, DIMENSION_TEXT_UNDER_TINY} from "../../resources/dimens";
import {BasePureComponent} from "./BasePureComponent";
import {COLOR_TEXT_BLACK_1} from "../../resources/colors";

export default class DealTypeButton extends BasePureComponent {

    render() {

        if (this.props.deal_type === DEAL_TYPE_EXCLUSIVE) {
            return (
                <View style={styles.container}>
                    <JJIcon name={'ticket_o'} color={COLOR_TEXT_BLACK_1} size={DIMENSION_TEXT_UNDER_TINY}/>
                    <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_UNDER_TINY, fontWeight: 'bold', marginLeft: 2, marginBottom: 1}}>
                        Lấy mã
                    </Text>
                </View>
            )
        }
        else if (this.props.deal_type === DEAL_TYPE_LAST_MIN || this.props.deal_type === DEAL_TYPE_MOVIE) {
            return (
                <View style={styles.container}>
                    <JJIcon name={'booking_o'} color={COLOR_TEXT_BLACK_1} size={DIMENSION_TEXT_UNDER_TINY}/>
                    <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_UNDER_TINY, fontWeight: 'bold', marginLeft: 2, marginBottom: 1}}>
                        Đặt chỗ
                    </Text>
                </View>
            )
        }
        else if (this.props.deal_type === DEAL_TYPE_ECOUPON) {
            return (
                <View style={styles.container}>
                    <JJIcon name={'online_web_o'} color={COLOR_TEXT_BLACK_1} size={DIMENSION_TEXT_UNDER_TINY}/>
                    <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_UNDER_TINY, fontWeight: 'bold', marginLeft: 2, marginBottom: 1}}>
                        Mua online
                    </Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <JJIcon name={'info_o'} color={COLOR_TEXT_BLACK_1} size={DIMENSION_TEXT_UNDER_TINY}/>
                    <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_UNDER_TINY, fontWeight: 'bold', marginLeft: 2, marginBottom: 1}}>
                        Tổng hợp
                    </Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: DIMENSION_PADDING_TINY,
        paddingRight: DIMENSION_PADDING_TINY,
        borderColor: 'white',
        alignItems: 'center',
        borderRadius: DIMENSION_PADDING_TINY,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.8)'
    }
});


DealTypeButton.propTypes = {
    deal_type: PropTypes.any
}
