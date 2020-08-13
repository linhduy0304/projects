import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import Text from '../../common/view/text/JJText';
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import ButtonFilled from '../../common/view/button/ButtonFilled';
import {COLOR_PRIMARY} from "../../resources/colors";
import {BasePureComponent} from "../../common/base/BasePureComponent";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";
import {getQRCodeUrl} from "../../utils/Utils";

export default class RedeemSuccessPopup extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {

        if (!this.state.visible) return null;

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.textMessage}>
                        Mã đặt chỗ của bạn đã được kích hoạt, vui lòng cung cấp mã đặt chỗ dưới đây cho cửa hàng để được áp dụng khuyến mãi.
                    </Text>

                    <FastImage
                        source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(this.state.code, 144))}
                        style={{height: 72, width: 72}}
                        resizeMode={FastImage.resizeMode.contain}/>

                    <Text style={{color:COLOR_PRIMARY, fontWeight: 'bold', fontSize: 16, padding: 16, textAlign: 'center'}}>
                        {this.state.code}
                    </Text>

                    <ButtonFilled
                        style={{width: '100%'}}
                        onPress={this._onPress}
                        backgroundColor={COLOR_PRIMARY}
                        title={'OK'}
                        textColor={'white'}/>
                </View>
            </View>
        )
    }

    show(code) {
        if (!this.mounted) return;
        this.setState({
            visible: true,
            code: code
        })
    }

    _onPress = () => {
        !!this.props.onPress && this.props.onPress();
    }
}

RedeemSuccessPopup.propTypes = {
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: DIMENSION_PADDING_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMessage: {
        textAlign: 'center',
        marginBottom: DIMENSION_PADDING_MEDIUM
    }

});