import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_LARGE } from '../../resources/dimens';
import { COLOR_TEXT_GRAY } from '../../resources/colors';
import JJIcon from '../../common/view/icon/JJIcon';
import { GOOGLE_API_KEY } from '../../const';
import PropTypes from 'prop-types';
export default class HistoryRow extends Component {
    chooseLocation = async () => {
        const { item } = this.props;
        try {
            if (item.isNearby) {
                const placeRaw = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${
                    item.place_id
                }&fields=formatted_address,geometry&key=${GOOGLE_API_KEY}
            `);
                const place = await placeRaw.json();
                this.props.onPress(place.result.formatted_address, item.lat, item.long);
            } else {
                this.props.onPress(item.address, item.lat, item.long);
            }
        } catch (error) {}
    };

    onPress = () => {
        this.chooseLocation();
        Keyboard.dismiss();
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
                {this.props.item.isNearby ? (
                    <JJIcon name="locate_o" size={20} color={COLOR_TEXT_GRAY} />
                ) : (
                    <JJIcon name="clock_o" size={20} color={COLOR_TEXT_GRAY} />
                )}

                <View style={{ marginLeft: DIMENSION_PADDING_LARGE, flex: 1 }}>
                    <Text style={{}} numberOfLines={3}>
                        {this.props.item.address}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: DIMENSION_PADDING_MEDIUM,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8',
        flex: 1
    }
});
