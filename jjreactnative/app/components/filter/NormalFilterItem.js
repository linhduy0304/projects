import React from 'react';
import { TouchableOpacity} from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types'
import {
    COLOR_PRIMARY,
    COLOR_TEXT_BLACK_1
} from '../../resources/colors';
import JJIcon from '../common/JJIcon';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_TEXT_HEADER,
} from "../../resources/dimens";
import {BaseComponent} from "../common/BaseComponent";
import {StringUtil} from '../../utils/string-util'

export default class NormalFilterItem extends BaseComponent {

    render() {
        return (
            <TouchableOpacity
                onPress={this._onItemClicked}
                style={{
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingRight: DIMENSION_PADDING_MEDIUM,
                    paddingBottom: DIMENSION_PADDING_MEDIUM,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <JJIcon
                    style={{ marginRight: DIMENSION_PADDING_MEDIUM }}
                    name={!!this.props.item.selected ? 'check_squareo' : 'square_o'}
                    size={18}
                    color={!!this.props.item.selected ? COLOR_PRIMARY : COLOR_TEXT_BLACK_1} />

                <Text style={{ color: !!this.props.item.selected ? COLOR_PRIMARY : COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER }}>
                    {this._capitalize(this.props.item.key)}
                </Text>
            </TouchableOpacity>
        )
    }

    _capitalize = (str) => {
        if (StringUtil.isEmpty(str) || str.length < 1) return str;

        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    _onItemClicked = () => {
        if (!!this.props.onItemSelected) this.props.onItemSelected(this.props.item)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.item) return false;
        if (!!nextProps.item && !this.props.item) return true;
        if (!this.props.item) return false;
        if (nextProps.item.key !== this.props.item.key) return true;
        if (nextProps.item.selected !== this.props.item.selected) return true;
        return false;
    }
}

NormalFilterItem.propTypes = {
    item: PropTypes.any,
    onItemSelected: PropTypes.any
}