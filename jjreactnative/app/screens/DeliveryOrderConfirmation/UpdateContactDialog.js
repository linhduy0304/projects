import React from 'react';
import {View, TouchableOpacity, Easing, TextInput, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import ModalBox from 'react-native-modalbox';

import {BasePureComponent} from "../../common/base/BasePureComponent";
import {
    DIMENSION_BUTTON_SM, DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_CONTENT
} from "../../resources/dimens";
import {
    COLOR_LINE,
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE
} from "../../resources/colors";
import JJIcon from '../../common/view/icon/JJIcon';
import Text from '../../common/view/text/JJText';
import {styles} from './styles';
import ButtonFilled from '../../common/view/button/ButtonFilled';
import {StringUtil} from '../../utils/string-util';

export default class UpdateContactDialog extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            userName: undefined,
            phoneNumber: undefined,
            isErrorUserName: false,
            isErrorPhoneNumber: false
        }
    }


    render() {

        return (
            <ModalBox
                ref={this._onRefUpdateContactDialog}
                style={styles.updateContactDialogContainer}
                animationDuration={200}
                backButtonClose={true}
                swipeArea={56}
                position={'center'}
                backdropPressToClose={false}
                backdropContent={<TouchableOpacity activeOpacity={1} style={{flex: 1}} onPress={this._onBackDropPress}/>}
                backdrop={true}
                backdropOpacity={0.3}
                keyboardTopOffset={48}
                easing={Easing.elastic(0.5)}>

                <KeyboardAvoidingView contentContainerStyle={{flex: 1}}>
                    <View style={styles.updateContactDialogContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity
                                style={{padding: 16}}
                                activeOpacity={0.8}
                                onPress={this._close}>

                                <JJIcon
                                    size={18}
                                    name={'x_o'}
                                    color={COLOR_TEXT_BLACK_1}/>
                            </TouchableOpacity>
                            <Text style={{textAlign: 'center', flex: 1, marginRight: 48, fontWeight: 'bold'}}>
                                CẬP NHẬT THÔNG TIN
                            </Text>
                        </View>

                        <View style={{margin: DIMENSION_PADDING_MEDIUM}}>
                            <Text style={{color: COLOR_TEXT_INACTIVE}}>
                                Khách đặt<Text style={{color:COLOR_PRIMARY}}>*</Text>:{!!this.state.isErrorUserName && <Text style={styles.updateContactDialogError}>Vui lòng không để trống</Text>}
                            </Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                multiline={false}
                                autoCorrect={false}
                                fontSize={DIMENSION_TEXT_CONTENT}
                                maxLength={100}
                                returnKeyType={'next'}
                                autoCapitalize={'none'}
                                onChangeText={this._onUserInputChanged}
                                onSubmitEditing={this._onUserNameInputSubmitPress}
                                value={this.state.userName}
                                style={{paddingLeft: 0, paddingTop: DIMENSION_PADDING_SMALL, paddingBottom: DIMENSION_PADDING_SMALL}}/>

                            <View style={{backgroundColor: COLOR_LINE, height: 0.8, marginBottom: DIMENSION_PADDING_LARGE}}/>

                            <Text style={{color: COLOR_TEXT_INACTIVE}}>
                                Điện thoại liên hệ<Text style={{color:COLOR_PRIMARY}}>*</Text>:{!!this.state.isErrorPhoneNumber && <Text style={styles.updateContactDialogError}>Vui lòng nhập đúng số điện thoại</Text>}
                            </Text>
                            <TextInput
                                ref='edtPhone'
                                underlineColorAndroid='transparent'
                                multiline={false}
                                autoCorrect={false}
                                maxLength= {21}
                                fontSize={DIMENSION_TEXT_CONTENT}
                                keyboardType={'phone-pad'}
                                returnKeyType={'done'}
                                autoCapitalize={'none'}
                                onChangeText={this._onPhoneNumberInputChanged}
                                onSubmitEditing={this._onPhoneNumberInputSubmit}
                                value={this.state.phoneNumber}
                                style={{paddingLeft: 0, paddingTop: DIMENSION_PADDING_SMALL, paddingBottom: DIMENSION_PADDING_SMALL}}/>

                            <View style={{backgroundColor: COLOR_LINE, height: 0.8}}/>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <ButtonFilled
                                style={{width: 120, height: DIMENSION_BUTTON_SM, marginBottom: DIMENSION_PADDING_MEDIUM}}
                                title={'Cập nhật'}
                                textColor={'white'}
                                backgroundColor={'#22C300'}
                                onPress={this._onPhoneNumberInputSubmit}/>
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </ModalBox>
        )
    }

    _onRefUpdateContactDialog = ref => {
        this.updateContactDialogRef = ref;
        !!this.props.onRef && this.props.onRef(this.updateContactDialogRef);
    }

    _onBackDropPress = () => {
        this._close();
    }

    _close = () => {
        !!this.updateContactDialogRef && this.updateContactDialogRef.close();
    }

    _onUserInputChanged = text => {
        this.setState({
            userName: text,
            isErrorUserName: false
        })
    }

    _onUserNameInputSubmitPress = () => {
        this.refs.edtPhone.focus();
    }

    _onPhoneNumberInputChanged = text => {
        this.setState({
            phoneNumber: text,
            isErrorPhoneNumber: false
        })
    }

    _onPhoneNumberInputSubmit = () => {
        const isErrorUserName = StringUtil.isEmpty(this.state.userName);
        const isErrorPhoneNumber = StringUtil.isEmpty(this.state.phoneNumber) || this.state.phoneNumber.length < 9 || this.state.phoneNumber.length > 14;
        if (!!isErrorUserName || !!isErrorPhoneNumber) {
            this.setState({
                isErrorUserName,
                isErrorPhoneNumber
            });
            return;
        }

        !!this.props.onSubmitPress && this.props.onSubmitPress(this.state.userName, this.state.phoneNumber);
        this._close();
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.setState({
            userName: nextProps.userName,
            phoneNumber: nextProps.phoneNumber
        })
    }
}

UpdateContactDialog.propTypes = {
    userName: PropTypes.string,
    phoneNumber: PropTypes.string,
    onRef: PropTypes.func,
    onSubmitPress: PropTypes.func
}