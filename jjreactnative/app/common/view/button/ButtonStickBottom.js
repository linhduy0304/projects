import React from 'react';
import {View} from 'react-native';
import {BasePureComponent} from "../../base/BasePureComponent";
import PropTypes from 'prop-types';

import ButtonFilled from './ButtonFilled';
import {styles} from './styles';

export default class ButtonStickBottom extends BasePureComponent{

    render() {

        return (
            <View style={[styles.buttonStickBottom, this.props.containerStyle]}>
                <ButtonFilled {...this.props}/>
            </View>
        )
    }
}

ButtonStickBottom.propTypes = {
    ...ButtonFilled.propTypes,
    containerStyle: PropTypes.any
};