import React from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from "../../../common/base/BaseComponent";
import {Text} from "native-base";
import {TouchableOpacity, View} from "react-native";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER
} from "../../../resources/dimens";
import {COLOR_GREEN, COLOR_TEXT_BLACK_1} from "../../../resources/colors";
import JJIcon from "../../common/JJIcon";

export default class CityListItem extends BaseComponent {

    render() {
        return (
            <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={this._onPress}>

                <Text style={{padding: DIMENSION_PADDING_MEDIUM, flex: 1, fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}>
                    {this.props.item.name}
                </Text>
                {
                    this.props.item.id === this.props.selectedId &&
                    <View style={{padding: DIMENSION_PADDING_MEDIUM}}>
                        <JJIcon name={'check_o'} size={DIMENSION_TEXT_HEADER} color={COLOR_GREEN}/>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        if (!!this.props.item.selected) return;
        if (!!this.props.onPress) this.props.onPress(this.props.item);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.item && this.props.item === undefined) return true;
        if (nextProps.item === undefined && this.props.item === undefined) return false;
        if (nextProps.item.id !== this.props.item.id) return true;
        if (nextProps.item.selectedId !== this.props.item.selectedId) return true;
        return false;
    }
}

CityListItem.propTypes = {
    onPress: PropTypes.any,
    item: PropTypes.any,
    selectedId: PropTypes.any
}