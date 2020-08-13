import React from 'react'
import PropTypes from 'prop-types'
import {BaseComponent} from "./BaseComponent";
import {View} from "react-native";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
} from "../../resources/dimens";
import JJIcon from "./JJIcon";
import {Text} from "native-base";

export default class DealItemChosenTagView extends BaseComponent {

    render() {

        if (!this.props.visible) return null;

        return (
            <View style={{
                flexDirection: 'row',
                paddingRight: DIMENSION_PADDING_SMALL,
                paddingLeft: DIMENSION_PADDING_SMALL,
                height: 24,
                backgroundColor: '#e73948E6',
                borderRadius: DIMENSION_RADIUS_MEDIUM,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: DIMENSION_PADDING_SMALL,
                right: DIMENSION_PADDING_SMALL
            }}>
                <JJIcon name={'star_o'} size={10} color={'white'} />
                {
                    !this.props.smallDeal &&
                    <Text style={{ color: 'white', marginLeft: 2, fontSize: 12 }}>JAMJA chọn</Text>
                }
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.visible !== this.props.visible ||
            nextProps.smallDeal !== this.props.smallDeal;
    }
}

DealItemChosenTagView.propTypes = {
    visible: PropTypes.any,
    smallDeal: PropTypes.any
}