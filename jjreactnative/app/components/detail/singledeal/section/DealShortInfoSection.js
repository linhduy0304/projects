import React from 'react'
import PropTypes from 'prop-types'
import {Easing, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "native-base";
import moment from 'moment/min/moment-with-locales';

import {BaseComponent} from "../../../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import {COLOR_TEXT_BLACK_1} from "../../../../resources/colors";
import {StringUtil} from '../../../../utils/string-util'
import {DateUtil} from "../../../../utils/date-utils";
import Popover from "react-native-popover-view";
import {DEAL_TYPE_MOVIE} from "../../../../const";

moment.locale('vi');

export default class DealShortInfoSection extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isShowRemainDayPopover: false
        }
    }


    render() {

        let store = '';
        if (this.props.storeCount > 0) {
            store = `${this.props.storeCount} ${this.props.dealType === DEAL_TYPE_MOVIE ? 'Rạp áp dụng' : 'Cửa hàng áp dụng'}`;
        }
        else if (!StringUtil.isEmpty(this.props.onlineStore)) {
            store = 'Áp dụng trực tuyến';
        }

        return (
            <View style={{
                marginLeft: DIMENSION_PADDING_SMALL,
                marginRight: DIMENSION_PADDING_SMALL,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <TouchableOpacity
                    onPress={this.props.onOpenApplyStoreClicked}
                    style={{
                        paddingTop: DIMENSION_PADDING_SMALL,
                        paddingRight: DIMENSION_PADDING_SMALL,
                        paddingBottom: DIMENSION_PADDING_SMALL
                    }}>
                    <Text style={styles.textContent}>
                        {store}
                    </Text>
                </TouchableOpacity>

                {
                    this.props.productCount > 0 &&
                    <TouchableOpacity
                        onPress={this.props.onOpenProductListClicked}
                        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={styles.textContent}>•</Text>
                        <Text style={[styles.textContent, styles.button]}>
                            {this.props.productCount} Sản phẩm
                        </Text>
                    </TouchableOpacity>
                    ||
                    <View style={{flex: 1}}/>
                }

                <TouchableOpacity
                    ref={this._onRef}
                    onPress={this._onRemainTimeClicked}
                    style={{
                        paddingTop: DIMENSION_PADDING_SMALL,
                        paddingLeft: DIMENSION_PADDING_SMALL,
                        paddingBottom: DIMENSION_PADDING_SMALL
                    }}>
                    <Text style={styles.textContent}>
                        {this._getRemainTime()}
                    </Text>
                </TouchableOpacity>

                <Popover
                    popoverStyle={{ backgroundColor: '#3399ff' }}
                    isVisible={this.state.isShowRemainDayPopover}
                    placement={'top'}
                    fromView={this.remainInfo}
                    showBackground={false}
                    animationConfig={{ duration: 100, easing: Easing.inOut(Easing.linear) }}
                    onClose={this._onCloseRemainDayPopover}>

                    <Text style={{ padding: DIMENSION_PADDING_MEDIUM, borderRadius: DIMENSION_RADIUS_MEDIUM, color: 'white', fontSize: DIMENSION_TEXT_CONTENT }}>
                        Khuyến mãi hết hạn: {moment.utc(this.props.endValidTime).local().format('HH:mm, DD/MM/YYYY')}
                    </Text>
                </Popover>

            </View>
        )
    }

    _onRef = (ref) => this.remainInfo = ref;

    _getRemainTime = () => {
        const endDate = moment.utc(this.props.endValidTime).local();
        return DateUtil.getDealTimeRemain(endDate);
    }

    _onRemainTimeClicked = () => this.setState({ isShowRemainDayPopover: true});

    _onCloseRemainDayPopover = () => this.setState({ isShowRemainDayPopover: false});

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.dealSlug !== undefined && this.props.dealSlug === undefined) return true;
        if (nextProps.dealSlug !== this.props.dealSlug) return true;
        if (nextState.isShowRemainDayPopover !== this.state.isShowRemainDayPopover) return true;
        return false;
    }
}

DealShortInfoSection.propTypes = {
    dealSlug: PropTypes.any,
    storeCount: PropTypes.any,
    onlineStore: PropTypes.any,
    productCount: PropTypes.any,
    endValidTime: PropTypes.any,
    dealType: PropTypes.any,
    onOpenApplyStoreClicked: PropTypes.any,
    onOpenProductListClicked: PropTypes.any
};

const styles = StyleSheet.create({
    button: {
        padding: DIMENSION_PADDING_SMALL
    },
    textContent: {
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_SUB
    },
})

