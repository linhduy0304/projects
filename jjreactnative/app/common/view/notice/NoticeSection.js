import React from 'react';
import {View, StyleSheet, TouchableOpacity, Easing} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import Popover from "react-native-popover-view";

import {BasePureComponent} from "../../base/BasePureComponent";
import Text from '../text/JJText';
import JJIcon from '../icon/JJIcon';
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM
} from "../../../resources/dimens";
import {COLOR_BACKGROUND_TOOLTIP, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {AppConfig} from '../../config';

const TooltipLayout = {
    backgroundColor: COLOR_BACKGROUND_TOOLTIP,
    borderRadius: DIMENSION_RADIUS_MEDIUM,
    width: AppConfig.windowWidth * 0.76,
    padding: DIMENSION_PADDING_SMALL
};

export default class NoticeSection extends BasePureComponent {

    icon = null;

    constructor(props) {
        super(props);
        this.state = {
            tooltipVisible: false
        };

        if (!!props.icon) {
            if (props.icon.indexOf('.svg') > 10) {
                this.icon = (
                    <JJIcon
                        size={16}
                        uri={props.icon}/>
                )
            }
            else {
                this.icon = (
                    <FastImage
                        style={{ width: 38, height: 38 }}
                        source={{uri: props.icon}}
                        resizeMode={FastImage.resizeMode.contain}/>
                )
            }
        }
    }


    render() {

        return (
            <View style={[styles.container, this.props.style]}>

                {this.icon}

                <Text style={styles.textMessage}>
                    {this.props.message}
                </Text>

                {
                    !!this.props.tooltip &&
                    <TouchableOpacity
                        style={styles.buttonViewTooltip}
                        ref={'buttonToolTip'}
                        onPress={this._openTooltipPress}
                        activeOpacity={0.8}>
                        <JJIcon
                            name={'info_o'}
                            color={COLOR_TEXT_INACTIVE}
                            size={16}/>
                    </TouchableOpacity>
                }

                {
                    !!this.props.tooltip &&
                    <Popover
                        popoverStyle={TooltipLayout}
                        showBackground={false}
                        verticalOffset={-16}
                        isVisible={this.state.tooltipVisible}
                        fromView={this.refs.buttonToolTip}
                        placement={'bottom'}
                        animationConfig={{
                            duration: 100,
                            easing: Easing.ease,
                            useNativeDriver: true
                        }}
                        onClose={this._onCloseTooltip}>

                        <Text style={styles.textTooltip}>
                            {this.props.tooltip}
                        </Text>

                    </Popover>
                }

            </View>
        )
    }

    _openTooltipPress = () => {
        this.setState({
            tooltipVisible: true
        })
    }

    _onCloseTooltip = () => {
        this.setState({
            tooltipVisible: false
        })
    }
}

NoticeSection.propTypes = {
    icon: PropTypes.string,
    message: PropTypes.string,
    tooltip: PropTypes.string,
    style: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        backgroundColor: 'rgba(34, 195, 0, 0.10)',
        marginTop: DIMENSION_PADDING_LARGE
    },
    textMessage: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        flex: 1,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_MEDIUM
    },
    buttonViewTooltip: {
        padding: DIMENSION_PADDING_MEDIUM
    },
    textTooltip: {
        color: 'white'
    }
});