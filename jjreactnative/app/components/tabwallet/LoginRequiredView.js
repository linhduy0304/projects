
import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Text} from 'native-base'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {TYPE_GOT} from '../../const'
import { strings } from '../../../locates/i18n';
import JJIcon from "../common/JJIcon";
import {COLOR_GRAY_BG, COLOR_PRIMARY} from "../../resources/colors";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_XX
} from "../../resources/dimens";
import {ObjectUtil} from '../../utils/object-utils'
import {BasePureComponent} from "../common/BasePureComponent";

class LoginRequiredView extends BasePureComponent {

    render() {
        let {type} = this.props;
        if (type === undefined || type === null) type = TYPE_GOT;

        let title = type === TYPE_GOT ? strings('wallet.login_required.monopoly_deal') : strings('wallet.login_required.save_deal');
        let subTitle = type === TYPE_GOT ?
            'Để xem mã khuyến mãi của bạn' :
            'Để xem lại và nhận thông báo nhắc nhở';

        return (
            <View style={styles.container}>
                <JJIcon color={'#999999'}
                        size={32}
                        name={type === TYPE_GOT ? 'ticket_o' : 'bookmark_o'}/>

                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#454545', marginTop: 8}}>
                    {title}
                </Text>
                <Text style={{fontSize: 14, color: '#454545', marginBottom: 32, textAlign: 'center'}}>
                    {subTitle}
                </Text>

                <TouchableOpacity
                    onPress={this._doLogin}
                    style={{
                        width: '100%',
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
            </View>
        )
    }

    _doLogin = () => {
        this.props.navigation.navigate(
            'Login',
            {
                from: {
                    action_location: ObjectUtil.getValue(this.props, undefined, ['type']) === TYPE_GOT ? 'my_coupon_screen' : 'bookmark_list_screen',
                    action_name: 'click_login',
                },
                action: {
                    name: 'click_login',
                    category: 'login'
                }
            });
    }
}

LoginRequiredView.propTypes = {
    type: PropTypes.any,
    navigation: PropTypes.any
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLOR_GRAY_BG
    }
});

export default connect()(LoginRequiredView);