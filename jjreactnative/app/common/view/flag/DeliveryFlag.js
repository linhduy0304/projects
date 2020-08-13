import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../base/BasePureComponent";
import {DIMENSION_RADIUS_MEDIUM} from "../../../resources/dimens";

export default class DeliveryFlag extends BasePureComponent {

    containerWidth = 24;
    iconWidth = 18;
    iconHeight = 10;

    constructor(props) {
        super(props);

        if (props.size === 'large') {
            this.containerWidth = 36;
            this.iconWidth = 24;
            this.iconHeight = 18;
        }
    }


    render() {

        return (
            <View style={[styles.container, {width: this.containerWidth}, this.props.style]}>
                <FastImage
                    style={{ width: this.iconWidth, height: this.iconHeight }}
                    source={require('../../../resources/images/delivery/ic_delivery_2.png')}
                    resizeMode={FastImage.resizeMode.contain}/>
            </View>
        )
    }
}

DeliveryFlag.propTypes = {
    style: PropTypes.any,
    iconHeight: PropTypes.number,
    size: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderColor: 'white',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1
    }
});