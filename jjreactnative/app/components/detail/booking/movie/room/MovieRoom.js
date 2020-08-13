import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {Text} from 'native-base';

import Repository from "./Repository";
import JJHeader from "../../../../common/JJHeader";
import {COLOR_GRAY_BG, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";
import {DIMENSION_TEXT_HEADER, DIMENSION_TEXT_SUB} from "../../../../../resources/dimens";
import JJIcon from "../../../../common/JJIcon";
import RoomView from './RoomView';
import {AnalyticsUtil} from "../../../../common/analytics/analytics";
import MovieRoomHeader from './MovieRoomHeader';
import ButtonConfirm from './ButtonConfirm';
import PopupBookingHolding from './PopupBookingHolding';
import LoadingViewPopup from "../../../../../common/view/loading/LoadingViewPopup";

const isIOS = Platform.OS === 'ios';
const headerHeight = isIOS ? 44 : 56;

const rightHeaderItem = () => <View style={{ flex: 1, width: headerHeight }} />;

export default class MovieRoom extends Repository {

    render() {

        return (
           <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG, flexDirection: 'column'}}>
               {/* Toolbar */}
               <JJHeader
                   navigation={this.props.navigation}
                   customTitleView={() => {
                       return (
                           <View style={{
                               width: '100%',
                               height: '100%',
                               justifyContent: 'center',
                               alignItems: 'center',
                           }}>
                               <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB }}>
                                   BHD Star Cineplex
                               </Text>
                               <Text style={{ color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                                   CHỌN CHỖ NGỒI
                               </Text>
                           </View>
                       )
                   }}
                   leftItem={this._renderLeftButton}
                   rightItem={rightHeaderItem}
               />

               <MovieRoomHeader
                    name={this.deal.get('film_name')}
                    highlight={this.booking.getIn(['time', 'highlight'], '')}
                    bookingTime={this.booking.getIn(['time', 'time'])}
                    storeAddress={this.booking.getIn(['store', 'address'], '')}/>

               <RoomView
                    room={this.state.data.get('room')}
                    onSeatPressed={this._onSeatPressed}/>

               <ButtonConfirm
                    onRemoveSeatSelectedPress={this._onRemoveSeatSelectedPress}
                    onPress={this._onPressBooking}
                    seatsSelected={this.state.data.get('seatsSelected')}/>

               {
                   !!this.state.data.get('order') &&
                   !!this.state.showPopupCountDown &&
                   <PopupBookingHolding
                        time={this.state.time}
                        onPressClose={this._onClosePopupHolding}
                        onTimeOut={this._onTimeOutHolding}
                        onPressSubmit={this._onSubmitHolding}/>
               }

               <LoadingViewPopup
                   visible={this.state.loading}/>
           </View>
        )
    }

    _renderLeftButton = () => {
        return (
            <TouchableOpacity
                style={{
                    height: headerHeight,
                    width: headerHeight,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={this._onBackButtonClicked}>
                <JJIcon
                    style={{ marginBottom: Platform.OS === 'ios' ? 4 : 0 }}
                    name={'chevron_left_o'}
                    color={COLOR_TEXT_INACTIVE}
                    size={16} />
            </TouchableOpacity>
        )
    }

    _onBackButtonClicked = () => {
        AnalyticsUtil.logNormalEvent(
            'movie_booking_room_back',
            this.baseLogParams,
            'booking'
        );
        this.props.navigation.goBack();
    }

}