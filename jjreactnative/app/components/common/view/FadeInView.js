import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types'
import {BasePureComponent} from "../BasePureComponent";

export default class FadeInView extends BasePureComponent {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={[this.props.style, {opacity: fadeAnim}]}>
                {this.props.children}
            </Animated.View>
        );
    }

    componentDidMount() {
        super.componentDidMount();

        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: this.props.duration || 1000,
                useNativeDriver: true
            }
        ).start();                        // Starts the animation
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }
}

FadeInView.propTypes = {
    style: PropTypes.any,
    duration: PropTypes.any,
    children: PropTypes.any
}