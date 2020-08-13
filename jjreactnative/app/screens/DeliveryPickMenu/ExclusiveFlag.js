import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {BasePureComponent} from "../../common/base/BasePureComponent";
import JJIcon from '../../common/view/icon/JJIcon';
import {COLOR_PRIMARY} from "../../resources/colors";
import {DIMENSION_RADIUS_MEDIUM} from "../../resources/dimens";

export default class ExclusiveFlag extends BasePureComponent {

    render() {
        return (
            <View style={[{
                backgroundColor: COLOR_PRIMARY,
                borderBottomRightRadius: this.props.size === 'small' ? 2 : DIMENSION_RADIUS_MEDIUM,
                borderBottomLeftRadius: this.props.size === 'small' ? 2 : DIMENSION_RADIUS_MEDIUM,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 2,
                paddingRight: 2,
            }, this.props.style]}
            >
                <JJIcon
                    name={'exclusive__o'}
                    size={this.props.size === 'small' ? 10 : 14}
                    color={'white'}/>
            </View>
        )
    }
}

ExclusiveFlag.propTypes = {
    size: PropTypes.oneOf(['small', 'medium']),
}