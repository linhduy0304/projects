import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../base/BasePureComponent";
import {COLOR_PRIMARY} from "../../../resources/colors";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import JJIcon from '../icon/JJIcon';
import Text from '../text/JJText';

export default class ButtonFilled extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity
                style={[styles.container, {
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: this.props.borderRadius,
                    // borderColor: this.props.backgroundColor,
                    backgroundColor: this.props.backgroundColor
                }, this.props.style]}
                activeOpacity={0.8}
                disabled={!this.props.enable || !!this.props.isLoading}
                onPress={this.props.onPress}>

                {
                    !!this.props.icon &&
                    this.props.align === 'center' &&
                    this.props.iconPosition === 'left' &&
                    !this.props.isLoading &&
                    <JJIcon
                        style={{
                            padding: this.props.iconPadding
                        }}
                        name={this.props.icon}
                        color={this.props.textColor}
                        size={this.props.textSize}/>
                }

                {
                    !this.props.isLoading &&
                    <Text
                        style={{
                            fontSize: this.props.textSize,
                            color: this.props.textColor,
                            fontWeight: 'bold',
                            marginLeft: DIMENSION_PADDING_TINY,
                            marginRight: DIMENSION_PADDING_TINY
                        }}>
                        {this.props.title}
                    </Text>
                }

                {
                    !!this.props.icon &&
                    !this.props.isLoading &&
                    (
                        this.props.align === 'space-between' ||
                        (this.props.align === 'center' && this.props.iconPosition === 'right')
                    ) &&
                    <JJIcon
                        style={{
                            padding: this.props.align === 'space-between' ? undefined : this.props.iconPadding,
                            position: this.props.align === 'space-between' ? 'absolute' : undefined,
                            right: this.props.iconPosition === 'right' ? this.props.iconPadding : undefined,
                            left: this.props.iconPosition === 'left' ? this.props.iconPadding : undefined,
                        }}
                        name={this.props.icon}
                        color={this.props.textColor}
                        size={this.props.textSize}/>
                }

                {
                    !!this.props.isLoading &&
                    <ActivityIndicator animating={true} color={!!this.props.loadingColor ? this.props.loadingColor : COLOR_PRIMARY}/>
                }

            </TouchableOpacity>
        )
    }
}

ButtonFilled.defaultProps = {
    backgroundColor: COLOR_PRIMARY,
    textColor: 'white',
    enable: true,
    borderRadius: DIMENSION_RADIUS_MEDIUM,
    align: 'center',
    textSize: DIMENSION_TEXT_CONTENT,
    iconPadding: 0
};

ButtonFilled.propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.any,
    textColor: PropTypes.any,
    textSize: PropTypes.number,
    enable: PropTypes.bool,
    isLoading: PropTypes.bool,
    loadingColor: PropTypes.any,
    borderRadius: PropTypes.number, //corner radius button
    icon: PropTypes.string, //icon name
    iconPosition: PropTypes.oneOf(['left', 'right']),
    iconPadding: PropTypes.number, //icon padding
    align: PropTypes.oneOf(['center', 'space-between']),
    style: PropTypes.any,
    onPress: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: DIMENSION_BUTTON_MEDIUM
    }
});