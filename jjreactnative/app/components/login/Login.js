import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Text } from 'native-base';
import React  from 'react';

import {COLOR_BLACK, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from '../../resources/colors';
import { loginUser } from './action';
import JJHeader from '../common/JJHeader';
import JJIcon from '../common/JJIcon';
import {AnalyticsUtil} from '../common/analytics/analytics'
import {ObjectUtil} from '../../utils/object-utils'
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_SUB
} from "../../resources/dimens";
import {BasePureComponent} from "../common/BasePureComponent";
import LoadingViewPopup from '../../common/view/loading/LoadingViewPopup';

/**
 * params:
 * from,
 * action: name, params, category
 */
class Login extends BasePureComponent {

    render() {
        console.debug('Login:render', this.props);
        return (
            <View style={{flex: 1}}>
                <JJHeader
                    navigation={this.props.navigation}
                    title={'ĐĂNG NHẬP'}
                    leftItem={this.renderLeftButton}
                    overrideGoBack={true}
                    onGoBackAction={this._onBackPress}
                />
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingRight: DIMENSION_PADDING_MEDIUM
                }}>
                    <Text style={styles.topDes}>
                        Để tiếp tục, vui lòng đăng nhập
                    </Text>

                    <TouchableOpacity
                        style={styles.btLoginByPhone}
                        onPress={this._onLoginByPhone}>
                        <Text style={styles.textLogin}>
                            ĐĂNG NHẬP QUA SỐ ĐIỆN THOẠI
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btLogin}
                        onPress={this.doLoginFacebook}>
                        <JJIcon
                            name={'facebook_o'}
                            color={'white'} size={16} />
                        <Text style={styles.textLogin}>
                            ĐĂNG NHẬP QUA FACEBOOK
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.bottomDes}>
                        JAMJA không tự động đăng bài và lấy thông tin Facebook của bạn khi chưa được phép
                    </Text>
                </View>

                {
                    !!this.props.isLogining &&
                    <LoadingViewPopup visible={true}/>
                }

            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        AnalyticsUtil.loginStarted();

        AnalyticsUtil.logCurrentScreen('login', ObjectUtil.getValue(this.props, undefined , ['navigation', 'state', 'params', 'from']));

        const action = ObjectUtil.getValue(this.props, undefined, ['navigation', 'state', 'params', 'action']);
        if (!!action) {
            this.action = action;

            AnalyticsUtil.logNormalEvent(
                `open_login_${action.name}`,
                action.params,
                action.category
            );
        }
    }

    renderLeftButton = () => {
        return (
            <TouchableOpacity
                onPress={this._onCancelLogin}
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

    _onCancelLogin = () => {
        AnalyticsUtil.loginEvent('cancel_login', ObjectUtil.getValue(this.props, undefined , ['navigation', 'state', 'params', 'from']));

        if (!!this.action) {
            AnalyticsUtil.logNormalEvent(
                `cancel_login_${this.action.name}`,
                this.action.params,
                this.action.category
            );
        }

        this.props.navigation.goBack();
    }

    dismissLoginScreen = () => {
        AnalyticsUtil.loginEvent('login_success', ObjectUtil.getValue(this.props, undefined , ['navigation', 'state', 'params', 'from']));

        if (!!this.action) {
            AnalyticsUtil.logNormalEvent(
                `success_login_${this.action.name}`,
                this.action.params,
                this.action.category
            );
        }
        this.props.navigation.goBack();
    }

    _loginError = (error, retry) => {
        console.log('login:facebook:_loginError', error);
        try {
            LoginManager.logOut();
            if (!retry) this.doLoginFacebook(true);
        } catch (e) {
            console.log(e);
        }
    }

    doLoginFacebook = (retry) => {
        let self = this;
        if (!retry) AnalyticsUtil.loginEvent('start_request', ObjectUtil.getValue(this.props, undefined , ['navigation', 'state', 'params', 'from']));

        const action = this.action;

        if (!!action && !retry) {
            AnalyticsUtil.logNormalEvent(
                `start_rq_login_${action.name}`,
                action.params,
                action.category
            );
        }

        LoginManager.logInWithReadPermissions(['public_profile'])
            .then(
                result => {
                    if (!result.isCancelled) {
                        AccessToken.getCurrentAccessToken()
                            .then(data => {
                                if (!!action) {
                                    AnalyticsUtil.logNormalEvent(
                                        `success_rq_login_${action.name}`,
                                        action.params,
                                        action.category
                                    );
                                }

                                AnalyticsUtil.loginEvent(
                                    'success_request',
                                    ObjectUtil.getValue(self.props, undefined , ['navigation', 'state', 'params', 'from'])
                                );

                                self.props.dispatch(loginUser(data.accessToken.toString()))
                            })
                            .catch(error => {
                                this._logLoginError(action, retry, self);
                                this._loginError(error, retry);
                            })
                    }
                    else {
                        AnalyticsUtil.loginEvent(
                            'cancel_request',
                            ObjectUtil.getValue(self.props, undefined , ['navigation', 'state', 'params', 'from']));

                        if (!!action) {
                            AnalyticsUtil.logNormalEvent(
                                `cancel_rq_login_${action.name}`,
                                action.params,
                                action.category
                            );
                        }
                    }
                },
                error => {
                    console.log('login:facebook:error', error);
                    this._logLoginError(action, retry, self);
                    this._loginError(error, retry);
                }
            )
            .catch(error => {
                console.log('login:facebook:error_2', error);
                this._logLoginError(action, retry, self);
                this._loginError(error, retry);
            });
    };

    _logLoginError = (action, retry, self) => {
        try {
            if (!!action && !!retry) {
                AnalyticsUtil.logNormalEvent(
                    `error_rq_login_${action.name}`,
                    action.params,
                    action.category
                );
            }

            if (!!retry) {
                AnalyticsUtil.loginEvent(
                    'error_request',
                    ObjectUtil.getValue(self.props, undefined , ['navigation', 'state', 'params', 'from']));
            }
        } catch (e) {
            console.log(e);
        }
    }

    _onLoginByPhone = () => {
        AnalyticsUtil.loginEvent('open_login_by_phone', ObjectUtil.getValue(this.props, undefined , ['navigation', 'state', 'params', 'from']));
        this.props.navigation.navigate(
            'LoginByPhone',
            {
                onAction: this._onLoginByPhoneAction,
                ...ObjectUtil.getValue(this.props, {} , ['navigation', 'state', 'params'])
            });
    }

    _onLoginByPhoneAction = (action) => {

    }

    _onBackPress = () => {
        AnalyticsUtil.loginCancelled();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoginned) {
            this.dismissLoginScreen();
        }

        console.debug('Login:componentWillReceiveProps:', nextProps);
    }
}

const styles = StyleSheet.create({
    topDes: {
        marginBottom: 34,
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_BLACK
    },
    bottomDes: {
        marginTop: DIMENSION_PADDING_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
        textAlign: "center",
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_SUB
    },
    btLoginByPhone: {
        flexDirection: 'row',
        width: '100%',
        height: DIMENSION_BUTTON_MEDIUM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        marginBottom: DIMENSION_PADDING_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_PRIMARY,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
    },
    btLogin: {
        flexDirection: 'row',
        width: '100%',
        height: DIMENSION_BUTTON_MEDIUM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b5998',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
    },
    textLogin: {
        fontWeight: 'bold',
        marginLeft: DIMENSION_PADDING_SMALL,
        fontSize: DIMENSION_TEXT_HEADER,
        color: 'white'
    }
});

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned,
        isLogining: state.loginReducer.isLogining,
        user: state.loginReducer.user,
    };
}

export default connect(mapStateToProps)(Login);

