import React from 'react';
import {  Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { BaseComponent } from '../../common/base/BaseComponent';

export default class StatusInProgress extends BaseComponent {

    opacity = new Animated.Value(1);

    componentDidMount = () => {
        super.componentDidMount();
        const animate1 = Animated.timing(this.opacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        });
        const animate2 = Animated.timing(this.opacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        });
        Animated.loop(Animated.sequence([animate1, animate2])).start();
    };

    render() {
        const { title, color } = this.props;
        const opacity = this.opacity.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [0.5, 1]
            }
        )
        return (
            <Animated.Text
                style={{
                    color: color,
                    fontWeight: 'bold',
                    marginLeft: 13,
                    opacity: opacity
                }}
            >
                {title}
            </Animated.Text>
        );
    }
}

StatusInProgress.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string
};
