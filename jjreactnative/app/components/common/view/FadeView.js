import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types'
import {BasePureComponent} from "../BasePureComponent";

export default class FadeView extends BasePureComponent {

    render() {
        const {style, children} = this.props;

        const containerStyle = {
            opacity: this._visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [
                {
                    scale: this._visibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.1, 1],
                    }),
                },
            ],
        };

        const combinedStyle = [containerStyle, style];
        return (
            <Animated.View style={combinedStyle}>
                {children}
            </Animated.View>
        );
    }

    componentWillMount() {
        this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible === this.props.visible) return;
        Animated.timing(this._visibility).stop();
        Animated.timing(this._visibility, {
            toValue: nextProps.visible ? 1 : 0,
            duration: nextProps.visible ? 50 : 300,
        }).start();
    }
}

FadeView.propTypes = {
    style: PropTypes.any,
    visible: PropTypes.any,
    children: PropTypes.any,
}