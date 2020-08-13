import React from 'react'
import PropTypes from 'prop-types'
import {Text} from "native-base";
import {TouchableOpacity, View} from "react-native";
import {BaseComponent} from "../common/BaseComponent";
import {COLOR_GRAY_BG, COLOR_LINE, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../resources/colors";
import {DIMENSION_RADIUS_LARGE, DIMENSION_TEXT_HEADER} from "../../resources/dimens";

export default class PriceItem extends BaseComponent {

    render() {

        const {item, isFirst, isLast} = this.props;

        return (
            <View style={{flexDirection: 'row', flex: 1}}>
                {/* Render Separator Line */}
                {
                    !isFirst &&
                    <View style={{width: 1, height: '100%', backgroundColor: COLOR_LINE}}/>
                }
                {/* Render Toogle Button */}
                <TouchableOpacity
                    onPress={this._onPress}
                    style={{
                        flex: 1,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: !!item.selected ? COLOR_PRIMARY : COLOR_GRAY_BG,
                        borderTopLeftRadius: isFirst ? DIMENSION_RADIUS_LARGE : 0,
                        borderBottomLeftRadius: isFirst ? DIMENSION_RADIUS_LARGE : 0,
                        borderTopRightRadius: isLast ? DIMENSION_RADIUS_LARGE : 0,
                        borderBottomRightRadius: isLast ? DIMENSION_RADIUS_LARGE : 0,
                    }}
                >
                    <Text style={{
                        color: !!item.selected ? 'white' : COLOR_TEXT_BLACK_1,
                        fontSize: DIMENSION_TEXT_HEADER,
                        fontWeight: !!item.selected ? 'bold' : 'normal'
                    }}>
                        {item.key}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _onPress = () => {
        this.props.onPress(this.props.item);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.item && this.props.item === undefined) return true;
        if (this.props.item === undefined) return false;
        if (nextProps.item.key !== this.props.item.key) return true;
        if (nextProps.item.selected !== this.props.item.selected) return true;
        return false;
    }
}

PriceItem.propTypes = {
    item: PropTypes.any,
    isFirst: PropTypes.any,
    isLast: PropTypes.any,
    onPress: PropTypes.any
}