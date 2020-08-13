import {View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'
import {Text} from 'native-base'

import FixedItemGrid from './FixedItemGrid';
import {BaseComponent} from "../BaseComponent";
import FixedGridPlaceholder from './FixedGridPlaceholder'
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import {COLOR_GRAY_BG} from "../../../resources/colors";
import SvgUri from '../../common/svgUri/index'
import JJIcon from '../../common/JJIcon'
import {AnalyticsUtil} from '../../common/analytics/analytics'
import {StringUtil} from '../../../utils/string-util'
import {CommonUtil} from '../../../utils/common-utils'

const width = Dimensions.get("window").width;
const bigItemWidth = width - 16;
const bigItemHeight = width / 2;
const smallItemWidth = bigItemWidth/2 - 1.5;
const smallItemHeight = bigItemHeight * 0.6;

export default class FixedGrid extends BaseComponent {

    render() {

        const { deals } = this.props;
        if (deals === undefined || deals === null || deals.size < 1) return <FixedGridPlaceholder/>;

        if (deals.size === 1) {
            return (
                <View style={{width}}>
                    <View style={[styles.container, {minHeight: bigItemHeight, backgroundColor: this.props.backgroundColor}]}>
                        <FixedItemGrid
                            navigation={this.props.navigation}
                            width={bigItemWidth}
                            path={this.props.path}
                            deal={deals.get(0)} />
                    </View>
                    {
                        !!this.props.isBrandDay &&
                        this._renderBrandDetailFooter()
                    }
                </View>
            )
        }
        if (deals.size === 2) {
            return (
                <View style={{width}}>
                    <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
                        <View
                            style={{
                                width: '100%',
                                height: bigItemHeight
                            }}>
                            <FixedItemGrid
                                navigation={this.props.navigation}
                                width={bigItemWidth}
                                path={this.props.path}
                                deal={deals.get(0)} />
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: smallItemHeight,
                                marginTop: DIMENSION_PADDING_SMALL
                            }}>
                            <FixedItemGrid
                                navigation={this.props.navigation}
                                width={bigItemWidth}
                                path={this.props.path}
                                deal={deals.get(1)}
                                smallItem={true}/>
                        </View>
                    </View>
                    {
                        !!this.props.isBrandDay &&
                        this._renderBrandDetailFooter()
                    }
                </View>
            )
        }

        return (
            <View style={{width}}>
                <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
                    <View style={{width: '100%', height: bigItemHeight}}>
                        <FixedItemGrid
                            navigation={this.props.navigation}
                            width={bigItemWidth}
                            path={this.props.path}
                            deal={deals.get(0)} />
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: smallItemHeight,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: DIMENSION_PADDING_SMALL,
                        }}>
                        <FixedItemGrid
                            navigation={this.props.navigation}
                            width={smallItemWidth}
                            path={this.props.path}
                            deal={deals.get(1)}
                            smallItem={true}/>

                        <FixedItemGrid
                            navigation={this.props.navigation}
                            width={smallItemWidth}
                            path={this.props.path}
                            deal={deals.get(2)}
                            smallItem={true}/>
                    </View>
                </View>
                {
                    !!this.props.isBrandDay &&
                    this._renderBrandDetailFooter()
                }
            </View>
        )
    }

    _renderBrandDetailFooter = () => {
        const ovalHeight = 16*(width/375);
        return (
            <View
                style={{
                    minHeight: 32,
                    width,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <SvgUri
                    style={{
                        position: 'absolute',
                        top: -1,
                        left: 0,
                        right: 0,
                        alignItems: 'center'
                    }}
                    width={width}
                    height={ovalHeight}
                    svgXmlData={'<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 16">' +
                    '<path d="M375,0.1C327.7,8.6,276,14,221.5,15.6h-68C99,14,47.3,8.6,0,0.1H375z" fill="white"/></svg>'}
                    fill={this.props.backgroundColor}/>

                <TouchableOpacity
                    style={{
                        marginTop: 2,
                        marginBottom: 2,
                        paddingLeft: DIMENSION_PADDING_SMALL,
                        paddingRight: DIMENSION_PADDING_SMALL,
                        paddingTop: 2,
                        paddingBottom: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: this.props.detailButtonColor,
                        borderWidth: 1,
                        borderColor: COLOR_GRAY_BG,
                        borderRadius: 12
                    }}
                    activeOpacity={0.9}
                    onPress={this._openBrandDayDetail}>

                    <Text
                        style={{
                            color: this.props.detailButtonTextColor,
                            fontSize: DIMENSION_TEXT_CONTENT
                        }}>
                        {this.props.detailButtonText}
                    </Text>

                    <JJIcon
                        style={{marginLeft: DIMENSION_PADDING_TINY}}
                        color={this.props.detailButtonTextColor}
                        size={8}
                        name={'chevron_right_o'}
                    />

                </TouchableOpacity>

            </View>
        )
    }

    _openBrandDayDetail = () => {
        const brandSlug = this.props.deals.getIn([0, 'brand', 'brand_slug'], '');
        AnalyticsUtil.logNormalEvent(
            'brand_day_open_detail',
            {
                item_brand: brandSlug
            },
            'brand_day'
        );

        if (!StringUtil.isEmpty(this.props.brandDetailDeeplink)) {
            CommonUtil.openLink(this.props.navigation, this.props.brandDetailDeeplink);
        }

        else if (!StringUtil.isEmpty(this.props.brandDetailUrl)) {
            CommonUtil.openLink(this.props.navigation, this.props.brandDetailUrl);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (!!nextProps.deals && !nextProps.deals.equals(this.props.deals)) ||
            nextProps.backgroundColor !== this.props.backgroundColor ||
            nextProps.detailButtonColor !== this.props.detailButtonColor ||
            nextProps.detailButtonTextColor !== this.props.detailButtonTextColor ||
            nextProps.detailButtonText !== this.props.detailButtonText ||
            nextProps.brandDetailUrl !== this.props.brandDetailUrl ||
            nextProps.brandDetailDeeplink !== this.props.brandDetailDeeplink;
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        padding: DIMENSION_PADDING_SMALL,
        flexDirection: 'column',
        flex: 1
    }
})

FixedGrid.defaultProps = {
    backgroundColor: COLOR_GRAY_BG,
    detailButtonColor: '#fff',
    detailButtonTextColor: '#fff'
}

FixedGrid.propTypes = {
    deals: PropTypes.any,
    path: PropTypes.any,
    navigation: PropTypes.any,
    isBrandDay: PropTypes.any,
    backgroundColor: PropTypes.any,
    detailButtonColor: PropTypes.any,
    detailButtonTextColor: PropTypes.any,
    detailButtonText: PropTypes.any,
    brandDetailUrl: PropTypes.any,
    brandDetailDeeplink: PropTypes.any
};