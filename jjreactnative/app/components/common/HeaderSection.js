import { Text } from 'native-base';
import { View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from '../../resources/colors';
import DividerLine from './DividerLine';
import ShowAllButton from './ShowAllButton';
import {DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_HEADER} from "../../resources/dimens";

type Props = {
    title?: PropTypes.string,
    customTitle?: PropTypes.object,
    onShowAll?: PropTypes.func,
    hiddenBottomLine?: PropTypes.boolean,
    showAllText?: PropTypes.string
}

class HeaderSection extends Component<Props> {
    render() {
        return (
            <View>
                <View style={{
                    height: DIMENSION_BUTTON_MEDIUM,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: DIMENSION_PADDING_MEDIUM,
                    marginRight: DIMENSION_PADDING_MEDIUM - 2
                }}>
                    {
                        this.props.title
                        ? (
                            <Text style={{ fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER, color: COLOR_TEXT_BLACK_1 }}>
                                {this.props.title}
                            </Text>
                        )
                        : this.props.customTitle()
                    }
                    {
                        this.props.onShowAll &&
                        <ShowAllButton onPress={this.props.onShowAll}
                                       text={this.props.showAllText}/>
                    }
                </View>

                {this.props.hiddenBottomLine === true
                    ? null
                    : <View style={{
                        backgroundColor: COLOR_PRIMARY,
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        width: 70,
                        height: 2
                    }} />
                }

                {/* Divider */}
                <DividerLine />
            </View>
        );
    }
}

export default HeaderSection;
