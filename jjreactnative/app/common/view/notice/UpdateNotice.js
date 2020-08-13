import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../base/BasePureComponent";
import Text from '../text/JJText';
import {styles} from './styles';
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import {COLOR_TEXT_INACTIVE} from "../../../resources/colors";

export default class UpdateNotice extends BasePureComponent {

    render() {
        return (
            <View style={styles.updateNoticeContainer}>
                <View style={styles.updateNoticeContent}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        THÔNG BÁO
                    </Text>
                    <Text style={{marginTop: DIMENSION_PADDING_MEDIUM, marginBottom: DIMENSION_PADDING_MEDIUM}}>
                        {this.props.message}
                    </Text>
                    <View style={styles.updateNoticeButtonGroup}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.updateNoticeCancelButton}
                            onPress={this.props.onClose}>
                            <Text style={{color: COLOR_TEXT_INACTIVE}}>
                                Đóng
                            </Text>
                        </TouchableOpacity>

                        {/*<TouchableOpacity*/}
                            {/*activeOpacity={0.8}*/}
                            {/*style={styles.updateNoticeAllowButton}*/}
                            {/*onPress={this.props.onAccept}>*/}
                            {/*<Text style={{color: 'white', fontWeight: 'bold'}}>*/}
                                {/*ĐỒNG Ý*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </View>
            </View>
        )
    }
}

UpdateNotice.propTypes = {
    message: PropTypes.string,
    onAccept: PropTypes.func,
    onClose: PropTypes.func
}