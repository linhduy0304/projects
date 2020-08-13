import React from 'react'
import PropTypes from 'prop-types'
import {View} from "react-native";
import {Text} from 'native-base';
import StarRating from "react-native-star-rating";
import {COLOR_ORANGE_STAR, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import {BaseComponent} from "./BaseComponent";
import {DIMENSION_TEXT_SUB} from "../../resources/dimens";
import {StringUtil} from '../../utils/string-util';

export default class DealItemRateView extends BaseComponent {

    render() {

        if (!this.props.rate || this.props.rate <= 0) return null;

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <StarRating
                    disabled={true}
                    containerStyle={{ justifyContent: 'flex-start' }}
                    buttonStyle={{ paddingRight: 1 }}
                    maxStars={5}
                    starSize={12}
                    fullStarColor={COLOR_ORANGE_STAR}
                    emptyStarColor={COLOR_ORANGE_STAR}
                    rating={Number.parseInt(this.props.rate)}
                />
                {
                    !!this.props.count &&
                    this.props.count > 0 &&
                    <Text
                        style={{
                            color: COLOR_TEXT_INACTIVE,
                            fontSize: DIMENSION_TEXT_SUB,
                            paddingBottom: 2,
                            marginLeft: 2
                        }}>
                        ({StringUtil.numberFormat(this.props.count)})
                    </Text>
                }
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.rate !== this.props.rate;
    }
}

DealItemRateView.propTypes = {
    rate: PropTypes.any,
    count: PropTypes.any
}