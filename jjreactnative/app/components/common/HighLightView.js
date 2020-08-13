import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types'
import {DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY} from "../../resources/dimens";
import {StringUtil} from '../../utils/string-util'

export default class HighLightView extends React.PureComponent {
    render() {
        const { contentText, height, contentFontSize, contentWeight } = this.props;
        const textWeight = contentWeight !== undefined ? contentWeight : 'normal';
        if (StringUtil.isEmpty(contentText)) return null;

        return (
            <View style={[{ flexDirection: 'row', height}, this.props.style]}>

                <View style={{
                    height: height,
                    paddingLeft: DIMENSION_PADDING_SMALL,
                    backgroundColor: 'rgba(231, 57 ,72 , 0.8)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: textWeight,
                            fontSize: contentFontSize
                        }}
                        numberOfLines={1}
                        uppercase={!!this.props.uppercase}>
                        {contentText}
                    </Text>
                </View>
                <View style={{
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderRightWidth: (height / 2) - 4,
                    borderTopWidth: height,
                    borderRightColor: 'transparent',
                    borderTopColor: 'rgba(231, 57 ,72 , 0.8)',
                    borderLeftWidth: DIMENSION_PADDING_TINY,
                    borderLeftColor: 'rgba(231, 57 ,72 , 0.8)'
                }} />
            </View>
        );
    }
}

HighLightView.propTypes = {
    style: PropTypes.any,
    height: PropTypes.any,
    contentWeight: PropTypes.any,
    contentText: PropTypes.any,
    contentFontSize: PropTypes.any,
    uppercase: PropTypes.any
}
