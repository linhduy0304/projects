import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import JJIcon from '../common/JJIcon';
import {DIMENSION_PADDING_SMALL} from "../../resources/dimens";
import {BaseComponent} from "../common/BaseComponent";

const {width} = Dimensions.get('window');
const SCALABLE = width / 375;

export default class ButtonBack extends BaseComponent {

    render() {

        return (
            <TouchableOpacity
                style={{justifyContent: 'center'}}
                activeOpacity={0.8}
                onPress={this.props.onPress}>

                <FastImage
                    source={require('../../resources/game/button_back.png')}
                    style={{
                        width: SCALABLE*46,
                        height: SCALABLE*43
                    }}
                    resizeMode={FastImage.resizeMode.cover}/>

                <JJIcon name={'chevron_left_o'}
                        size={22}
                        color={'white'}
                        style={{
                            position: 'absolute',
                            left: DIMENSION_PADDING_SMALL
                        }}/>

            </TouchableOpacity>
        )
    }

    shouldComponentUpdate(nextProps) {
        return false;
    }
}

ButtonBack.propTypes = {
    style: PropTypes.any,
    onPress: PropTypes.any
}