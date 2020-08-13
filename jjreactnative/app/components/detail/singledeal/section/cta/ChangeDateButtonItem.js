import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {BaseComponent} from "../../../../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT
} from "../../../../../resources/dimens";
import {COLOR_TEXT_INACTIVE_DISABLE} from "../../../../../resources/colors";
import JJIcon from "../../../../common/JJIcon";

const HeightOfTimeBase = 56;

export default class ChangeDateButtonItem extends BaseComponent {

    render() {

        return (
            <View
                style={{
                    paddingTop: DIMENSION_PADDING_SMALL,
                    paddingBottom: DIMENSION_PADDING_MEDIUM,
                    flexDirection: 'row',
                    paddingRight: DIMENSION_PADDING_MEDIUM
                }}>
                <View
                    style={{
                        height: HeightOfTimeBase,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: DIMENSION_PADDING_MEDIUM
                    }}>
                    <View
                        style={{
                            backgroundColor: COLOR_TEXT_INACTIVE_DISABLE,
                            height: 10,
                            width: 10,
                            borderRadius: 5
                        }}/>
                </View>

                <TouchableOpacity
                    style={{
                        height: HeightOfTimeBase,
                        backgroundColor: '#4bc731',
                        borderColor: '#4bc731',
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: DIMENSION_PADDING_SMALL
                    }}
                    activeOpacity={0.8}
                    onPress={this.props.onPress}>

                    <JJIcon name='calendar_o'
                            color='white'
                            size={14} />

                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: DIMENSION_TEXT_CONTENT,
                            marginTop: DIMENSION_PADDING_SMALL
                        }}>
                        HÔM KHÁC
                    </Text>

                </TouchableOpacity>
            </View>
        )
    }
}

ChangeDateButtonItem.propTypes = {
    onPress: PropTypes.any
}