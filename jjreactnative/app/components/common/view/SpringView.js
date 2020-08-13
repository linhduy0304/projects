import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types'
import {BasePureComponent} from "../BasePureComponent";

export default class SpringView extends BasePureComponent {
    springAnim = new Animated.Value(0.9);  // Initial value for opacity: 0

    render() {
        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    transform: [{scale: this.springAnim}]
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }

    componentDidMount() {
        super.componentDidMount();

        Animated.spring(                  // Animate over time
            this.springAnim,            // The animated value to drive
            {
                toValue: 1,
                friction: 4,
                useNativeDriver: true
            }
        ).start();                        // Starts the animation
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }
}

SpringView.propTypes = {
    style: PropTypes.any,
    duration: PropTypes.any,
    children: PropTypes.any
}