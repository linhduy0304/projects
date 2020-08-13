import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'

import {BaseComponent} from "../BaseComponent";
import {StringUtil} from "../../../utils/string-util";
import {CommonUtil} from "../../../utils/common-utils";
import {AnalyticsUtil} from '../../../components/common/analytics/analytics'
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

const {width} = Dimensions.get('window');
const height = 75*(width/320);

export default class ImageBanner extends BaseComponent {

    render() {
        if (!this.props.banner) return null;

        return (
            <TouchableOpacity
                style={{
                    width,
                    height
                }}
                activeOpacity={0.8}
                onPress={this._onBannerClicked}>
                <FastImage
                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.banner.getIn(['image', 'link'], ''), width))}
                    style={{
                        width,
                        height
                    }}
                    resizeMode={FastImage.resizeMode.cover}/>
            </TouchableOpacity>
        )
    }

    _onBannerClicked = () => {
        if (StringUtil.isEmpty(this.props.banner)) return;
        this._logClicked();

        const deeplink = this.props.banner.get('deeplink');

        if (!StringUtil.isEmpty(deeplink)) {
            CommonUtil.openLink(this.props.navigation, deeplink);
            return;
        }

        const targetUrl = this.props.banner.get('target_url');
        if (!StringUtil.isEmpty(targetUrl)) {
            CommonUtil.openLink(this.props.navigation, targetUrl);
        }
    }

    _logClicked = () => {
        try {
            AnalyticsUtil.logNormalEvent(
                'banner_clicked',
                {
                    position: this.props.banner.getIn(['banner_position', 'display']),
                    name: this.props.banner.getIn(['banner_position', 'name'])
                },
                'banner'
            )
        } catch (e) {
            console.log(e);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.banner && !this.props.banner) return true;
        if (!nextProps.banner && !!this.props.banner) return true;
        if (!nextProps.banner.equals(this.props.banner)) return true;
        return false;
    }
}

ImageBanner.propTypes = {
    navigation: PropTypes.any,
    banner: PropTypes.any
}