import React from 'react'
import {View, Dimensions, TouchableOpacity} from 'react-native'
import PropsTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import {BasePureComponent} from "../../../common/base/BasePureComponent";
import {StringUtil} from '../../../utils/string-util'
import {AnalyticsUtil} from "../../common/analytics/analytics";
import {CommonUtil} from "../../../utils/common-utils";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

const {width} = Dimensions.get('window');//750x360
const height = (width/750)*360;
export default class BrandDayHeader extends BasePureComponent {

    render() {

        return (
            <View
                style={{
                    width: '100%',
                    backgroundColor: this.props.backgroundColor
                }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this._onPressedBrandDayBanner}>
                    <FastImage
                        source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.image, width))}
                        style={{
                            width,
                            height
                        }}
                        resizeMode={FastImage.resizeMode.cover}/>
                </TouchableOpacity>
            </View>
        )
    }

    _onPressedBrandDayBanner = () => {
        if (!StringUtil.isEmpty(this.props.brandSlug)) {
            AnalyticsUtil.logNormalEvent(
                'brand_day_open_detail',
                {
                    item_brand: this.props.brandSlug
                },
                'brand_day'
            );
        }

        if (!StringUtil.isEmpty(this.props.brandDetailDeeplink)) {
            CommonUtil.openLink(this.props.navigation, this.props.brandDetailDeeplink);
        }

        else if (!StringUtil.isEmpty(this.props.brandDetailUrl)) {
            CommonUtil.openLink(this.props.navigation, this.props.brandDetailUrl);
        }
    }
}

BrandDayHeader.defaultProps = {
    backgroundColor: 'white'
}

BrandDayHeader.propTypes = {
    image: PropsTypes.any,
    backgroundColor: PropsTypes.any,
    brandDetailDeeplink: PropsTypes.any,
    brandDetailUrl: PropsTypes.any,
    brandSlug: PropsTypes.any,
    navigation: PropsTypes.any,
}