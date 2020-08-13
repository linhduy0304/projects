import React from 'react'
import PropTypes from 'prop-types';
import {Easing, TouchableOpacity, View, Dimensions} from 'react-native';
import {Text} from 'native-base';
import moment from 'moment/min/moment-with-locales';

import {BaseComponent} from "../../../../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB
} from "../../../../../resources/dimens";
import {
    COLOR_LINE, COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE_DISABLE
} from "../../../../../resources/colors";
import JJIcon from "../../../../common/JJIcon";
import {TimeBaseStatus} from "../../repo/BookingRepo";
import {DateUtil} from "../../../../../utils/date-utils";
import Popover from "react-native-popover-view";

const {width} = Dimensions.get('window');
moment.locale('vi');

export default class DateSelectBox extends BaseComponent {

    didShowChangeDatePopover = false;

    constructor() {
        super();
        this.state = {
            showPopoverChangeDateButton: false
        }
    }

    render() {
        if (!this.props.timebaseBooking) return null;

        const disable = !!this.props.timebaseBooking.get('isLoading') ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.LOADING ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.NOT_GO_LIVE ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.UNKNOWN_ERROR ||
            this.props.timebaseBooking.get('status') === TimeBaseStatus.EMPTY_STORE;

        let dateStr = 'Chọn ngày';
        if (!!this.props.timebaseBooking.getIn(['selected', 'date'])) {
            dateStr = DateUtil.formatCalendarDate(this.props.timebaseBooking.getIn(['selected', 'date']));
        }

        console.debug("SInhpn", this.props.timebaseBooking.toJS());

        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingRight: DIMENSION_PADDING_MEDIUM
                }}>

                <View>
                    <TouchableOpacity
                        onPress={this.props.onPressed}
                        disabled={disable}
                        ref={this._onButtonChangeDateRef}
                        style={{
                            padding: DIMENSION_PADDING_SMALL,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: COLOR_LINE,
                            borderWidth: 1,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            marginTop: DIMENSION_PADDING_SMALL,
                            justifyContent: 'space-between'
                        }}>
                        <JJIcon name={'calendar_o'}
                                size={12}
                                color={COLOR_TEXT_BLACK_1}/>

                        <Text numberOfLines={1}
                              style={{
                                  marginLeft: 2,
                                  marginRight: 2,
                                  fontSize: DIMENSION_TEXT_CONTENT,
                                  color: disable ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_TEXT_BLACK_1
                              }}>
                            {dateStr}
                        </Text>

                        <JJIcon style={{ alignSelf: 'flex-end', marginBottom: 3, marginLeft: 2 }}
                                name={'chevron_down_o'}
                                size={8}
                                color={disable ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_TEXT_BLACK_1} />
                    </TouchableOpacity>
                </View>

                {
                    (
                        !!this.props.timebaseBooking.get('errorMessage') ||
                        !!this.props.timebaseBooking.get('errorTimeSelectedMessage')
                    ) &&
                    this.props.timebaseBooking.getIn(['selected', 'times'], {size: 0}).size > 0
                        &&
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingTop: DIMENSION_PADDING_SMALL,
                            paddingLeft: DIMENSION_PADDING_SMALL
                        }}>
                        <Text
                            style={{
                                width: '100%',
                                color: COLOR_PRIMARY,
                                fontSize: DIMENSION_TEXT_SUB,
                                textAlign: 'right'
                            }}>
                            {!!this.props.timebaseBooking.get('errorTimeSelectedMessage') ? this.props.timebaseBooking.get('errorTimeSelectedMessage') : this.props.timebaseBooking.get('errorMessage')}
                        </Text>
                    </View>
                }

                {
                    !!this.state.showPopoverChangeDateButton &&
                    <Popover
                        popoverStyle={{
                            backgroundColor: '#3399ff',
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            width: width - 32,
                            marginLeft: DIMENSION_PADDING_SMALL,
                        }}
                        showBackground={false}
                        onClose={this._onClosePopoverChangeDateButton}
                        verticalOffset={-18}
                        isVisible={true}
                        fromView={this.changeDateButtonRef}
                        animationConfig={{
                            duration: 50,
                            easing: Easing.ease,
                            useNativeDriver: true
                        }}>

                        <View style={{
                            width: width - 32,
                            padding: DIMENSION_PADDING_SMALL,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{flex: 1}}>
                                <Text style={{color: 'white', fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}>
                                    Lưu ý:
                                </Text>
                                <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_CONTENT, marginTop: 2 }}>
                                    Bạn đang đặt chỗ cho <Text style={{color: 'white', fontSize: DIMENSION_TEXT_CONTENT, textDecorationLine: 'underline'}}>{DateUtil.formatFullCalendarDate(this.props.timebaseBooking.getIn(['selected', 'date']))}</Text>
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                                    paddingTop: DIMENSION_PADDING_MEDIUM,
                                    paddingRight: DIMENSION_PADDING_SMALL,
                                    paddingBottom: DIMENSION_PADDING_MEDIUM,
                                }}
                                onPress={this._onClosePopoverChangeDateButton}>
                                <JJIcon name={'x_o'}
                                        color={'white'}
                                        size={16} />
                            </TouchableOpacity>
                        </View>
                    </Popover>
                }
            </View>
        )
    }

    _onButtonChangeDateRef = (ref) => this.changeDateButtonRef = ref;

    _onClosePopoverChangeDateButton = () => {
        this.setState({
            ...this.state,
            showPopoverChangeDateButton: false
        });
        this.props.onClosePopoverChangeDateButton && this.props.onClosePopoverChangeDateButton();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        try {
            if (!!this.props.timebaseBooking.get('showTooltipAutoChangeDate', false) && !this.didShowChangeDatePopover) {
                this.didShowChangeDatePopover = true;

                if (!moment.utc(this.props.timebaseBooking.getIn(['selected', 'date'])).local().isSame(moment(), 'day')) {
                    this.setState({
                        showPopoverChangeDateButton: true
                    })
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!nextProps.timebaseBooking) return true;
            if (!this.props.timebaseBooking) return true;
            if (nextState.showPopoverChangeDateButton !== this.state.showPopoverChangeDateButton) return true;

            console.debug('DateSelectBox:shouldComponentUpdate:', nextProps.timebaseBooking.toJS());

            if (nextProps.timebaseBooking.get('status') !== this.props.timebaseBooking.get('status')) return true;
            if (nextProps.timebaseBooking.get('isLoading') !== this.props.timebaseBooking.get('isLoading')) return true;
            if (nextProps.timebaseBooking.get('errorMessage') !== this.props.timebaseBooking.get('errorMessage')) return true;
            if (nextProps.timebaseBooking.get('errorTimeSelectedMessage') !== this.props.timebaseBooking.get('errorTimeSelectedMessage')) return true;
            if (!moment(nextProps.timebaseBooking.getIn(['selected', 'date'])).isSame(this.props.timebaseBooking.getIn(['selected', 'date']), 'days')) return true;

            if (!!nextProps.timebaseBooking.getIn(['selected', 'times']) && !nextProps.timebaseBooking.getIn(['selected', 'times']).equals(this.props.timebaseBooking.getIn(['selected', 'times']))) return true;
        } catch (e) {
            console.log(e);
            return true;
        }
        return false;
    }
}

DateSelectBox.propTypes = {
    onPressed: PropTypes.any,
    onClosePopoverChangeDateButton: PropTypes.any,
    timebaseBooking: PropTypes.any
}
