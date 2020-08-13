import React from 'react'
import {View, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Keyboard} from 'react-native'
import PropTypes from 'prop-types'
import {
    DIMENSION_BUTTON_SM,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../../../resources/dimens";
import {StringUtil} from "../../../../../utils/string-util";
import {
    COLOR_GRAY_BG_2,
    COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_HINT_2, COLOR_TEXT_INACTIVE,
} from "../../../../../resources/colors";
import JJIcon from "../../../../../common/view/icon/JJIcon";
import {BaseComponent} from "../../../../../common/base/BaseComponent";
import CardView from '../../../../../common/view/card/CardView';
import ButtonFilled from '../../../../../common/view/button/ButtonFilled';
import {Text} from "native-base";

export default class PromoCodeInput extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            promoCodeInput: undefined,
            showApplyButton: false
        }
    }

    render() {
        return (
            <CardView
                style={styles.container}
                title={'Mã giảm thêm'}>

                <View style={styles.contentLayout}>
                    <View style={{flex: 1}}>
                        <TextInput
                            placeholder={'Nhập mã giảm thêm (nếu có)'}
                            underlineColorAndroid='transparent'
                            multiline={false}
                            autoCorrect={false}
                            value={this.state.promoCodeInput}
                            placeholderTextColor={COLOR_TEXT_HINT_2}
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            onChangeText={this._onPromoCodeInputChanged}
                            editable={!this.props.isLoading}
                            onSubmitEditing={this._onApplyPromoCodeClicked}
                            style={styles.promoCodeInput}/>

                        {
                            !!this.props.appliedDescription &&
                            <TouchableOpacity
                                style={styles.promoCodeApplied}
                                activeOpacity={0.8}
                                onPress={this.props.onOpenPromoCodeDetailPressed}>

                                <Text style={styles.textPromoCodeApplied}>
                                    {this.props.appliedDescription}
                                </Text>
                                <Text style={styles.textLabelApplied}>
                                    đã được kích hoạt >
                                </Text>
                            </TouchableOpacity>
                        }

                        {
                            (this.state.showApplyButton || !!this.props.appliedDescription)
                            &&
                            <TouchableOpacity style={styles.buttonClear} onPress={this._onClearPromoCodeInput}>
                                <JJIcon color={COLOR_TEXT_INACTIVE} name={'x_circle_o'} size={14}/>
                            </TouchableOpacity>
                        }
                        {
                            !!this.props.isLoading &&
                            <ActivityIndicator color={COLOR_PRIMARY} animating={true} size={'small'} style={styles.loading}/>
                        }
                    </View>
                    {
                        this.state.showApplyButton &&
                        !this.props.appliedDescription &&
                        <ButtonFilled
                            style={styles.buttonApplyPromoCode}
                            title={'ÁP DỤNG'}
                            onPress={this._onApplyPromoCodeClicked}/>
                    }
                </View>
            </CardView>
        )
    }

    _onPromoCodeInputChanged = (text) => {
        console.log('_onPromoCodeInputChanged', text)
        this.setState({
            promoCodeInput: text,
            showApplyButton: !StringUtil.isBlank(text),
        });
    }

    _onClearPromoCodeInput = () => {
        this.setState({promoCodeInput: '', showApplyButton: false});
        !!this.props.onClearPressed && this.props.onClearPressed();
    }

    _onApplyPromoCodeClicked = () => {
        Keyboard.dismiss();
        !!this.props.onApplyPressed && this.props.onApplyPressed(this.state.promoCodeInput);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('PromoCodeInput:shouldComponentUpdate', nextState, this.state, nextProps.timebaseBooking.getIn(['selected', 'promocode', 'id']), this.props.timebaseBooking.getIn(['selected', 'promocode', 'id']));
        if (nextState.promoCodeInput !== this.state.promoCodeInput) return true;
        if (nextState.showApplyButton !== this.state.showApplyButton) return true;
        if (nextProps.isLoading !== this.props.isLoading) return true;
        if (nextProps.appliedDescription !== this.props.appliedDescription) return true;
        if (nextProps.appliedType !== this.props.appliedType) return true;
        return false;
    }

    componentWillReceiveProps(nextProps) {
        // console.log('PromoCodeInput:componentWillReceiveProps', nextProps.timebaseBooking.getIn(['promocode', 'input']), this.state.promoCodeInput);
    }
}

PromoCodeInput.propTypes = {
    isLoading: PropTypes.bool,
    appliedDescription: PropTypes.string,
    appliedType: PropTypes.any,
    onApplyPressed: PropTypes.func,
    onClearPressed: PropTypes.func,
    onOpenPromoCodeDetailPressed: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        marginTop: DIMENSION_PADDING_LARGE,
        marginBottom: DIMENSION_PADDING_TINY,
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM
    },
    contentLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: DIMENSION_PADDING_MEDIUM
    },
    promoCodeInput: {
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_BLACK_1,
        flex: 1,
        height: DIMENSION_BUTTON_SM,
        fontWeight: 'bold',
        backgroundColor: COLOR_GRAY_BG_2,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_LARGE,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        borderColor: COLOR_GRAY_BG_2
    },
    buttonClear: {
        position: 'absolute',
        right: 0,
        top: 1,
        bottom: 1,
        padding: DIMENSION_PADDING_SMALL,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        position: 'absolute',
        right: DIMENSION_PADDING_SMALL,
        top: DIMENSION_PADDING_SMALL
    },
    buttonApplyPromoCode: {
        height: DIMENSION_BUTTON_SM,
        marginLeft: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL
    },
    promoCodeApplied: {
        flexDirection: 'row',
        flex: 1,
        height: DIMENSION_BUTTON_SM,
        backgroundColor: COLOR_GRAY_BG_2,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        borderColor: COLOR_GRAY_BG_2,
        position: 'absolute',
        left: 0,
        alignItems: 'center',
        right: DIMENSION_PADDING_LARGE
    },
    textPromoCodeApplied: {
        color: '#4BC731',
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_CONTENT,
        padding: 0,
        textAlignVertical: 'center'
    },
    textLabelApplied: {
        color: '#4BC731',
        fontSize: DIMENSION_TEXT_CONTENT,
        marginLeft: DIMENSION_PADDING_TINY,
        textAlignVertical: 'center'
    }
})