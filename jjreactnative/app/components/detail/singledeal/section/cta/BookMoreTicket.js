import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import TicketSection from '../../../../../screens/TicketSection';
import { COLOR_PRIMARY } from '../../../../../resources/colors';
import Text from '../../../../../common/view/text/JJText';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';

import moment from 'moment';
moment.locale('vi');
export default class BookMoreTicket extends Component {

    render() {
        return (
            <React.Fragment>
                {!!this.props.bookedTicket && (
                    <TicketSection
                        openModal={this.props.openModal}
                        totalTicket={this.props.totalTicket}
                        bookedTicket={this.props.bookedTicket}
                        goToMovieTicket={this._goToMovieTicket}
                    />
                )}
                {!!this.props.bookedTicket && (
                    <View style={styles.useCodeBackground}>
                        <TouchableOpacity
                            style={[styles.useCodeButton, { opacity: this.getAvaliable() ? 1 : 0.5 }]}
                            onPress={this._navigateToBooking}
                            activeOpacity={0.8}
                            disabled={!this.getAvaliable()}
                        >
                            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }} uppercase={true}>
                                ĐẶT THÊM VÉ
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </React.Fragment>
        );
    }

    _navigateToBooking = () => {
        const { navigation, bookedTicket } = this.props;
        if (!!bookedTicket) {
            const bookingInfo = { ...bookedTicket[0] };

            const date = new Date(bookingInfo.check_in_time * 1000);

            const booking = {
                slot: 1,

                date: date,
                store: {
                    id: bookingInfo.cinema_id,
                    address: bookingInfo.cinema
                },
                time: {
                    highlight: bookingInfo.booking_highlight,
                    id: bookingInfo.booking_schedule,
                    min_slot: bookingInfo.min_slot,
                    max_slot_per_voucher: bookingInfo.max_slot_per_voucher,
                    slotAvailable: bookingInfo.slot_available,
                    time: date
                }
            };
            // console.log(booking);
            navigation.navigate('MovieRoom', {
                deal: this.props.deal,
                booking: fromJS(booking)
            });
        }
    };

    _goToMovieTicket = id => {
        this.props.navigation.push('MovieReservationInfo', {
            couponId: id
        });
    };

    getAvaliable = () => {
        if (!!this.props.bookedTicket && !!this.props.bookedTicket[0]) {
            return moment().unix() < this.props.bookedTicket[0].check_in_time && this.props.bookedTicket[0].slot_available > 0 && !!this.props.bookedTicket[0].booking_schedule;
        }
        return false;
    };
}

BookMoreTicket.propTypes = {
    bookedTicket: PropTypes.array,
    navigation: PropTypes.object,
    openModal: PropTypes.func,
    deal: PropTypes.object,
    totalTicket: PropTypes.number
};

const styles = StyleSheet.create({
    useCodeBackground: {
        padding: 16,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    useCodeButton: {
        width: '100%',
        backgroundColor: COLOR_PRIMARY,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    }
});
