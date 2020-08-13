import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import {BaseComponent} from "../../../../common/BaseComponent";

export default class SeatView extends BaseComponent {

    render() {
        const seat = this.props.seat;
        if (!seat || seat.get('id') === -1) return null;

        const isCouple = seat.get('description').toLowerCase() === 'couple';

        if (!!isCouple && !seat.get('seatStyle')) return null;

        let l = seat.get('seatStyle') === 'L';
        let r = seat.get('seatStyle') === 'R';


        return (
            <TouchableOpacity
                style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    flex: 1
                }}
                activeOpacity={0.8}
                disabled={!seat.get('available', false)}
                onPress={this._onPress}>
                <View
                    style={{
                        justifyContent: !!l ? 'flex-start' : !!r ? 'flex-end' : 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        flex: 1
                    }}>

                    <FastImage
                        style={{
                            width: isCouple ? '60%' : '79%',
                            height: isCouple ? '90%' : '100%',
                        }}
                        source={this._getSeatImage(seat)}
                        resizeMode={isCouple ? FastImage.resizeMode.stretch : FastImage.resizeMode.contain}/>
                </View>
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        this.props.onPress(this.props.seat);
    }

    _getSeatImage = (seat) => {
        if (seat.get('selected')) {
            if (seat.get('description').toLowerCase() === 'couple') {
                if (seat.get('seatStyle') === 'R') return require('../../../../../resources/bhd/cp_r_selected.png');
                return require('../../../../../resources/bhd/cp_l_selected.png');
            }
            return require('../../../../../resources/bhd/seat_selected.png');
        }
        
        if (!!seat.get('available', false)) {
            switch (seat.get('description').toLowerCase()) {
                case 'vip': return require('../../../../../resources/bhd/seat_vip.png');
                case 'couple': {
                    if (seat.get('seatStyle') === 'R') return require('../../../../../resources/bhd/cp_r.png');
                    return require('../../../../../resources/bhd/cp_l.png');
                }
                case 'firstclass': return require('../../../../../resources/bhd/seat_first_class.png');
                default: return require('../../../../../resources/bhd/seat_normal.png');
            }
        }

        switch (seat.get('description').toLowerCase()) {
            case 'couple': {
                if (seat.get('seatStyle') === 'R') return require('../../../../../resources/bhd/cp_r_inactive.png');
                return require('../../../../../resources/bhd/cp_l_inactive.png');
            }
            default: return require('../../../../../resources/bhd/seat_locked.png');
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.seat) return true;
        if (!this.props.seat) return true;

        if (nextProps.seat.get('id') !== this.props.seat.get('id')) return true;
        if (nextProps.seat.get('name') !== this.props.seat.get('name')) return true;
        if (nextProps.seat.get('seatName') !== this.props.seat.get('seatName')) return true;
        if (nextProps.seat.get('selected') !== this.props.seat.get('selected')) return true;
        if (nextProps.seat.get('status') !== this.props.seat.get('status')) return true;

        return false;
    }
}

SeatView.propTypes = {
    seat: PropTypes.any,
    onPress: PropTypes.any
}