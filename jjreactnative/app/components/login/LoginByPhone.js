import React from 'react';
import {View, TouchableOpacity, TextInput, Keyboard, Alert} from 'react-native';
import {Text} from 'native-base';
import firebase from 'react-native-firebase';
import FastImage from 'react-native-fast-image';

import {BasePureComponent} from "../common/BasePureComponent";
import JJHeader from "../common/JJHeader";
import JJIcon from "../common/JJIcon";
import {
    COLOR_GRAY_BG,
    COLOR_LINE, COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_HINT,
    COLOR_TEXT_INACTIVE
} from "../../resources/colors";
import LoadingViewPopup from "../../common/view/loading/LoadingViewPopup";
import {
    DIMENSION_PADDING_EXTRA, DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER_X, DIMENSION_TEXT_HEADER_XX, DIMENSION_TEXT_SUB
} from "../../resources/dimens";
import ButtonTextM from "../common/button/ButtonTextM";
import {StringUtil} from "../../utils/string-util";
import ResendButton from "./ResendButton";
import {ERROR_NORMAL, getErrorMessage, firebaseAuthErrorParse} from "../../utils/text-message";
import {commonApi} from '../../api/common-api';
import connect from "react-redux/es/connect/connect";
import {loginUserSuccess} from "./action";
import {AnalyticsUtil} from "../common/analytics/analytics";
import {ObjectUtil} from "../../utils/object-utils";

const State = {
    INPUT_NUMBER: 1,
    VERIFY: 2
};

const PHONE_COUNTRY = '+84';

class LoginByPhone extends BasePureComponent {

    confirmResult;
    user;
    openFrom;

    constructor(props) {
        super(props);
        this.state = {
            state: State.INPUT_NUMBER,
            loading: false,
            phone_number: '',
            verify_code: ''
        }
        this.openFrom = ObjectUtil.getValue(props, undefined , ['navigation', 'state', 'params', 'from']);
    }

    render() {

        return (
            <View
                style={{
                    backgroundColor: COLOR_GRAY_BG,
                    flex: 1
                }}>
                <JJHeader
                    navigation={this.props.navigation}
                    title={this.state.state === State.INPUT_NUMBER ? 'ĐĂNG NHẬP' : 'XÁC NHẬN OTP'}
                    leftItem={this._renderLeftButton}
                />

                <View
                    style={{
                        alignItems: 'center',
                        marginTop: DIMENSION_PADDING_EXTRA,
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM,
                        flex: 1
                    }}>

                    {
                        this.state.state === State.VERIFY &&
                        <View
                            style={{
                                marginBottom: DIMENSION_PADDING_LARGE,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    color: COLOR_TEXT_BLACK_1,
                                    fontSize: DIMENSION_TEXT_CONTENT,
                                    marginBottom: DIMENSION_PADDING_SMALL
                                }}>
                                Mã OTP đã được gửi vào số điện thoại của bạn
                            </Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row'
                                }}
                                activeOpacity={0.8}
                                onPress={this._onEditPhoneNumberClicked}>
                                <Text
                                    style={{
                                        color: COLOR_TEXT_BLACK_1,
                                        fontSize: DIMENSION_TEXT_HEADER_X,
                                        fontWeight: 'bold'
                                    }}>
                                    {this.state.phone_number}
                                </Text>

                                <FastImage
                                    style={{width: 16, height: 16, marginLeft: DIMENSION_PADDING_SMALL}}
                                    source={require('../../resources/icon/compress/pencil.png')}
                                    resizeMode={FastImage.resizeMode.contain}/>

                            </TouchableOpacity>
                        </View>
                    }

                    <Text
                        style={{
                            color: COLOR_TEXT_BLACK_1,
                            fontSize: DIMENSION_TEXT_CONTENT,
                            marginBottom: DIMENSION_PADDING_MEDIUM
                        }}>
                        {this.state.state === State.INPUT_NUMBER ? 'Nhập số di động' : 'Nhập mã OTP'}
                    </Text>


                    <TextInput
                        style={{
                            width: '100%',
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingRight: DIMENSION_PADDING_MEDIUM,
                            paddingTop: DIMENSION_PADDING_SMALL,
                            paddingBottom: DIMENSION_PADDING_SMALL,
                            marginBottom: DIMENSION_PADDING_MEDIUM,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            borderWidth: 1,
                            borderColor: COLOR_LINE,
                            backgroundColor: 'white',
                            color: COLOR_TEXT_BLACK_1,
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: DIMENSION_TEXT_HEADER_XX
                        }}
                        autoFocus={true}
                        placeholder={this.state.state === State.INPUT_NUMBER ? 'Số điện thoại' : 'Mã OTP'}
                        placeholderTextColor={COLOR_TEXT_HINT}
                        underlineColorAndroid={'transparent'}
                        multiline={false}
                        autoCorrect={false}
                        maxLength= {21}
                        fontSize={DIMENSION_TEXT_CONTENT}
                        keyboardType={'phone-pad'}
                        returnKeyType={'next'}
                        autoCapitalize={'none'}
                        onChangeText={this._onInputChanged}
                        onSubmitEditing={this._onNextInput}
                        value={this.state.state === State.INPUT_NUMBER ? this.state.phone_number : this.state.verify_code}/>

                    {
                        !!this.state.state === State.INPUT_NUMBER &&
                        <Text
                            style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_SUB,
                                marginBottom: DIMENSION_PADDING_MEDIUM,
                                textAlign: 'center'
                            }}>
                            Nhấn Tiếp để nhận xác nhận qua SMS do Google cung cấp
                        </Text>
                    }

                    <ButtonTextM
                        style={{
                            width: '100%',
                            marginTop: DIMENSION_PADDING_MEDIUM
                        }}
                        text={this.state.state === State.INPUT_NUMBER ? 'Tiếp' : 'Xác nhận'}
                        backgroundColor={COLOR_PRIMARY}
                        textColor={'white'}
                        disable={this.state.state === State.INPUT_NUMBER ? StringUtil.isEmpty(this.state.phone_number) : StringUtil.isEmpty(this.state.verify_code)}
                        onPress={this._onNextInput}/>

                    {
                        this.state.state === State.VERIFY &&
                        <ResendButton
                            active={this.state.state === State.VERIFY}
                            onPress={this._resendCode}/>
                    }
                </View>

                <LoadingViewPopup
                    visible={this.state.loading} />
            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        try {
            firebase.auth().signOut();
            AnalyticsUtil.logCurrentScreen('loginbyphone', this.openFrom);
            firebase.auth().languageCode = 'vi';
        }
        catch (e) {
            console.log(e);
        }
    }

    _renderLeftButton = () => {
        return (
            <TouchableOpacity
                onPress={this._onCancelLoginByPhone}
                style={{
                    flex: 1,
                    width: 80,
                    justifyContent: 'center',
                    paddingLeft: 16,
                }}>
                <JJIcon name={'x_o'}
                        size={20}
                        color={COLOR_TEXT_INACTIVE} />
            </TouchableOpacity>
        )
    }

    _onCancelLoginByPhone = () => {
        AnalyticsUtil.loginEvent('phone_cancel_login', this.openFrom);
        this.props.navigation.goBack();
    }

    _onEditPhoneNumberClicked = () => {
        this.setState({
            ...this.state,
            verify_code: '',
            state: State.INPUT_NUMBER
        });
    }

    _onInputChanged = (text) => {
        if (this.state.state === State.INPUT_NUMBER) {
            this.setState({ phone_number: text.trim() });
        }
        else {
            this.setState({ verify_code: text.trim() });
        }
    };

    _onNextInput = () => {
        Keyboard.dismiss();
        if (this.state.state === State.INPUT_NUMBER) {
            this.setState({
                ...this.state,
                loading: true,
                phone_number: this._getPhoneNumber()
            }, this._sendConfirmCode);
        }
        else {
            if (!this.confirmResult) {
                Alert.alert('Lỗi', ERROR_NORMAL);
                return;
            }
            this.setState({
                ...this.state,
                loading: true
            }, this._verifyCode);
        }
    }

    _sendConfirmCode = (resend) => {
        console.log('_sendConfirmCode: ', firebase.auth(), firebase.auth().currentUser, firebase.auth().languageCode);

        AnalyticsUtil.loginEvent('phone_send_code', this.openFrom);
        firebase.auth()
            .signInWithPhoneNumber(this.state.phone_number, resend)
            .then(confirmResult => {
                AnalyticsUtil.loginEvent('phone_send_code_success', this.openFrom);
                console.log('_onNextInputPhoneNumber:confirmResult: ', confirmResult);
                this.confirmResult = confirmResult;
                this.setState({
                    ...this.state,
                    loading: false,
                    verify_code: '',
                    state: State.VERIFY
                });
            })
            .catch((error) => {
                console.log('_onNextInputPhoneNumber:error: ', error, '\ncode:' + error.code, '\nname:' + error.name, '\nstack:' + error.stack, '\nkey:' + error.key);
                AnalyticsUtil.loginEvent('phone_send_code_failure', this.openFrom);
                this.setState({
                    ...this.state,
                    loading: false
                }, () => Alert.alert('Lỗi', firebaseAuthErrorParse(error)));
            });
    }

    _verifyCode = () => {
        const code = this.state.verify_code.trim();

        console.log('_verifyCode:code', code);

        AnalyticsUtil.loginEvent('phone_verify_code', this.openFrom);

        this.confirmResult
            .confirm(code)
            .then((user) => {
                console.log('_verifyCode:success:', user.toJSON());
                AnalyticsUtil.loginEvent('phone_verify_code_success', this.openFrom);
                this.user = user;
                this._onVerifySuccess();
            })
            .catch(error => {
                console.log('_verifyCode:error: ', error, '\ncode:' + error.code, '\nname:' + error.name, '\nstack:' + error.stack, '\nkey:' + error.key);

                this._onVerifyError(error);

            });
    }

    _onVerifyError = (error) => {
        console.log('_onVerifyError:error:', error.code);

        const currentUser = firebase.auth().currentUser;

        if (!currentUser || !currentUser.toJSON || !currentUser.toJSON()) {
            AnalyticsUtil.loginEvent('phone_verify_code_failure', this.openFrom);
            this.setState({
                ...this.state,
                loading: false
            }, () => Alert.alert('Lỗi', firebaseAuthErrorParse(error)));
            return;
        }

        const user = currentUser.toJSON();
        if (!!user.phoneNumber) {
            this.user = currentUser;

            this.setState({
                ...this.state,
                loading: true
            }, this._onVerifySuccess);
            return;
        }

        AnalyticsUtil.loginEvent('phone_verify_code_failure', this.openFrom);
        firebase.auth().signOut();
        this.setState({
            ...this.state,
            loading: false
        }, () => Alert.alert('Lỗi', firebaseAuthErrorParse(error)));
    }

    _onVerifySuccess = () => {
        AnalyticsUtil.loginEvent('phone_get_token', this.openFrom);
        this.user.getIdToken()
            .then(result => {
                AnalyticsUtil.loginEvent('phone_get_token_success', this.openFrom);
                console.log('_onVerifySuccess:result', result);
                this._fetchLoginByPhone(result);
            })
            .catch(error => {
                console.log('_onVerifySuccess:error', error);
                AnalyticsUtil.loginEvent('phone_get_token_failure', this.openFrom);
                this.setState({
                    ...this.state,
                    loading: false
                }, () => Alert.alert('Lỗi', getErrorMessage(error.message)));
            })
    }

    _fetchLoginByPhone = (token) => {
        AnalyticsUtil.loginEvent('phone_login_to_server', this.openFrom);
        commonApi.loginByPhone(token)
            .then(response => {
                console.log('_fetchLoginByPhone:response:', response);
                if (!!response.error || !response.id) {
                    AnalyticsUtil.loginEvent('phone_login_to_server_failure', this.openFrom);
                    this.setState({
                        ...this.state,
                        loading: false
                    }, () => Alert.alert('Lỗi', getErrorMessage(response)));
                    return;
                }
                try {
                    AnalyticsUtil.loginEvent('phone_login_to_server_success', this.openFrom);
                    this.props.dispatch(loginUserSuccess(response));
                } catch (error) {
                    console.log(error);
                }
            })
            .catch(error => {
                console.log('_fetchLoginByPhone:error:', error);
                AnalyticsUtil.loginEvent('phone_login_to_server_failure', this.openFrom);
                this.setState({
                    ...this.state,
                    loading: false
                }, () => Alert.alert('Lỗi', getErrorMessage(error)));
            })
    }

    _resendCode = () => {
        this._sendConfirmCode(true);
    }

    _getPhoneNumber = () => {
        try {
            let phone = this.state.phone_number.trim();

            if (phone.indexOf('+') === 0) {
                return phone;
            }
            if (phone.indexOf('0') === 0) {
                phone = phone.substring(1, phone.length);
            }
            return PHONE_COUNTRY + phone;
        } catch (e) {
            console.log(e);
            return PHONE_COUNTRY + this.state.phone_number;
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoginned) {
            this.props.navigation.goBack();
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned,
        isLogining: state.loginReducer.isLogining,
        user: state.loginReducer.user,
    };
}

export default connect(mapStateToProps)(LoginByPhone);