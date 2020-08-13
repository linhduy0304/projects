import React from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from "./BaseComponent";
import {DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from "../../const";
import {View} from "react-native";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
} from "../../resources/dimens";
import JJIcon from "./JJIcon";

export default class DealItemExclusiveTagView extends BaseComponent {

    render() {

        const {deal_type} = this.props;

        if (deal_type !== DEAL_TYPE_EXCLUSIVE && deal_type !== DEAL_TYPE_LAST_MIN && deal_type !== DEAL_TYPE_MOVIE) return null;

        return (
            <View style={{
                height: 24,
                width: 24,
                backgroundColor: '#e73948E6',
                borderRadius: DIMENSION_RADIUS_MEDIUM,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: DIMENSION_PADDING_SMALL,
                left: DIMENSION_PADDING_SMALL
            }}>
                <JJIcon name={'exclusive__o'} size={16} color={'white'} />
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.deal_type !== this.props.deal_type;
    }
}

DealItemExclusiveTagView.propTypes = {
    deal_type: PropTypes.any
}