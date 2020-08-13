import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { BaseComponent } from '../../common/base/BaseComponent';

export default class IconProgress extends BaseComponent {

    scale = new Animated.Value(1);

    componentDidMount = () => {
        super.componentDidMount();
        const animate1 = Animated.timing(this.scale, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        });
        const animate2 = Animated.timing(this.scale, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        });
        Animated.loop(Animated.sequence([animate1, animate2])).start();
    };

    render() {
        const { color } = this.props;
        const fade = this.scale.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [0.3, 1]
            }
        )
        return (
            <View
                style={[
                    styles.iconStyle,
                    {
                        borderColor: color
                    }
                ]}
            >
                <Animated.View
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: color,
                        transform: [{scale: fade}]
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: 18,
        height: 18,
        borderRadius: 9
    }
});

IconProgress.propTypes = {
    color: PropTypes.string
};
