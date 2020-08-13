import React from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity} from 'react-native'
import {Text} from 'native-base'
import {BaseComponent} from "../../BaseComponent";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../../resources/dimens";
import {COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../../../resources/colors";

export default class MenuOptionItem extends BaseComponent {

    render() {

        return (
            <View style={{width: '100%'}}>
                <TouchableOpacity style={{
                    padding: DIMENSION_PADDING_MEDIUM
                }}
                                  onPress={this._onPress}>

                    <Text style={{color: this.props.item.id === 'delete' ? COLOR_PRIMARY : COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, textAlign: 'center'}}>
                        {this.props.item.title}
                    </Text>

                </TouchableOpacity>

                {
                    !!this.props.showBottomLine &&
                    <View style={{backgroundColor: COLOR_LINE, height: 1, marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>
                }

            </View>
        )
    }

    _onPress = () => {
        if (!!this.props.onItemSelected) this.props.onItemSelected(this.props.item);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.item) return false;
        if (nextProps.item !== undefined && this.props.item === undefined) return true;
        if (!this.props.item) return false;
        if (nextProps.item.id !== this.props.item.id) return true;
        return false;
    }
}

MenuOptionItem.propTypes = {
    item: PropTypes.any,
    onItemSelected: PropTypes.any,
    showBottomLine: PropTypes.any
}

