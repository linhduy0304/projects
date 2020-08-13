import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE} from '../../resources/colors';
import PropTypes from 'prop-types'
import {BasePureComponent} from "./BasePureComponent";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../resources/dimens";

class SectionGrayNotBottomLine extends BasePureComponent {
    render() {
        return (
            <View style={[{ backgroundColor: COLOR_GRAY_BG }, this.props.backgroundStyle]}>
                <Text style={{
                        fontWeight: 'bold',
                        fontSize: DIMENSION_TEXT_CONTENT,
                        padding: DIMENSION_PADDING_MEDIUM,
                        color: COLOR_TEXT_INACTIVE
                    }}>
                    {this.props.title}
                </Text>
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

SectionGrayNotBottomLine.propTypes = {
    backgroundStyle: PropTypes.any,
    title: PropTypes.any,
    children: PropTypes.any
}

export default SectionGrayNotBottomLine;
