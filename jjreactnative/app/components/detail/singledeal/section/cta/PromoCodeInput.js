import React from 'react'
import {Text} from 'native-base'
import {View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, TextInput, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import {
    DIMENSION_BUTTON_SMALL, DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../../../resources/dimens";
import {StringUtil} from "../../../../../utils/string-util";
import {
    COLOR_GRAY_BG_2, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE
} from "../../../../../resources/colors";
import JJIcon from "../../../../common/JJIcon";
import {BaseComponent} from "../../../../common/BaseComponent";

const ios = Platform.OS === 'ios'

export default class PromoCodeInput extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            promoCodeInput: undefined,
            showApplyButton: false
        }
    }

    render() {
        // console.log('PromoCodeInput: renmder============');
        return (
            <View style={{
                paddingBottom: DIMENSION_PADDING_MEDIUM,
                paddingLeft: DIMENSION_PADDING_MEDIUM,
                paddingRight: DIMENSION_PADDING_MEDIUM,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <View style={{ flex: 1 }}>
                    {
                        !this.props.timebaseBooking.getIn(['selected', 'promocode']) &&
                        <TextInput
                            placeholder={'Nhập mã giảm thêm (nếu có)'}
                            underlineColorAndroid='transparent'
                            multiline={false}
                            value={this.state.promoCodeInput}
                            placeholderTextColor={COLOR_TEXT_INACTIVE}
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            onChangeText={this._onPromoCodeInputChanged}
                            editable={!this.props.timebaseBooking.getIn(['promocode', 'isLoading', false])}
                            defaultValue={this.props.timebaseBooking.getIn(['promocode', 'input'], '')}
                            onSubmitEditing={this._onApplyPromoCodeClicked}
                            style={styles.promoCodeInput} />
                    }

                    {this._renderPromoCodeApplied()}

                    {
                        !this.props.timebaseBooking.getIn(['promocode', 'isLoading'], false) &&
                        this.state.showApplyButton &&
                        <TouchableOpacity style={{
                            position: 'absolute',
                            right: 0,
                            top: 1,
                            padding: DIMENSION_PADDING_SMALL
                        }}
                                          onPress={this._onClearPromoCodeInput}>
                            <JJIcon color={COLOR_TEXT_INACTIVE}
                                    name={'x_circle_o'}
                                    size={14}/>
                        </TouchableOpacity>
                    }
                    {
                        this.props.timebaseBooking.getIn(['promocode', 'isLoading'], false) &&
                        <ActivityIndicator color={COLOR_PRIMARY}
                                           animating={true}
                                           size={'small'}
                                           style={{
                                               position: 'absolute',
                                               right: DIMENSION_PADDING_SMALL,
                                               top: DIMENSION_PADDING_SMALL
                                           }}/>
                    }
                </View>
                {
                    !this.props.timebaseBooking.getIn(['selected', 'promocode']) &&
                    this.state.showApplyButton &&
                    <TouchableOpacity style={styles.buttonApplyPromoCode}
                                      onPress={this._onApplyPromoCodeClicked}
                                      disabled={false}>
                        <Text style={{
                            color: 'white',
                            fontSize: DIMENSION_TEXT_CONTENT,
                            fontWeight: 'bold'
                        }}>
                            ÁP DỤNG
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    _renderPromoCodeApplied = () => {
        const promoCodeApplied = this.props.timebaseBooking.getIn(['selected', 'promocode']);
        if (!promoCodeApplied) return null;
        const isError = promoCodeApplied.get('errors') && promoCodeApplied.get('errors').size > 0;
        return (
            <TouchableOpacity style={styles.promoCodeApplied}
                              onPress={this._onOpenPromoCodeDetailFromPromoCodeApplied}>
                <Text style={{ color: '#4BC731', fontWeight: 'bold', fontSize: DIMENSION_TEXT_CONTENT, padding: 0, textDecorationLine: isError ? 'line-through' : 'none' }}>
                    {promoCodeApplied.get('code_name', '')}
                </Text>
                <Text style={{ flex: 1, color: isError ? COLOR_PRIMARY : '#4BC731', fontSize: DIMENSION_TEXT_CONTENT, padding: 0 }}
                      numberOfLines={1}>
                    {' - '}
                    {isError ? 'Không đủ điều kiện. Xem lại >' : promoCodeApplied.get('code_name', 'description') + ' đã kích hoạt >'}
                </Text>
            </TouchableOpacity>
        )
    }

    _onPromoCodeInputChanged = (text) => {
        console.log('_onPromoCodeInputChanged', text)
        this.setState({
            promoCodeInput: text,
            showApplyButton: !StringUtil.isBlank(text),
        }, this._notifyPromoCodeChanged);
    }

    _onClearPromoCodeInput = () => {
        if (this.props.timebaseBooking.getIn(['selected', 'promocode'])) {
            if (this.props.listener) this.props.listener.onClearPromoCodeApplied();
            return;
        }
        this.setState({promoCodeInput: '', showApplyButton: false});
        if (this.props.listener) this.props.listener.onClearPromoCodeInput();
    }

    _onApplyPromoCodeClicked = () => {
        Keyboard.dismiss();
        if (this.props.listener && !StringUtil.isBlank(this.state.promoCodeInput)) this.props.listener.onApplyPromoCodeClicked(this.state.promoCodeInput);
    }

    _notifyPromoCodeChanged = () => {
        if (!!this.props.listener.onPromoCodeInputChanged) this.props.listener.onPromoCodeInputChanged(this.state.promoCodeInput);
    }

    _onOpenPromoCodeDetailFromPromoCodeApplied = () => {
        const promoCodeApplied = this.props.timebaseBooking.getIn(['selected', 'promocode']);
        if (!promoCodeApplied) return null;
        if (this.props.listener) this.props.listener.openPromoCodeDetail(promoCodeApplied, 'deactive')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('PromoCodeInput:shouldComponentUpdate', nextState, this.state, nextProps.timebaseBooking.getIn(['selected', 'promocode', 'id']), this.props.timebaseBooking.getIn(['selected', 'promocode', 'id']));
        if (nextState.promoCodeInput !== this.state.promoCodeInput) return true;
        if (nextState.showApplyButton !== this.state.showApplyButton) return true;
        if (nextProps.deal.get('code_status', 0) !== this.props.deal.get('code_status', 0)) return true;
        if (nextProps.timebaseBooking.getIn(['selected', 'promocode', 'id']) !== this.props.timebaseBooking.getIn(['selected', 'promocode', 'id'])) return true;
        if (nextProps.timebaseBooking.getIn(['selected', 'promocode', 'errors']) !== this.props.timebaseBooking.getIn(['selected', 'promocode', 'errors'])) return true;
        if (nextProps.timebaseBooking.getIn(['promocode', 'isLoading'], false) !== this.props.timebaseBooking.getIn(['promocode', 'isLoading'], false)) return true;
        // if (nextProps.timebaseBooking.getIn(['promocode', 'input']) !== this.state.promoCodeInput) return true;
        return false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('PromoCodeInput:componentDidUpdate', this.props, prevProps);
    }

    componentDidMount() {
        super.componentDidMount();
        console.log('PromoCodeInput:componentDidMount', this.props.timebaseBooking.toJS(), this.state);

        if (!this.state.promoCodeInput && this.props.timebaseBooking) {
            this.setState({
                promoCodeInput: this.props.timebaseBooking.getIn(['promocode', 'input']),
                showApplyButton: !StringUtil.isBlank(this.props.timebaseBooking.getIn(['promocode', 'input']))
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log('PromoCodeInput:componentWillReceiveProps', nextProps.timebaseBooking.getIn(['promocode', 'input']), this.state.promoCodeInput);
        if (nextProps.timebaseBooking.getIn(['promocode', 'input']) !== this.props.timebaseBooking.getIn(['promocode', 'input']) ||
            nextProps.timebaseBooking.getIn(['promocode', 'input']) !== this.state.promoCodeInput) {
            this.setState({
                ...this.state,
                promoCodeInput: nextProps.timebaseBooking.getIn(['promocode', 'input']),
                showApplyButton: !StringUtil.isBlank(nextProps.timebaseBooking.getIn(['promocode', 'input']))
            })
        }
    }
}

PromoCodeInput.propTypes = {
    deal: PropTypes.object,
    timebaseBooking: PropTypes.object,
    listener: PropTypes.object,
}

const styles = StyleSheet.create({
    promoCodeInput: {
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_BLACK_1,
        height: DIMENSION_BUTTON_SMALL,
        flex: 1,
        backgroundColor: 'rgba(239,134,59,0.1)',
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_LARGE,
        paddingTop: ios ? 2 : DIMENSION_PADDING_TINY,
        paddingBottom: 0,
        textAlignVertical: 'top',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        borderColor: 'rgba(238,133,58,0.2)'
    },
    promoCodeApplied: {
        height: DIMENSION_BUTTON_SMALL,
        flex: 1,
        backgroundColor: 'rgba(239,134,59,0.1)',
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(238,133,58,0.2)'
    },
    buttonApplyPromoCode: {
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        height: DIMENSION_BUTTON_SMALL,
        backgroundColor: COLOR_PRIMARY,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: DIMENSION_PADDING_MEDIUM
    }
})