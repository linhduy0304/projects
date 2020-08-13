import React from 'react';
import {Text, Button} from 'native-base';
import {View, Modal, WebView, ActivityIndicator, TouchableOpacity, Platform} from 'react-native';
import PropTypes from 'prop-types'

import {LaunchURL} from '../../utils/CommunicationUtil'
import {connect} from "react-redux";
import JJIcon from "../common/JJIcon";
import {BaseComponent} from "../common/BaseComponent";
import {getPaddingTopBar} from "../../utils/common-utils";

const isIOS = Platform.OS === 'ios';
const headerHeight = isIOS ? 44 : 56;
const paddingTopBar = getPaddingTopBar();

class RedeemGateway extends BaseComponent {

    render() {
        let {deal} = this.props;
        let url = null;
        let content = null;
        if (deal) {
            url = deal.get('redeem_url');
        }
        if (url === undefined || url === null) {
            content = <Text style={{padding: 40}}>Không tìm thấy thông tin</Text>;
        } else {
            content = this._renderWebView(url);
        }

        return (
            <Modal visible={this.props.visible}
                   animationType={'slide'}
                   transparent={true}
                   onRequestClose={this._actionCloseModal}>

                <View style={{flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>

                    <TouchableOpacity style={{
                        flex: 1,
                        height: '50%',
                        backgroundColor: 'transparent',
                        paddingTop: paddingTopBar,
                    }}
                                      onPress={this._actionCloseModal}>
                        <Button transparent style={{width: headerHeight, height: headerHeight, justifyContent: 'center', alignItems: 'center'}}
                                onPress={this._actionCloseModal}>
                            <JJIcon
                                style={{ marginBottom: isIOS ? 4 : 0 }}
                                name={'chevron_left_o'}
                                color={'gray'}
                                size={16} />
                        </Button>
                    </TouchableOpacity>

                    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                        {content}
                    </View>
                </View>
            </Modal>
        )
    }

    _renderWebView = (url) => {
        return <WebView
            ref={component => this._WebViewRef = component}
            source={{uri: url}}
            onShouldStartLoadWithRequest={this._webViewShouldStartLoadRequest}
            onNavigationStateChange={this._webViewShouldStartLoadRequest}
            renderLoading={() => this._renderLoading()}
            renderError={() => this._renderLoadingError()}
            startInLoadingState={true}/>;
    };

    _renderLoading = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    animating
                    size={'large'}/>
                <Text style={{color: '#999999'}}>Đang tải dữ liệu...</Text>
            </View>
        )
    };

    _renderLoadingError = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#999999'}}>Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!</Text>
            </View>
        )
    }

    _webViewShouldStartLoadRequest = (e) => {
        console.log('_webViewShouldStartLoadRequest', e);
        let {url, loading, navigationType} = e;

        if ((!isIOS && !loading) || (isIOS && navigationType && navigationType !== 'click')) return true;

        console.log('_webViewShouldStartLoadRequest:click:', e);

        if (url.indexOf('jamja.vn/redeem/') > 5) {
            return true;
        }
        if (url.indexOf('jamja.vn/doi-ma') > 5) {
            this._openMerchantRedeemCode();
            return this._stopWebAndCloseModal();
        }
        if (url.indexOf('tel:') === 0) {
            LaunchURL(url);
            return this._stopWebAndCloseModal();
        }
        return this._stopWebAndCloseModal();
    }

    _stopWebAndCloseModal = () => {
        this._actionCloseModal();
        this._WebViewRef.stopLoading();
        return false;
    }

    _openMerchantRedeemCode = () => {

        if (!!this.props.onSubmitGateWayPress) {
            this._actionCloseModal();
            this.props.onSubmitGateWayPress();
            return;
        }

        let {deal} = this.props;

        if (!deal) return;
        this._actionCloseModal();
        this.props.navigation.navigate('RedeemCode', {
            deal: deal,
            onRedeemSuccess: this._onRedeemSuccess,
            fromDealDetail: this.props.fromDealDetail
        })
    }

    _onRedeemSuccess = () => {
        this._actionCloseModal();
        this.props.onRedeemSuccess();
    }

    _actionCloseModal = () => {
        this.props.onCloseModal();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps)
        return this.props.visible !== nextProps.visible;
    }
}

RedeemGateway.propTypes = {
    deal: PropTypes.object,
    navigation: PropTypes.any,
    visible: PropTypes.bool,
    onCloseModal: PropTypes.func,
    onRedeemSuccess: PropTypes.func,
    onSubmitGateWayPress: PropTypes.func,
    fromDealDetail: PropTypes.bool
}

export default connect()(RedeemGateway);