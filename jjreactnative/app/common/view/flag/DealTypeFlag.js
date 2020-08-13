import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'

import {DEAL_TYPE_ECOUPON, DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from '../../../const';
import JJIcon from '../icon/JJIcon';
import {DIMENSION_PADDING_TINY, DIMENSION_TEXT_UNDER_TINY} from "../../../resources/dimens";
import {COLOR_TEXT_BLACK_1} from "../../../resources/colors";
import {BaseComponent} from "../../base/BaseComponent";
import DeliveryFlag from './DeliveryFlag';

export default class DealTypeFlag extends BaseComponent {

    state = {
        icon: 'info_o',
        text: 'Tổng hợp'
    };

    constructor(props) {
        super(props);
        this.state = this._getNewState(props.deal_type);
    }

    render() {

        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.dealTypeLayout}>
                    <JJIcon
                        name={this.state.icon}
                        color={COLOR_TEXT_BLACK_1}
                        size={DIMENSION_TEXT_UNDER_TINY}/>

                    <Text style={styles.text}>
                        {this.state.text}
                    </Text>
                </View>
                {
                    !!this.props.isDelivery &&
                    <DeliveryFlag style={{marginLeft: DIMENSION_PADDING_TINY}}/>
                }
            </View>
        )
    }

    _getNewState = (deal_type) => {
        let icon = 'info_o';
        let text = 'Tổng hợp';

        if (deal_type === DEAL_TYPE_EXCLUSIVE) {
            icon = 'ticket_o';
            text = 'Lấy mã';
        }
        else if (deal_type === DEAL_TYPE_LAST_MIN || deal_type === DEAL_TYPE_MOVIE) {
            icon = 'booking_o';
            text = 'Đặt chỗ';
        }
        else if (deal_type === DEAL_TYPE_ECOUPON) {
            icon = 'online_web_o';
            text = 'Mua online';
        }
        return {
            icon,
            text
        }
    };

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return nextState.icon !== this.state.icon || nextState.text !== this.state.text || nextProps.isDelivery !== this.props.isDelivery;
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (nextProps.deal_type !== this.props.deal_type) {
            this.setState(this._getNewState(nextProps.deal_type));
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dealTypeLayout: {
        flexDirection: 'row',
        paddingLeft: DIMENSION_PADDING_TINY,
        paddingRight: DIMENSION_PADDING_TINY,
        borderColor: 'white',
        alignItems: 'center',
        borderRadius: DIMENSION_PADDING_TINY,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    text: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_UNDER_TINY,
        fontWeight: 'bold',
        marginLeft: 2,
        marginBottom: 1
    }
});


DealTypeFlag.propTypes = {
    deal_type: PropTypes.any,
    isDelivery: PropTypes.bool,
    style: PropTypes.any
}
