import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View} from 'react-native'
import FastImage from 'react-native-fast-image'

import {StringUtil} from '../../utils/string-util'
import {BasePureComponent} from "../common/BasePureComponent";
import FadeInView from '../common/view/FadeInView'
import {CommonUtil} from "../../utils/common-utils";
import {AnalyticsUtil} from "../common/analytics/analytics";
import JJIcon from '../common/JJIcon'
import {DIMENSION_PADDING_SMALL} from "../../resources/dimens";
import {ConfigDb} from '../../api/storage/ConfigDb'
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

export default class PopupBanner300x400 extends BasePureComponent {

    constructor(props) {
        super(props);

        this.state = {
            canShow: false
        };

        if (!!props.banner) {
            const url = StringUtil.addSizeToImageUrl(this.props.banner.getIn(['image', 'link'], ''), 300);
            FastImage.preload([
                {
                    uri: url
                }
            ]);
        }
    }

    render() {

        console.log('PopupBanner300x400:render', this.props);

        if (StringUtil.isEmpty(this.props.banner) || !this.state.canShow) return null;

        return (
            <FadeInView
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }}>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    activeOpacity={1}
                    onPress={this.props.onCloseBanner}>

                        <TouchableOpacity
                            onPress={this._onOpenBannerDetail}
                            activeOpacity={0.9}>
                            <FastImage
                                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.banner.getIn(['image', 'link'], ''), 300))}
                                style={{
                                    width: 300,
                                    height: 400
                                }}
                                resizeMode={FastImage.resizeMode.cover}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._onCloseBannerClicked}
                            activeOpacity={0.8}
                            style={{
                                padding: DIMENSION_PADDING_SMALL
                            }}>
                            <View
                                style={{
                                    width: 32,
                                    height: 32,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 16,
                                    borderWidth: 1,
                                    borderColor: 'white'
                                }}>
                                <JJIcon
                                    color={'white'}
                                    size={12}
                                    name={'x_o'}/>
                            </View>
                        </TouchableOpacity>
                </TouchableOpacity>
            </FadeInView>
        )
    }

    componentDidMount() {
        super.componentDidMount();

        setTimeout(() => {
            this.setState({
                canShow: true
            });
        }, 1000)
    }

    _onCloseBannerClicked = () => {
        this._logBannerCloseClicked();
        this._closeBannerAfterVisible();
    }

    _logBannerDetailClicked = () => {
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

    _logBannerCloseClicked = () => {
        try {
            AnalyticsUtil.logNormalEvent(
                'banner_closed',
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

    _closeBannerAfterVisible = () => {
        ConfigDb.bannerVisible(this.props.banner.get('id'));
        !!this.props.onCloseBanner && this.props.onCloseBanner();
    }

    _onOpenBannerDetail = () => {
        if (StringUtil.isEmpty(this.props.banner)) return;
        this._logBannerDetailClicked();

        const deeplink = this.props.banner.get('deeplink');

        if (!StringUtil.isEmpty(deeplink)) {
            CommonUtil.openLink(this.props.navigation, deeplink);
            this._closeBannerAfterVisible();
            return;
        }

        const targetUrl = this.props.banner.get('target_url');
        if (!StringUtil.isEmpty(targetUrl)) {
            CommonUtil.openLink(this.props.navigation, targetUrl);
            this._closeBannerAfterVisible();
        }
    }
}

PopupBanner300x400.propTypes = {
    banner: PropTypes.any,
    navigation: PropTypes.any,
    onCloseBanner: PropTypes.any
}
