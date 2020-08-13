import React from 'react';
import PropTypes from 'prop-types';
import {View, VirtualizedList, StyleSheet} from 'react-native';
import moment from 'moment/min/moment-with-locales';

import {BaseComponent} from "../../../../common/BaseComponent";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_LARGE
} from "../../../../../resources/dimens";
import TimeSelectionItem from '../cta/TimeSelectionItem';
import {AppConfig} from '../../../../../common/config';
import {DEAL_TYPE_LAST_MIN} from "../../../../../const";
import {COLOR_PRIMARY} from "../../../../../resources/colors";

moment.locale('vi');

export default class FlashSaleTimeListSelectBox extends BaseComponent {

    currentScrollX = 0;

    render() {

        console.log('FlashSaleTimeListSelectBox:render', this.props);

        if (!this.props.times) return null;

        return (
            <View style={styles.container}>
                <VirtualizedList
                    ref={this._onTimeSelectRef}
                    data={{list: this.props.times, selected: this.props.selectedTime}}
                    onScroll={this._onScrollList}
                    getItemCount={this._getTimeItemCount}
                    getItem={this._getTimeItem}
                    keyExtractor={this._getTimeItemKeyExtractor}
                    ListHeaderComponent={this._renderHeaderList}
                    renderItem={this._renderTimeItem}
                    // removeClippedSubviews={!AppConfig.ios}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}/>
            </View>
        )
    }

    _getTimeItemCount = (data) => !!data.list ? data.list.size : 0;

    _getTimeItem = (data, index) => {
        return {
            time: data.list.get(index),
            selected: data.selected
        }
    };

    _getTimeItemKeyExtractor = (item, index) => `fs_time_${index}_${item.time.get('id')}_${index}`;

    _onScrollList = e => {
        try {
            this.currentScrollX = e.nativeEvent.contentOffset.x;
        } catch (e) {
            console.log(e);
        }
    }

    _renderHeaderList = () => <View style={{width: DIMENSION_PADDING_SMALL}}/>;

    _renderTimeItem = ({ item, index }) => (
        <TimeSelectionItem
            time={item.time}
            index={index}
            dealType={DEAL_TYPE_LAST_MIN}
            selectedTime={item.selected}
            onSlotSelected={this._onTimeItemSelect}/>
    )

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
        return true;
        try {
            if (!nextProps.times) return true;
            if (!!nextProps.times &&
                !nextProps.times.equals(this.props.times)) return true;

            if (!!nextProps.selectedTime &&
                !nextProps.selectedTime.equals(this.props.selectedTime)) return true;
        } catch (e) {
            console.log(e);
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        try {
            //change date
            // if (!!this.props.dateSelected && !moment(this.props.dateSelected).isSame(moment(prevProps.dateSelected))) {
            //     setTimeout(this._scrollToStartOffset, 1000);
            //
            // }
            // if (!!prevProps.timebaseBooking.getIn(['selected', 'date']) && !!this.props.timebaseBooking) {
            //     const lastDate = moment(prevProps.timebaseBooking.getIn(['selected', 'date'], ''));
            //
            //     if (lastDate.isSame(moment(this.props.timebaseBooking.getIn(['selected', 'date'], '')))) return;
            //
            //     if (!this.props.timebaseBooking.getIn(['selected', 'time'])) {
            //         return setTimeout(this._scrollToStartOffset, 1000);
            //     }
            //     const selectedTime = this.props.timebaseBooking.getIn(['selected', 'time']);
            //     const selectedIndex = this.props.timebaseBooking.getIn(['selected', 'times']).findIndex((time, index) => time.equals(selectedTime));
            //     if (selectedIndex > 1) {
            //         return setTimeout(() => this._scrollToPosition(selectedIndex), 1000);
            //     }
            //     return setTimeout(this._scrollToStartOffset, 1000);
            // }
        } catch (e) {
            console.log(e);
        }
    }
}

FlashSaleTimeListSelectBox.propTypes = {
    times: PropTypes.any,
    dateSelected: PropTypes.any,
    selectedTime: PropTypes.any,
    onSelected: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 1,
        paddingRight: 1,
        borderWidth: 1,
        borderColor: COLOR_PRIMARY,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: DIMENSION_RADIUS_LARGE,
        borderBottomRightRadius: DIMENSION_RADIUS_LARGE,
        marginTop: -1,
        paddingTop: DIMENSION_PADDING_SMALL
    }
});