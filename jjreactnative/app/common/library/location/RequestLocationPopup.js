import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import Text from '../../view/text/JJText';
import {BasePureComponent} from "../../base/BasePureComponent";
import {styles} from './styles';
import FadeInView from '../../view/FadeInView';
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import ButtonFilled from '../../view/button/ButtonFilled';
import {AnalyticsHelper} from '../../analytics';

export default class RequestLocationPopup extends BasePureComponent {

    render() {

        return (
            <FadeInView style={styles.requestLocationPopupContainer} duration={500}>
                <TouchableOpacity
                    style={{flex: 1, justifyContent: 'center'}}
                    onPress={this.props.onClosePress}
                    activeOpacity={0.9}>

                    <View style={styles.requestLocationPopupContent}>

                        <FastImage
                            style={{
                                width: 64,
                                height: 64,
                                alignSelf: 'center'
                            }}
                            source={require('../../../resources/icon/compress/ic_satellite.png')}
                            resizeMode={FastImage.resizeMode.contain}/>

                        <Text style={styles.requestLocationPopupTitle}>
                            Không xác định được vị trí của bạn!
                        </Text>

                        <Text style={{alignSelf: 'center', textAlign: 'center'}}>
                            Để Sử dụng mã, vui lòng cho phép JAMJA truy cập vị trí của bạn
                        </Text>

                        <ButtonFilled
                            style={{
                                marginTop: DIMENSION_PADDING_MEDIUM
                            }}
                            title={'BẬT ĐỊNH VỊ'}
                            onPress={this.props.onOpenPress}/>
                    </View>
                </TouchableOpacity>
            </FadeInView>
        )
    }

    componentDidMount() {
        super.componentDidMount();

        AnalyticsHelper.trackItemImpression(
            this.props.situation,
            'show_popup_request_location_services'
        )
    }
}

RequestLocationPopup.propTypes = {
    situation: PropTypes.object,
    onOpenPress: PropTypes.func,
    onClosePress: PropTypes.func
}