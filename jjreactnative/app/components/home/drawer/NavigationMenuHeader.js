import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from "react-native";
import {Text} from "native-base";
import FastImage from 'react-native-fast-image'

import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_HEADER, DIMENSION_TEXT_HEADER_XX
} from "../../../resources/dimens";
import JJIcon from "../../common/JJIcon";
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../../resources/colors";
import {BaseComponent} from "../../../common/base/BaseComponent";
import {buildAvatarImageSource, IMAGE_INTERNET} from '../../../utils/image-util';

export default class NavigationMenuHeader extends BaseComponent {

    render() {
        if (!!this.props.hasLogin) return this._renderUserInfo();
        return this._renderUnLoggin();
    }

    _renderUnLoggin = () => {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    marginTop: DIMENSION_PADDING_MEDIUM,
                    marginRight: DIMENSION_PADDING_MEDIUM,
                    marginBottom: DIMENSION_PADDING_MEDIUM,
                    marginLeft: DIMENSION_PADDING_MEDIUM,
                    height: DIMENSION_BUTTON_MEDIUM,
                    backgroundColor: COLOR_PRIMARY,
                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                    justifyContent: 'center',
                    paddingLeft: DIMENSION_PADDING_MEDIUM
                }}
                activeOpacity={0.8}>
                <JJIcon name={'log_in_o'}
                        size={DIMENSION_TEXT_HEADER_XX}
                        color={'white'} />
                <Text style={{
                    color: 'white',
                    alignSelf: 'center',
                    position: 'absolute',
                    fontWeight: 'bold',
                    fontSize: DIMENSION_TEXT_HEADER,
                }}>
                    ĐĂNG NHẬP
                </Text>
            </TouchableOpacity>
        )
    }

    _renderUserInfo = () => {
        return (
            <View style={{
                backgroundColor: 'white',
                marginTop: 32,
                paddingLeft: DIMENSION_PADDING_LARGE,
                paddingRight: DIMENSION_PADDING_MEDIUM,
                flexDirection: 'row',
                alignItems: 'center' }}>
                <FastImage
                    style={{ height: 64, width: 64, borderRadius: 32 }}
                    resizeMode={FastImage.resizeMode.contain}
                    source={buildAvatarImageSource(IMAGE_INTERNET, this.props.userAvatar)} />

                <View style={{ marginLeft: DIMENSION_PADDING_MEDIUM }}>
                    <Text style={{ color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER }}>
                        Xin chào!
                    </Text>
                    <Text style={{ color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                        {!!this.props.userName ? this.props.userName : 'JAMJA'}
                    </Text>
                </View>
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.hasLogin !== this.props.hasLogin ||
            nextProps.userName !== this.props.userName ||
            nextProps.userAvatar !== this.props.userAvatar;
    }
}

NavigationMenuHeader.propTypes = {
    hasLogin: PropTypes.any,
    userName: PropTypes.any,
    userAvatar: PropTypes.any,
    onPress: PropTypes.any
}

