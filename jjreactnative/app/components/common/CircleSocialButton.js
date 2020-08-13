import React, { Component } from 'react';
import color from "color";
import {StyleSheet, View, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import { Text } from 'native-base';
import {COLOR_TEXT_INACTIVE} from "../../resources/colors";
import {BasePureComponent} from "./BasePureComponent";

export default class CircleSocialButton extends BasePureComponent {

    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);

        this.state = {
            disableUndo: props.disableUndo,
            isActive: props.isActive,
            normalColor: props.normalColor,
            activeColor: props.activeColor,
            darkerColor: color(props.activeColor).darken(0.3).hex(),
            label: props.label,
            counter: props.counter ? props.counter : 0,
            icon: props.icon,
            activeIcon: props.activeIcon,
        }
    }

    //Spring animation
    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
    }

    handlePressIn() {
        Animated.spring(this.animatedValue, {
            toValue: .9,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    handlePressOut() {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 1.1,
            tension: 100,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    handlePress() {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }


    render() {

        return (
            <TouchableWithoutFeedback
                onPress={this.handlePress}
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
            >
                <View style={styles.wrapButton}>

                    {/* Animation View */}
                    <Animated.View style={{
                        transform: [{ scale: this.animatedValue }]
                    }}>
                        {/* Circle button */}
                        <View style={
                            [styles.roundButton,
                            {
                                borderColor: this.state.isActive ? this.state.activeColor : this.state.normalColor,
                                backgroundColor: this.state.isActive ? this.state.activeColor : 'transparent'
                            }]}>
                            {/* Render Icon */}
                            {this.state.isActive ? this.state.activeIcon : this.state.icon}
                        </View>

                        {/* Counter */}
                        <View style={
                            [styles.number,
                            {
                                backgroundColor: this.state.isActive ? this.state.activeColor : '#ededed',
                                borderColor: this.state.isActive ? this.state.darkerColor : this.state.normalColor
                            }]}>
                            <Text style={{ fontSize: 12, color: this.state.isActive ? 'white' : this.state.normalColor }}>{this.state.counter}</Text>
                        </View>

                    </Animated.View>

                    {/* Label button */}
                    <Text style={styles.label}>{this.state.label}</Text>

                </View>

            </TouchableWithoutFeedback>
        )
    }

    //Update state when Re-Render CircleSocialButton with new isActive status
    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            isActive: nextProps.isActive,
            counter: nextProps.counter,
        });
    }
}

const styles = StyleSheet.create({
    wrapButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundButton: {
        height: 48,
        width: 48,
        marginBottom: 9,
        borderRadius: 24,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        paddingTop: 2,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 4,
        borderWidth: 1,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    label: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 4
    }
});