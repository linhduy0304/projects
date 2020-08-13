import React from 'react'
import PropTypes from 'prop-types'
import {View} from "react-native";

import {BaseComponent} from "../common/BaseComponent";
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import PriceItem from './PriceItem'

export default class PriceSection extends BaseComponent {


    render() {

        return (
            <View style={{
                flexDirection: 'row',
                paddingLeft: DIMENSION_PADDING_MEDIUM,
                paddingRight: DIMENSION_PADDING_MEDIUM,
                paddingBottom: DIMENSION_PADDING_MEDIUM
            }}>
                {
                    this.props.filter.tags
                        .sort((a, b) => a.key.length - b.key.length)
                        .map((item, index) => <PriceItem key={`price_filter_item_${index}_${item.key}`}
                                                         onPress={this.props.onPress}
                                                         item={item}
                                                         isFirst={index === 0}
                                                         isLast={index >= (this.props.filter.tags.length - 1)}/>)
                }
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.filter && this.props.filter === undefined) return true;
        if (this.props.filter === undefined) return false;
        if (nextProps.filter.tags.length !== this.props.filter.tags.length) return true;
        if (nextProps.filter.selectedCount !== this.props.filter.selectedCount) return true;
        return false;
    }
}

PriceSection.propTypes = {
    filter: PropTypes.any,
    onPress: PropTypes.any
}