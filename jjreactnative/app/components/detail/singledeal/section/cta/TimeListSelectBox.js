import React from 'react';
import PropTypes from 'prop-types';
import {View, VirtualizedList} from 'react-native';
import {Text} from 'native-base';
import moment from 'moment/min/moment-with-locales';

import {BaseComponent} from "../../../../common/BaseComponent";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../../../resources/dimens";
import {COLOR_TEXT_INACTIVE_DISABLE} from "../../../../../resources/colors";
import ChangeDateButtonItem from './ChangeDateButtonItem';
import TimeSelectionItem from './TimeSelectionItem';
import {AppConfig} from '../../../../../common/config';

moment.locale('vi');

export default class TimeListSelectBox extends BaseComponent {

    currentScrollX = 0;

    render() {

        if (!this.props.timebaseBooking || !!this.props.timebaseBooking.get('isLoading')) {
            return (
                <View
                    style={{
                        padding: DIMENSION_PADDING_MEDIUM,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 56
                    }}>

                    <Text
                        style={{
                            color: COLOR_TEXT_INACTIVE_DISABLE,
                            fontSize: DIMENSION_TEXT_CONTENT
                        }}>
                        Đang tải...
                    </Text>
                </View>
            );
        }

        console.log('TimeListSelectBox:render', this.props.timebaseBooking.toJS());

        return (
            <VirtualizedList
                ref={this._onTimeSelectRef}
                data={{list: this.props.timebaseBooking.getIn(['selected', 'times']), selected: this.props.timebaseBooking.getIn(['selected', 'time'])}}
                onScroll={this._onScrollList}
                getItemCount={this._getTimeItemCount}
                getItem={this._getTimeItem}
                keyExtractor={this._getTimeItemKeyExtractor}
                ListHeaderComponent={this._renderHeaderList}
                renderItem={this._renderTimeItem}
                ListFooterComponent={this._renderFooterItem}
                removeClippedSubviews={!AppConfig.ios}
                horizontal={true}
                showsHorizontalScrollIndicator={false}/>
        )
    }

    _getTimeItemCount = (data) => !!data.list ? data.list.size : 0;

    _getTimeItem = (data, index) => {
        return {
            time: data.list.get(index),
            selected: data.selected
        }
    };

    _getTimeItemKeyExtractor = (item, index) => `time_${index}_${item.time.get('id')}_${index}`;

    _onScrollList = e => {
        try {
            this.currentScrollX = e.nativeEvent.contentOffset.x;
        } catch (e) {
            console.log(e);
        }
    }

    _renderHeaderList = () => <View style={{width: DIMENSION_PADDING_MEDIUM}}/>;

    _renderTimeItem = ({ item, index }) => (
        <TimeSelectionItem
            time={item.time}
            index={index}
            dealType={this.props.dealType}
            selectedTime={item.selected}
            onSlotSelected={this._onTimeItemSelect}/>
    )

    _renderFooterItem = () => <ChangeDateButtonItem onPress={this.props.onOpenDatePickerPressed}/>;

    _onTimeSelectRef = (ref) => this.timePickerRef = ref;

    _onTimeItemSelect = (time, index) => {
        !!this.props.onSelected && this.props.onSelected(time);
        try {
            if (!index) return;
            this._scrollToPosition(index);
        } catch (e) {
            console.log('_onTimeItemSelect', e);
        }
    }

    _scrollToPosition = (index) => {
        try {
            console.log('_scrollToPosition', index);
            if (!index) return;
            if (this.mounted && this.timePickerRef) {
                this.timePickerRef.scrollToIndex({animated: true, index: index, viewPosition: 0.5});
            }
        } catch (e) {
            console.log('_scrollToPosition', e);
        }
    }

    _scrollToStartOffset = () => {
        try {
            console.log('_scrollToStartOffset: ', this.currentScrollX);
            let offset = 0;
            if (this.currentScrollX <= 0) offset = 1;
            if (this.mounted && this.timePickerRef) {
                this.timePickerRef.scrollToOffset({animated: true, offset: offset});
            }
        } catch (e) {
            console.log('_scrollToStartOffset', e);
        }
    }

    shouldComponentUpdate(nextProps) {
        try {
            if (!nextProps.timebaseBooking) return true;
            if (!this.props.timebaseBooking) return true;
            if (!!nextProps.timebaseBooking &&
                !nextProps.timebaseBooking.getIn(['selected', 'times']).equals(this.props.timebaseBooking.getIn(['selected', 'times']))) return true;

            if (!!nextProps.timebaseBooking.getIn(['selected', 'time']) &&
                !nextProps.timebaseBooking.getIn(['selected', 'time']).equals(this.props.timebaseBooking.getIn(['selected', 'time']))) return true;
        } catch (e) {
            console.log(e);
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        try {
            //change date
            if (!!prevProps.timebaseBooking.getIn(['selected', 'date']) && !!this.props.timebaseBooking) {
                const lastDate = moment(prevProps.timebaseBooking.getIn(['selected', 'date'], ''));

                if (lastDate.isSame(moment(this.props.timebaseBooking.getIn(['selected', 'date'], '')))) return;

                if (!this.props.timebaseBooking.getIn(['selected', 'time'])) {
                    return setTimeout(this._scrollToStartOffset, 1000);
                }
                const selectedTime = this.props.timebaseBooking.getIn(['selected', 'time']);
                const selectedIndex = this.props.timebaseBooking.getIn(['selected', 'times']).findIndex((time, index) => time.equals(selectedTime));
                if (selectedIndex > 1) {
                    return setTimeout(() => this._scrollToPosition(selectedIndex), 1000);
                }
                return setTimeout(this._scrollToStartOffset, 1000);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

TimeListSelectBox.propTypes = {
    timebaseBooking: PropTypes.any,
    dealType: PropTypes.any,
    onSelected: PropTypes.any,
    onOpenDatePickerPressed: PropTypes.any
}