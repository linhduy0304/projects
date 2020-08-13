import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import PropTypes from 'prop-types'
import Svg, {Circle} from 'react-native-svg'
import {
    DIMENSION_PADDING_EXTRA,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_SUB
} from "../../../../../resources/dimens";
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";
import JJIcon from "../../../../common/JJIcon";
import {AnalyticsUtil} from "../../../../common/analytics/analytics";

export default class PromoCode extends React.Component {

    render() {

        const deal = this.props.deal;
        console.log('----------------- render promode +++++++++++')

        return (
            <View style={{padding: DIMENSION_PADDING_MEDIUM}}>

                <View style={styles.promoCodeBackground}>
                    <TouchableOpacity
                        style={{
                            padding: DIMENSION_PADDING_SMALL,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50
                        }}
                        onPress={this._onCopyPromoCodeClicked}>
                        <JJIcon color={COLOR_TEXT_INACTIVE}
                                size={16}
                                name={'copy_o'}/>
                        <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB}}>
                            Copy
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        paddingLeft: DIMENSION_PADDING_MEDIUM,
                        paddingRight: DIMENSION_PADDING_MEDIUM,
                        justifyContent: 'center',
                        flex: 1
                    }}
                                      onPress={this._onOpenPromoCodeDetailClicked}>
                        <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT}}
                              numberOfLines={1}>
                            Nhập:
                            <Text style={{color: '#4BC731', fontWeight: 'bold', fontSize: DIMENSION_TEXT_CONTENT}}>
                                {' ' + deal.getIn(['promocode', 'code_name'], '') + ' '}
                            </Text>
                            -
                            <Text style={{color: '#EF863B', fontWeight: 'bold', fontSize: DIMENSION_TEXT_CONTENT}}>
                                {' ' + deal.getIn(['promocode', 'description'], '')}
                            </Text>
                        </Text>
                        <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB}}
                              numberOfLines={1}>
                            *Nhập mã sau khi chọn thời gian đặt chỗ
                        </Text>
                    </TouchableOpacity>

                    <JJIcon name={'chevron_right_o'}
                            size={12}
                            color={COLOR_TEXT_INACTIVE}
                            style={{
                                position: 'absolute',
                                right: DIMENSION_PADDING_MEDIUM,
                                top: DIMENSION_PADDING_MEDIUM + DIMENSION_PADDING_TINY
                            }}/>
                </View>

                <Svg height={52} width={10} viewBox={'0 0 4 52'}
                     style={{position: 'absolute', top: DIMENSION_PADDING_MEDIUM, left: 68}}>
                    <Circle cx={2} cy={0} r={3} fill={COLOR_GRAY_BG}/>
                    <Circle cx={2} cy={10.5} r={3} fill={COLOR_GRAY_BG}/>
                    <Circle cx={2} cy={21} r={3} fill={COLOR_GRAY_BG}/>
                    <Circle cx={2} cy={31.5} r={3} fill={COLOR_GRAY_BG}/>
                    <Circle cx={2} cy={42} r={3} fill={COLOR_GRAY_BG}/>
                    <Circle cx={2} cy={52.5} r={3} fill={COLOR_GRAY_BG}/>
                </Svg>

                <View style={[styles.promoCodeDot, {left: DIMENSION_PADDING_SMALL}]}/>
                <View style={[styles.promoCodeDot, {right: DIMENSION_PADDING_SMALL}]}/>

            </View>
        )
    }

    _onCopyPromoCodeClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'copy_promo_code',
            baseLogParams,
            'deal_detail'
        );

        if (!this.props.deal.getIn(['promocode', 'id'])) return;
        if (this.props.listener) this.props.listener.onPromoCodeDetailListener(this.props.deal.get('promocode'), 'copy');
    }

    _onOpenPromoCodeDetailClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'click_view_detail_promo_code',
            baseLogParams,
            'deal_detail'
        );

        if (!this.props.deal.getIn(['promocode', 'id'])) return;
        if (this.props.listener) this.props.listener.openPromoCodeDetail(this.props.deal.get('promocode'), 'copy');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.deal.get('promocode') && !nextProps.deal.get('promocode').equals(this.props.deal.get('promocode'));
    }
}

PromoCode.propTypes = {
    deal: PropTypes.object,
    navigation: PropTypes.object,
    listener: PropTypes.object
}

const styles = StyleSheet.create({
    promoCodeBackground: {
        backgroundColor: '#FFE7D1',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        width: '100%',
        height: 52,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    promoCodeDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        top: DIMENSION_PADDING_EXTRA + 1,
        backgroundColor: COLOR_GRAY_BG,
        position: 'absolute'
    }
})