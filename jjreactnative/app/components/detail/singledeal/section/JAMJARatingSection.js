import React, { Component } from 'react';
import { Text } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import JJIcon from '../../../common/JJIcon'
import {COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from '../../../../resources/colors';
import HeaderSection from '../../../common/HeaderSection';
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER, DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import {BaseComponent} from "../../../common/BaseComponent";

export default class JAMJARatingSection extends BaseComponent {

    _goToRateDetail = () => {
        this.props.navigation.navigate('RateDetail', { deal: this.props.deal.toJS() });
    }

    render() {
        if (this.props.deal.get('average_rate_value', 0) > 0) {
            return (
                <View style={{ backgroundColor: 'white' }}>

                    {/* Header */}
                    <HeaderSection
                        title={'Đánh giá khuyến mãi'}
                    />

                    {/* Description */}
                    <TouchableOpacity
                        onPress={this._goToRateDetail}
                        style={{ flexDirection: 'row', padding: DIMENSION_PADDING_MEDIUM }}>

                        <View style={{
                            flexDirection: 'row',
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            paddingTop: DIMENSION_PADDING_SMALL,
                            paddingBottom: DIMENSION_PADDING_SMALL,
                            backgroundColor: COLOR_PRIMARY,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: DIMENSION_PADDING_SMALL,
                            paddingLeft: DIMENSION_PADDING_SMALL,
                            marginRight: DIMENSION_PADDING_SMALL,
                        }}>
                            <JJIcon name={"star_full"}
                                    size={16}
                                    color='white' />
                            <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                                {this.props.deal.get('average_rate_value', 0).toFixed(1)}
                            </Text>
                            <Text style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', fontSize: DIMENSION_TEXT_SUB }}>
                                /5
                            </Text>
                        </View>

                        <View>
                            <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}>
                                {this.props.deal.get('total_rated_count', 0)} đánh giá
                            </Text>
                            <Text style={{ color: COLOR_TEXT_INACTIVE, marginTop: 2, fontSize: DIMENSION_TEXT_CONTENT }}>
                                Từ {this.props.deal.get('unique_rated_count', 0)} người dùng JAMJA
                            </Text>
                        </View>

                        <JJIcon name={"chevron_right_o"}
                                size={10}
                                color={COLOR_TEXT_INACTIVE}
                                style={{ position: 'absolute', right: 16, alignSelf: 'center' }} />

                    </TouchableOpacity>

                    {/* Bottom space */}
                    <View style={{ backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE }}/>

                </View >
            )
        } else {
            return null;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.deal !== undefined && this.props.deal === undefined;
    }
}

JAMJARatingSection.propTypes = {
    deal: PropTypes.object,
    navigation: PropTypes.object
}



