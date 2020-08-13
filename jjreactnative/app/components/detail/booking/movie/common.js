import {Text, View} from "react-native";
import {
    DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER,
} from "../../../../resources/dimens";
import {
    COLOR_LINE,
    COLOR_TEXT_INACTIVE
} from "../../../../resources/colors";
import React from "react";

export const FormInfoViewItem = (props) => (
    <View style={{marginTop: DIMENSION_PADDING_SMALL}}>
        <View style={{justifyContent: 'space-between'}}>
            <Text
                style={{
                    justifyContent: 'flex-start',
                    color: COLOR_TEXT_INACTIVE,
                    fontSize: DIMENSION_TEXT_CONTENT
                }}>
                {props.leftTitle}
            </Text>

            {
                !!props.renderValue &&
                props.renderValue()
            }

            {
                !!props.rightTitle &&
                <Text
                    style={{
                        justifyContent: 'flex-end',
                        marginTop: DIMENSION_PADDING_TINY,
                        fontSize: DIMENSION_TEXT_CONTENT,
                        color: props.color,
                        fontWeight: props.weight
                    }}>
                    {props.rightTitle}
                </Text>
            }

        </View>
        <View
            style={{
                height: 1,
                width: '100%',
                backgroundColor: COLOR_LINE,
                marginTop: DIMENSION_PADDING_SMALL
            }}/>
    </View>
)

export const FormInfoViewItemBottom = (props) => (
    <View style={{marginTop: DIMENSION_PADDING_LARGE}}>
        <Text
            style={{
                color: COLOR_TEXT_INACTIVE,
                fontSize: DIMENSION_TEXT_CONTENT
            }}>
            {props.leftTitle}
        </Text>
        <View style={{flexDirection: 'row', marginTop: DIMENSION_PADDING_TINY}}>
            {
                !!props.leftValue &&
                <Text
                    style={{
                        color: COLOR_TEXT_INACTIVE,
                        fontWeight: props.weight,
                        fontSize: DIMENSION_TEXT_HEADER,
                        textDecorationLine: 'line-through'
                    }}>
                    {props.leftValue}
                </Text>
            }
            <Text
                style={{
                    marginLeft: !!props.leftValue ? DIMENSION_PADDING_MEDIUM : 0,
                    color: props.color,
                    fontWeight: props.weight,
                    fontSize: DIMENSION_TEXT_HEADER
                }}>
                {props.rightValue}
            </Text>
        </View>
    </View>
);