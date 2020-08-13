import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import PropTypes from 'prop-types';

import {BaseComponent} from "../../../../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM,
} from "../../../../../resources/dimens";
import SeatSelected from './SeatSelected';

const itemWidth = (Dimensions.get('window').width - 24)/4 - DIMENSION_PADDING_MEDIUM;

export default class SelectedView extends BaseComponent {

    render() {
        if (!this.props.seatsSelected || this.props.seatsSelected.size < 1) return null;

        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: DIMENSION_PADDING_MEDIUM,
                    marginLeft: DIMENSION_PADDING_MEDIUM
                }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {
                        this.props.seatsSelected.map((seat, index) => {
                            if (!seat || !seat.get) return null;
                            return (
                                <SeatSelected
                                    key={`seatSelected_${seat.get('name')}_${seat.get('id')}`}
                                    seat={seat}
                                    itemWidth={itemWidth}
                                    onRemoveSeatSelectedPress={this.props.onRemoveSeatSelectedPress}/>
                            )
                        })
                    }
                </ScrollView>

            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.seatsSelected) return true;
        if (!this.props.seatsSelected) return true;

        if (!nextProps.seatsSelected.equals(this.props.seatsSelected)) return true;

        return false;
    }
}

SelectedView.propTypes = {
    seatsSelected: PropTypes.any,
    onRemoveSeatSelectedPress: PropTypes.any
}