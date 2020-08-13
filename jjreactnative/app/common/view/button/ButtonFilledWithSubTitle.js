import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../base/BasePureComponent";
import {COLOR_PRIMARY} from "../../../resources/colors";
import {
    DIMENSION_RADIUS_MEDIUM
} from "../../../resources/dimens";
import {styles} from './styles';

export default class ButtonFilledWithSubTitle extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity
                style={[styles.buttonFillerWithSubTitleContainer, {
                    alignItems: 'center',
                    justifyContent: !!this.props.subTitle ? 'space-between' : 'center',
                    borderRadius: this.props.borderRadius,
                    backgroundColor: this.props.backgroundColor
                }, this.props.style]}
                activeOpacity={0.8}
                disabled={!this.props.enable}
                onPress={this.props.onPress}>

                <Text style={{color: this.props.textColor, fontSize: 16, fontWeight: 'bold'}}>
                    {this.props.title}
                </Text>

                {
                    !!this.props.subTitle &&
                    <Text style={{color: this.props.textColor}}>
                        {this.props.subTitle}
                    </Text>
                }

            </TouchableOpacity>
        )
    }
}

ButtonFilledWithSubTitle.defaultProps = {
    backgroundColor: COLOR_PRIMARY,
    textColor: 'white',
    enable: true,
    borderRadius: DIMENSION_RADIUS_MEDIUM
};

ButtonFilledWithSubTitle.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    backgroundColor: PropTypes.any,
    textColor: PropTypes.any,
    enable: PropTypes.bool,
    borderRadius: PropTypes.number, //corner radius button
    style: PropTypes.any,
    onPress: PropTypes.func,
};