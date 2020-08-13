import React  from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import {
    COLOR_GRAY_BG,
    COLOR_PRIMARY,
    COLOR_PRIMARY_INACTIVE,
    COLOR_TEXT_BLACK_1,
    COLOR_TEXT_INACTIVE_DISABLE
} from '../../resources/colors';
import PropTypes from 'prop-types'
import {BasePureComponent} from "./BasePureComponent";

class Section extends BasePureComponent {
    render() {
        return (
            <View style={[{ backgroundColor: COLOR_GRAY_BG }, this.props.backgroundStyle]}>
                <View style={{
                    backgroundColor: COLOR_GRAY_BG,
                    marginTop: 16,
                    marginBottom: 16,
                    paddingLeft: 16
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: !!this.props.inactive ? COLOR_TEXT_INACTIVE_DISABLE : COLOR_TEXT_BLACK_1,
                        fontSize: 18,
                        marginTop: 16,
                        marginBottom: 5,
                    }}>
                        {this.props.title}
                    </Text>

                    <View style={{
                        backgroundColor: !!this.props.inactive ? COLOR_PRIMARY_INACTIVE : COLOR_PRIMARY,
                        width: 60,
                        height: 2
                    }} />
                </View>
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

Section.propTypes = {
    backgroundStyle: PropTypes.any,
    title: PropTypes.any,
    inactive: PropTypes.any,
    children: PropTypes.any
}

export default Section;
