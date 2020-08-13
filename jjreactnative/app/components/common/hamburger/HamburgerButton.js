
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { toggleMenu } from './action';
import { COLOR_PRIMARY } from '../../../resources/colors';

const HamburgerButton = (props) => (
    <TouchableOpacity
        onPress={() => {
            props.dispatch(toggleMenu)
        }}
        style={{
            height: 44,
            width: 44,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red'
        }}>
        <Icon name={"menu"} size={24} color={COLOR_PRIMARY} style={{ height: 24, width: 24, backgroundColor: 'green' }} />
    </TouchableOpacity>
)

export default HamburgerButton;