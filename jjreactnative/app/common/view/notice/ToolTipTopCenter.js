import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import {styles} from "./styles";
import {BasePureComponent} from "../../base/BasePureComponent";
import {DIMENSION_RADIUS_MEDIUM} from "../../../resources/dimens";
import Text from '../../../common/view/text/JJText';

export default class ToolTipTopCenter extends BasePureComponent {

    render() {

        return (
            <View style={[styles.tooltipLayout, this.props.style]}>
                <FastImage
                    style={{width: 16, height: 8, alignSelf: 'center'}}
                    source={require('../../../resources/icon/compress/ic_tooltip_top_arrow.png')}
                    resizeMode={FastImage.resizeMode.cover}/>

                <View style={{
                    backgroundColor: '#3399FF',
                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                    padding: 8
                }}>

                    <Text style={{color: 'white', textAlign: 'center'}}>
                        {this.props.message}
                    </Text>

                </View>
            </View>
        )
    }
}

ToolTipTopCenter.propTypes = {
    message: PropTypes.any,
    style: PropTypes.any
}