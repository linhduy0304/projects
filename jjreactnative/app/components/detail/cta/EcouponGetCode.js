import React from 'react';
import {Text} from 'native-base';
import {
    View,
    Modal,
    TouchableOpacity,
    Platform,
    StyleSheet,
    ScrollView, Share, Clipboard
} from 'react-native';
import PropTypes from 'prop-types'

import JJIcon from "../../common/JJIcon";
import HeaderSection from "../../common/HeaderSection";
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_BUTTON_SMALL, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER, DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import {COLOR_GRAY_BG_2, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import DividerLine from "../../common/DividerLine";
import {MessageDialog, ShareDialog} from "react-native-fbsdk";
import Communications from 'react-native-communications'
import {BasePureComponent} from "../../common/BasePureComponent";
import {AnalyticsUtil} from "../../common/analytics/analytics";
import {getPaddingTopBar} from "../../../utils/common-utils";

const isIOS = Platform.OS === 'ios';
const headerHeight = isIOS ? 44 : 56;
const paddingTopBar = getPaddingTopBar();

export default class EcouponGetCode extends BasePureComponent {

    constructor() {
        super();
        this.state = {
            modalVisible: false
        };
    }

    render() {
        return (
            <Modal visible={this.state.modalVisible !== undefined && this.state.modalVisible}
                   animationType={'slide'}
                   transparent={true}
                   onRequestClose={() => this._actionCloseModal()}>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                }}>

                    <TouchableOpacity style={{
                        width: '100%',
                        height: '35%',
                        backgroundColor: 'transparent',
                        paddingTop: paddingTopBar,
                    }}
                                      onPress={() => this._actionCloseModal()}>
                        <View style={{
                            width: headerHeight,
                            height: headerHeight,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                                >
                            <JJIcon
                                style={{marginBottom: isIOS ? 4 : 0}}
                                name={'chevron_left_o'}
                                color={'gray'}
                                size={16}/>
                        </View>
                    </TouchableOpacity>

                    {this._renderMainContent()}
                </View>
            </Modal>
        )
    }

    _renderMainContent = () => {
        const hasCode = this.props.deal.get('pre_generated_code', []).size > 0;

        return (
            <View style={{flex: 1, backgroundColor: '#ffffff', flexDirection: 'column', height: '65%'}}>
                <HeaderSection
                    customTitle={() => (
                        <Text style={{fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER, color: COLOR_TEXT_BLACK_1}}
                              numberOfLines={1}>
                            {this.props.deal.get('title', '')}
                        </Text>
                    )}
                />
                <ScrollView style={{flex: 1, marginBottom: DIMENSION_BUTTON_MEDIUM + DIMENSION_PADDING_MEDIUM + DIMENSION_PADDING_SMALL}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {
                            hasCode ? this._renderGetCode() : this._renderNoNeedCode()
                        }
                        <Text style={{
                            padding: DIMENSION_PADDING_SMALL,
                            textAlign: 'center',
                            color: COLOR_TEXT_BLACK_1,
                            fontSize: DIMENSION_TEXT_CONTENT,
                            marginTop: DIMENSION_PADDING_SMALL
                        }}>
                            Chia sẻ ưu đãi này
                        </Text>
                        <View style={{
                            flex: 4,
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingRight: DIMENSION_PADDING_MEDIUM,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{flex: 1}}
                                              onPress={this._onShareMessenerClicked}>
                                <View style={[styles.buttonShare, {borderColor: '#0083ff'}]}>
                                    <JJIcon color={'#0083ff'}
                                            name={'messenger_square_o'}
                                            size={12}/>
                                </View>
                                <Text style={{
                                    padding: DIMENSION_PADDING_SMALL,
                                    textAlign: 'center',
                                    color: COLOR_TEXT_BLACK_1,
                                    fontSize: DIMENSION_TEXT_SUB
                                }}
                                      numberOfLines={1}>
                                    Messenger
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex: 1}}
                                              onPress={this._onShareFacebookClicked}>
                                <View style={[styles.buttonShare, {borderColor: '#3b5998'}]}>
                                    <JJIcon color={'#3b5998'}
                                            name={'facebook_o'}
                                            size={12}/>
                                </View>
                                <Text style={{
                                    padding: DIMENSION_PADDING_SMALL,
                                    textAlign: 'center',
                                    color: COLOR_TEXT_BLACK_1,
                                    fontSize: DIMENSION_TEXT_SUB
                                }}
                                      numberOfLines={1}>
                                    Facebook
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex: 1}}
                                              onPress={this._onShareEmailClicked}>
                                <View style={[styles.buttonShare, {borderColor: '#ef863b'}]}>
                                    <JJIcon color={'#ef863b'}
                                            name={'mail_o'}
                                            size={12}/>
                                </View>
                                <Text style={{
                                    padding: DIMENSION_PADDING_SMALL,
                                    textAlign: 'center',
                                    color: COLOR_TEXT_BLACK_1,
                                    fontSize: DIMENSION_TEXT_SUB
                                }}
                                      numberOfLines={1}>
                                    Email
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex: 1}}
                                              onPress={this._onShareMoreClicked}>
                                <View style={[styles.buttonShare, {borderColor: COLOR_LINE}]}>
                                    <JJIcon color={COLOR_TEXT_INACTIVE}
                                            name={'more_horizontal_o'}
                                            size={12}/>
                                </View>
                                <Text style={{
                                    padding: DIMENSION_PADDING_SMALL,
                                    textAlign: 'center',
                                    color: COLOR_TEXT_BLACK_1,
                                    fontSize: DIMENSION_TEXT_SUB
                                }}
                                      numberOfLines={1}>
                                    Khác...
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>

                    <View style={{flex: 1}}>
                        <Text style={{
                            padding: DIMENSION_PADDING_MEDIUM,
                            color: COLOR_TEXT_BLACK_1,
                            fontSize: DIMENSION_TEXT_CONTENT,
                            fontWeight: 'bold'
                        }}>
                            Điều kiện ưu đãi
                        </Text>
                        <Text style={{
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingRight: DIMENSION_PADDING_MEDIUM,
                            paddingBottom: DIMENSION_PADDING_MEDIUM,
                            color: COLOR_TEXT_BLACK_1,
                            fontSize: DIMENSION_TEXT_CONTENT
                        }}>
                            {this.props.deal.get('condition', '')}
                        </Text>
                    </View>

                </ScrollView>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'white',
                    width: '100%'
                }}>
                    <DividerLine/>

                    <TouchableOpacity style={[styles.buttonGetCode, {
                        backgroundColor: hasCode ? '#4bc731' : '#ef863b',
                        borderColor: hasCode ? '#4bc731' : '#ef863b'
                    }]}
                                      onPress={this._onBuyClicked}>
                        <Text style={{
                            color: 'white',
                            fontSize: DIMENSION_TEXT_HEADER,
                            fontWeight: 'bold'
                        }}>
                            XEM & MUA HÀNG
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderNoNeedCode = () => {

        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                    style={{padding: DIMENSION_PADDING_MEDIUM, textAlign: 'center', color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT}}>
                    Ưu đãi đã được kích hoạt và có thể được áp dụng mua hàng ngay tại
                    <Text style={{textDecorationLine: 'underline', fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_PRIMARY}}>
                        {' ' + this.props.deal.getIn(['brand', 'brand_name'], '')}
                    </Text>
                </Text>

                <Text style={styles.textActivated}>
                    Ưu đãi đã kích hoạt
                </Text>
            </View>
        )
    }

    _renderGetCode = () => {
        let deal = this.props.deal;
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                    style={{padding: DIMENSION_PADDING_MEDIUM, textAlign: 'center', color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT}}>
                    Copy & nhập mã coupon bên dưới và mua hàng ngay bây giờ tại
                    <Text style={{textDecorationLine: 'underline', fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_PRIMARY}}>
                        {' ' + deal.getIn(['brand', 'brand_name'], '') + ' '}
                    </Text>
                    để nhận ưu đãi
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textCouponCode}>
                        {deal.get('pre_generated_code').get(0)}
                    </Text>
                    <TouchableOpacity style={styles.buttonCopy}
                                      onPress={this._onCopyCodeClicked}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER}}>
                            COPY
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _onShareMessenerClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'share_messenger_ecoupon',
            baseLogParams,
            'deal_detail'
        );

        let shareLinkContent = {
            contentType: 'link',
            contentUrl: this.props.deal.get('share_url', ''),
        };
        MessageDialog.canShow(shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return MessageDialog.show(shareLinkContent);
                }
            }
        )
    }

    _onShareFacebookClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'share_facebook_ecoupon',
            baseLogParams,
            'deal_detail'
        );

        let shareLinkContent = {
            contentType: 'link',
            contentUrl: this.props.deal.get('share_url', ''),
        }
        ShareDialog.canShow(shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(shareLinkContent);
                }
            }
        )
    }

    _onShareEmailClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'share_email_ecoupon',
            baseLogParams,
            'deal_detail'
        );

        Communications.email(null, null, null, this.props.deal.get('title', ''), this.props.deal.get('share_url', ''))
    }

    _onShareMoreClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'share_more_ecoupon',
            baseLogParams,
            'deal_detail'
        );

        Share.share({
            message: this.props.deal.get('share_url', ''),
            url: this.props.deal.get('share_url', '')
        })
    }

    _onBuyClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'click_get_code_ecoupon',
            baseLogParams,
            'deal_detail'
        );

        Communications.web(this.props.deal.get('online_store', ''))
    }

    _onCopyCodeClicked = () => {
        if (!this.props.deal) return;

        const baseLogParams = {
            item_id: this.props.deal.get('slug', ''),
            item_brand: this.props.deal.getIn(['brand', 'brand_slug'], ''),
            item_category: this.props.deal.get('deal_type', ''),
            deal_type: this.props.deal.get('deal_type', '')
        };

        AnalyticsUtil.logNormalEvent(
            'copy_ecoupon_code',
            baseLogParams,
            'deal_detail'
        );

        Clipboard.setString(this.props.deal.get('pre_generated_code').get(0));
    }

    _actionCloseModal = () => {
        this.setState({modalVisible: false});
        this.props.onCloseModal();
    }

    componentDidMount() {
        super.componentDidMount();
        this.setState({modalVisible: this.props.visible})
    }

    componentWillReceiveProps(nextProps, nextStates) {
        this.setState({modalVisible: nextProps.visible})
    }
}

EcouponGetCode.propTypes = {
    deal: PropTypes.object,
    navigation: PropTypes.any,
    visible: PropTypes.bool,
    onCloseModal: PropTypes.func
}

const styles = StyleSheet.create({
    textCouponCode: {
        color: COLOR_PRIMARY,
        fontSize: DIMENSION_TEXT_HEADER,
        fontWeight: 'bold',
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        borderColor: COLOR_LINE,
        backgroundColor: COLOR_GRAY_BG_2,
        borderTopLeftRadius: DIMENSION_RADIUS_MEDIUM,
        borderBottomLeftRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1
    },
    buttonCopy: {
        backgroundColor: '#4bc731',
        borderTopRightRadius: DIMENSION_RADIUS_MEDIUM,
        borderBottomRightRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        borderColor: '#4bc731',
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
    },
    textActivated: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_HEADER,
        fontWeight: 'bold',
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        borderColor: COLOR_LINE,
        backgroundColor: COLOR_GRAY_BG_2,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1
    },
    buttonShare: {
        height: DIMENSION_BUTTON_SMALL,
        width: DIMENSION_BUTTON_SMALL,
        borderRadius: 16,
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_GRAY_BG_2
    },
    buttonGetCode: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        flex: 1,
        height: DIMENSION_BUTTON_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM,
        marginTop: DIMENSION_PADDING_TINY,
        justifyContent: 'center',
        alignItems: 'center'
    }
})