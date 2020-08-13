import { View, StyleSheet, TouchableOpacity, Clipboard, Share, Alert } from 'react-native';
import { ShareDialog, MessageDialog } from 'react-native-fbsdk';
import { Text } from 'native-base';
import React from 'react';
import PropTypes from 'prop-types';
import JJIcon from '../../../common/JJIcon'
import {StringUtil} from '../../../../utils/string-util'

import {COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../../../resources/colors";
import {
    DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import {BaseComponent} from "../../../common/BaseComponent";
import {Toast} from '../../../common/alert/Toast'

export default class ShareActionSection extends BaseComponent {

    render() {
        if (this.props.deal) {
            return (
                <View>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingTop: DIMENSION_PADDING_MEDIUM, paddingBottom: DIMENSION_PADDING_MEDIUM }}>
                        <TouchableOpacity style={[styles.cell, { paddingLeft: DIMENSION_PADDING_MEDIUM }]}>
                            <Text style={{ width: '100%', textAlign: 'left', fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER, color: COLOR_TEXT_BLACK_1 }}>
                                {StringUtil.numberFormat(this.props.deal.get('share_count', 0))}
                            </Text>
                            <Text style={{ width: '100%', textAlign: 'left', fontSize: DIMENSION_TEXT_SUB, color: COLOR_TEXT_BLACK_1, marginBottom: 2}}>
                                Chia sẻ
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._sendUrlToMessenger}
                            style={[styles.cell, { backgroundColor: '#0083FF' }]}>
                            <JJIcon name={'messenger_square_o'}
                                    color={'white'}
                                    size={16} />
                            <Text style={styles.label}>
                                Messenger
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._shareUrlToFacebook}
                            style={[styles.cell, { backgroundColor: '#3A5998' }]}>
                            <JJIcon name={'facebook_o'}
                                    color={'white'}
                                    size={16} />
                            <Text style={styles.label}>
                                Facebook
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._copyUrlToClipBoard}
                            style={[styles.cell, { backgroundColor: COLOR_PRIMARY }]}>
                            <JJIcon name={'link_o'}
                                    color={'white'}
                                    size={16} />
                            <Text style={styles.label}>
                                Copy
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this._shareDealUrl}
                            style={[styles.cell, { backgroundColor: '#999999' }]}>
                            <JJIcon name={'more_horizontal_o'}
                                    color={'white'}
                                    size={16} />
                            <Text style={styles.label}>
                                Khác...
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE}}/>
                </View>
            )
        } else {
            return null
        }
    }
    _shareDealUrl = () => {
        if (!!this.props.onSharePressed) this.props.onSharePressed();
        Share.share({
            message: this.props.deal.get('share_url', ''),
            url: this.props.deal.get('share_url', '')
        })
    }

    _copyUrlToClipBoard = () => {
        if (!!this.props.onSharePressed) this.props.onSharePressed();
        Clipboard.setString(this.props.deal.get('share_url', ''));
        Toast.showToast('Đã copy');
    }

    _shareUrlToFacebook = () => {
        let shareLinkContent = {
            contentType: 'link',
            contentUrl: this.props.deal.get('share_url', ''),
        }
        ShareDialog.canShow(shareLinkContent)
            .then(canShow => {
                if (canShow) {
                    if (!!this.props.onSharePressed) this.props.onSharePressed();
                    return ShareDialog.show(shareLinkContent);
                }
                Alert.alert(
                    'Lưu ý',
                    'Bạn cần cài đặt Facebook để sử dụng tính năng này!'
                )
            })
            .catch(error => {
                console.log(error);
                Alert.alert(
                    'Lưu ý',
                    'Bạn cần cài đặt Facebook để sử dụng tính năng này!'
                )
            })
    }

    _sendUrlToMessenger = () => {
        let shareLinkContent = {
            contentType: 'link',
            contentUrl: this.props.deal.get('share_url', ''),
        }
        MessageDialog.canShow(shareLinkContent)
            .then(canShow => {
                if (canShow) {
                    if (!!this.props.onSharePressed) this.props.onSharePressed();
                    return MessageDialog.show(shareLinkContent);
                }
                Alert.alert(
                    'Lưu ý',
                    'Bạn cần cài đặt Facebook Messenger để sử dụng tính năng này!'
                )
            })
            .catch(error => {
                console.log(error);
                Alert.alert(
                    'Lưu ý',
                    'Bạn cần cài đặt Facebook Messenger để sử dụng tính năng này!'
                )
            })
    }


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.deal !== undefined && this.props.deal === undefined ||
            (nextProps.deal && this.props.deal && nextProps.deal.get('share_count', 0) !== this.props.deal.get('share_count', 0));
    }

}

ShareActionSection.propTypes = {
    deal: PropTypes.any,
    onSharePressed: PropTypes.any
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingRight: 4,
        paddingLeft: 4,
        paddingTop: 10,
    },
    label: {
        color: 'white',
        fontSize: 12
    },
});
