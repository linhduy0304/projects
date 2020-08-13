import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'native-base';
import { COLOR_PRIMARY } from '../../resources/colors';

const ButtonBack = (props) => (
    <Button transparent onPress={() => {
        props.navigation.goBack();
    }}>
        <Icon name='arrow-back' style={[styles.icon, props.style]} />
    </Button>
)

const styles = StyleSheet.create({
    icon: {
        color: COLOR_PRIMARY,
        alignSelf: 'center',
    }
});

export default ButtonBack;