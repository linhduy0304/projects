import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'

import {BaseComponent} from "../BaseComponent";
import {StringUtil} from "../../../utils/string-util";
import {CommonUtil} from "../../../utils/common-utils";
import {AnalyticsUtil} from "../analytics/analytics";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

export default class TextBoxSearchBanner extends BaseComponent {

    render() {
        if (!this.props.banner) return null;

        return (
            <TouchableOpacity
                style={{
                    width: 32,
                    height: 32,
                    position: 'absolute',
                    right: 6
                }}
                activeOpacity={0.8}
                onPress={this._onBannerClicked}>
                <FastImage
                    source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.banner.getIn(['image', 'link'], ''), 32, 32))}
                    style={{
                        width: 32,
                        height: 32
                    }}
                    resizeMode={FastImage.resizeMode.contain}/>
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
            return;
        }

        this.props.navigation.navigate('SearchDeal');
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

TextBoxSearchBanner.propTypes = {
    navigation: PropTypes.any,
    banner: PropTypes.any
}