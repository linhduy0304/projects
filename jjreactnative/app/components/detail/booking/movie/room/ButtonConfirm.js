import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types';

import {BaseComponent} from "../../../../common/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_HEADER
} from "../../../../../resources/dimens";
import {COLOR_PRIMARY} from "../../../../../resources/colors";
import SelectedView from './SelectedView';

export default class ButtonConfirm extends BaseComponent {

    render() {

        const hasSeatSelected = !!this.props.seatsSelected && this.props.seatsSelected.size > 0;

        let text = 'ĐẶT CHỖ';
        if (!!hasSeatSelected) {
            text = `ĐẶT ${this.props.seatsSelected.size} CHỖ`;
        }

        return (
            <View
                style={{
                    paddingTop: DIMENSION_PADDING_MEDIUM,
                    paddingBottom: DIMENSION_PADDING_MEDIUM,
                    backgroundColor: 'white',
                    width: '100%',
                    flex: 1,
                    justifyContent: 'flex-end'
                }}>

                {
                    !!hasSeatSelected &&
                    <SelectedView
                        onRemoveSeatSelectedPress={this.props.onRemoveSeatSelectedPress}
                        seatsSelected={this.props.seatsSelected}/>
                }

                <TouchableOpacity
                    disabled={!hasSeatSelected}
                    style={{
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        backgroundColor: COLOR_PRIMARY,
                        paddingTop: DIMENSION_PADDING_MEDIUM,
                        paddingBottom: DIMENSION_PADDING_MEDIUM,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: hasSeatSelected ? 1 : 0.8
                    }}
                    activeOpacity={0.8}
                    onPress={this.props.onPress}>

                    <Text
                        style={{
                            color: 'white',
                            fontSize: DIMENSION_TEXT_HEADER,
                            fontWeight: 'bold'
                        }}
                        uppercase={true}>
                        {text}
                    </Text>

                </TouchableOpacity>

            </View>
        )
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.seatsSelected) return true;
        if (!this.props.seatsSelected) return true;

        if (!nextProps.seatsSelected.equals(this.props.seatsSelected)) return true;

        return false;
    }
}

ButtonConfirm.propTypes = {
    onPress: PropTypes.any,
    onRemoveSeatSelectedPress: PropTypes.any,
    seatsSelected: PropTypes.any
}