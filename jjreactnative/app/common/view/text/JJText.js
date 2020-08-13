import React from 'react';
import { Text } from 'react-native';
import { BasePureComponent } from '../../base/BasePureComponent';
import { defaultTextStyle } from '../../../resources/styles';

export default class JJText extends BasePureComponent {
    render() {
        return (
            <Text {...this.props} style={[defaultTextStyle, this.props.style]} includeFontPadding={false}>
                {this.props.children}
            </Text>
        );
    }
}
JJText.propTypes = Text.propTypes;
JJText.defaultProps = Text.defaultProps;
