import React from 'react'
import {View} from 'react-native'
import {Text} from 'native-base'
import PropTypes from 'prop-types'
import {BasePureComponent} from "../../../common/base/BasePureComponent";
import {COLOR_PRIMARY} from "../../../resources/colors";
import {DIMENSION_PADDING_SMALL} from "../../../resources/dimens";

export default class BadgeNumberView extends BasePureComponent {

    render() {

        if (this.props.count === 0) return null;

        return (
            <View
                style={{
                    position: 'absolute',
                    top: DIMENSION_PADDING_SMALL,
                    left: DIMENSION_PADDING_SMALL,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLOR_PRIMARY,
                    borderRadius: 6
                }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 8,
                        paddingTop: 1,
                        paddingBottom: 1,
                        paddingLeft: 4,
                        paddingRight: 4
                    }}>
                    {this.props.count || ''}
                </Text>
            </View>
        )
    }
}

BadgeNumberView.propTypes = {
    count: PropTypes.any
}
