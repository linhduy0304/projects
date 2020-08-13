import React from 'react';
import {Text} from 'native-base';
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Animated
} from 'react-native';
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/min/moment-with-locales';

import DividerLine from '../../../common/DividerLine';
import JJIcon from '../../../common/JJIcon';
import HeaderSection from '../../../common/HeaderSection';
import {COLOR_GRAY_BG, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../../../resources/colors";
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY, DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_SUB,
    DIMENSION_TEXT_TINY
} from "../../../../resources/dimens";
import {BaseComponent} from "../../../common/BaseComponent";
import JJTextViewHtml from '../../../common/view/JJTextViewHtml';
import FlashSaleApplyCondition from './flashSale/FlashSaleApplyCondition';

moment.locale('vi');

export default class ApplyConditionSection extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            isExpanding: false,
        };
        this.todayInWeek = moment().weekday()
    }

    render() {
        if (this.props.deal.get('id')) {

            return (
                <View style={{backgroundColor: 'white'}}>

                    {/* Header */}
                    <HeaderSection
                        title={'Điều kiện áp dụng'}
                    />

                    {/* Description */}
                    <TouchableWithoutFeedback
                        onPress={this._onViewMoreClicked}
                        style={{backgroundColor: 'white'}}>
                        <View style={{flexDirection: 'column'}}>

                            {
                                !!this.props.flashSaleCondition &&
                                <FlashSaleApplyCondition
                                    isExpanded={this.state.isExpanding}
                                    conditions={this.props.flashSaleCondition}/>
                            }

                            <JJTextViewHtml
                                text={this.props.deal.get('condition', '')}
                                maxHeight={this.state.isExpanding ? undefined : !!this.props.flashSaleCondition ? 48 : 150}
                                padding={DIMENSION_PADDING_MEDIUM}/>

                            {this._renderViewMoreIfNeed()}

                            {/* Calendar */}
                            {
                                this.state.isExpanding &&
                                <View style={{paddingLeft: DIMENSION_PADDING_MEDIUM, paddingRight: DIMENSION_PADDING_MEDIUM}}>
                                    <View style={{width: '100%', height: 1, backgroundColor: COLOR_LINE, marginTop: DIMENSION_PADDING_MEDIUM, marginBottom: DIMENSION_PADDING_MEDIUM}}/>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                                        <Animated.View style={
                                            [
                                                styles.circleDay,
                                                {
                                                    backgroundColor: this._renderColor(0),
                                                    width: this._isToday(0) ? 32 : 24,
                                                    height: this._isToday(0) ? 32 : 24,
                                                }
                                            ]
                                        }>
                                            <Text style={[styles.labelDay, {fontSize: this._isToday(0) ? DIMENSION_TEXT_SUB : DIMENSION_TEXT_TINY}]}>T2</Text>
                                        </Animated.View>

                                        <Animated.View
                                            style={
                                                [
                                                    styles.circleDay,
                                                    {
                                                        backgroundColor: this._renderColor(1),
                                                        width: this._isToday(1) ? 32 : 24,
                                                        height: this._isToday(1) ? 32 : 24,
                                                    },
                                                ]
                                            }>
                                            <Text style={[styles.labelDay, {fontSize: this._isToday(1) ? DIMENSION_TEXT_SUB : DIMENSION_TEXT_TINY}]}>
                                                T3
                                            </Text>
                                        </Animated.View>

                                        <Animated.View
                                            style={
                                                [
                                                    styles.circleDay,
                                                    {
                                                        backgroundColor: this._renderColor(2),
                                                        width: this._isToday(2) ? 32 : 24,
                                                        height: this._isToday(2) ? 32 : 24,
                                                    },
                                                ]
                                            }>
                                            <Text style={[styles.labelDay, {fontSize: this._isToday(2) ? DIMENSION_TEXT_SUB : DIMENSION_TEXT_TINY}]}>
                                                T4
                                            </Text>
                                        </Animated.View>

                                        <Animated.View
                                            style={
                                                [
                                                    styles.circleDay,
                                                    {
                                                        backgroundColor: this._renderColor(3),
                                                        width: this._isToday(3) ? 32 : 24,
                                                        height: this._isToday(3) ? 32 : 24,
                                                    },
                                                ]
                                            }>
                                            <Text style={[styles.labelDay, {fontSize: this._isToday(3) ? DIMENSION_TEXT_SUB : DIMENSION_TEXT_TINY}]}>
                                                T5
                                            </Text>
                                        </Animated.View>

                                        <Animated.View
                                            style={
                                                [
                                                    styles.circleDay,
                                                    {
                                                        backgroundColor: this._renderColor(4),
                                                        width: this._isToday(4) ? 32 : 24,
                                                        height: this._isToday(4) ? 32 : 24,
                                                    },
                                                ]
                                            }>
                                            <Text style={[styles.labelDay, {fontSize: this._isToday(4) ? DIMENSION_TEXT_SUB : DIMENSION_TEXT_TINY}]}>
                                                T6
                                            </Text>
                                        </Animated.View>

                                        <Animated.View
                                            style={
                                                [
                                                    styles.circleDay,
                                                    {
                                                        backgroundColor: this._renderColor(5),
                                                        width: this._isToday(5) ? 32 : 24,
                                                        height: this._isToday(5) ? 32 : 24,
                                                    },
                                                ]
                                            }>
                                            <Text style={[styles.labelDay, {fontSize: this._isToday(5) ? DIMENSION_TEXT_SUB : DIMENSION_TEXT_TINY}]}>
                                                T7
                                            </Text>
                                        </Animated.View>

                                        <Animated.View
                                            style={
                                                [
                                                    styles.circleDay,
                                                    {
                                                        backgroundColor: this._renderColor(6),
                                                        width: this._isToday(6) ? 32 : 24,
                                                        height: this._isToday(6) ? 32 : 24,
                                                    },
                                                ]
                                            }>
                                            <Text style={[styles.labelDay, {fontSize: this._isToday(6) ? DIMENSION_TEXT_SUB : DIMENSION_TEXT_TINY}]}>
                                                CN
                                            </Text>
                                        </Animated.View>
                                    </View>

                                    {this._renderNote()}
                                </View>
                            }
                        </View>
                    </TouchableWithoutFeedback>


                    {/* Divider */}
                    <DividerLine/>

                    <TouchableOpacity
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: DIMENSION_PADDING_MEDIUM}}
                        onPress={this._reportErrorDeal}>
                        <JJIcon name={"alert_triangle_o"} size={14} color='#ef863b'/>
                        <Text style={{color: '#ef863b', fontSize: DIMENSION_TEXT_CONTENT, marginRight: DIMENSION_PADDING_TINY, marginLeft: DIMENSION_PADDING_TINY, paddingBottom: 2}}>
                            Báo sai thông tin
                        </Text>
                        <JJIcon name={"chevron_right_o"} size={8} color='#ef863b'/>
                    </TouchableOpacity>

                    <View style={{backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE}}/>
                </View>
            )
        } else {
            return null;
        }
    }

    _reportErrorDeal = () => {
        this.props.navigation.navigate('ReportDeal', {"deal": this.props.deal.toJS()})
    };

    _renderColor(day) {
        if (this._isApplyDay(day)) {
            return '#4bc731';
        } else {
            return COLOR_TEXT_INACTIVE;
        }
    }

    _isToday = (day) => {
        console.log('istoday', day, this.todayInWeek, day === this.todayInWeek)
        return day === this.todayInWeek
    }

    _isApplyDay(day) {
        const applyDay = this.props.deal.get('apply_days');
        return applyDay !== undefined && applyDay !== null && applyDay.includes(day);
    }

    _renderNote() {
        if (this._isApplyDay(this.todayInWeek)) {
            return (
                <Text style={[styles.note, {color: '#4bc731'}]}>
                    Hôm nay là {moment().format('dddd')}, chương trình có áp dụng
                </Text>
            )
        } else {
            return (
                <Text style={[styles.note, {color: COLOR_TEXT_INACTIVE}]}>
                    Hôm nay là {moment().format('dddd')}, chương trình không áp dụng
                </Text>
            )
        }
    }

    _renderViewMoreIfNeed() {
        if (this.state.isExpanding) {
            return null;
        } else {
            return (
                <LinearGradient
                    colors={['rgba(255, 255, 255,0.0)', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255,1.0)']}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                    <View style={{
                        flexDirection: 'row',
                        borderRadius: 12,
                        paddingRight: 4,
                        paddingLeft: 4,
                        borderWidth: 1,
                        borderColor: COLOR_PRIMARY,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: 16,
                    }}>
                        <Text style={{color: COLOR_PRIMARY, padding: 2, fontSize: 14}}>
                            Xem thêm
                        </Text>
                        <JJIcon name={'chevron_down_o'} size={8} color={COLOR_PRIMARY}/>
                    </View>

                </LinearGradient>
            )
        }
    }

    _onViewMoreClicked = () => {
        if (!this.state.isExpanding) {
            this.setState({
                ...this.state,
                isExpanding: true
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.deal !== undefined && this.props.deal === undefined) return true;
        if (nextState.isExpanding !== this.state.isExpanding) return true;
        if (!!nextProps.flashSaleCondition && !nextProps.flashSaleCondition.equals(this.props.flashSaleCondition)) return true;

        return false;
    }
}

ApplyConditionSection.propTypes = {
    deal: PropTypes.object,
    flashSaleCondition: PropTypes.object
}

const styles = StyleSheet.create({
    circleDay: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    labelDay: {
        color: 'white',
        fontSize: 12,
    },
    note: {
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 14
    }
});