import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {BaseComponent} from "../../common/BaseComponent";

const {width} = Dimensions.get('window');
const SCALABLE = width / 375;
const fontSize = SCALABLE*12;

export default class NotiBadge extends BaseComponent {

    render() {

        return (
            <View style={styles.badgeNumberBg}>
                <Text style={styles.badgeNumber}>
                    {this.props.count}
                </Text>
            </View>
        )
    }
}

NotiBadge.propTypes = {
    count: PropTypes.any
}

const styles = StyleSheet.create({
    badgeNumberBg: {
        backgroundColor: '#11BD00',
        borderColor: '#11BD00',
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 5,
        borderRadius: 5,
        paddingRight: 5,
        position: 'absolute',
        right: 0,
    },
    badgeNumber: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: fontSize
    }
});