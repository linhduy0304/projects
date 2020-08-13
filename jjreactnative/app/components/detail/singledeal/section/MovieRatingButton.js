import React from 'react';
import {Easing, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from 'native-base';

import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_LARGE,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../../resources/dimens";
import Popover from "react-native-popover-view";
import {BasePureComponent} from "../../../common/BasePureComponent";

export default class MovieRatingButton extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showPopover: false
        }
    }

    render() {

        if (!this.props.rating) return null;

        return (
            <View
                style={{
                    marginLeft: DIMENSION_PADDING_SMALL
                }}>
                <TouchableOpacity
                    onPress={this._onButtonPressed}
                    activeOpacity={0.8}
                    style={{
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingLeft: 8,
                        paddingRight: 8,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        borderWidth: 1,
                        borderColor: this.props.rating.toLowerCase() === 'p' ? '#4AC731' : '#E73849'
                    }}>
                    <Text
                        ref={this._onButtonRef}
                        style={{color: this.props.rating.toLowerCase() === 'p' ? '#4AC731' : '#E73849', fontSize: 8}}>
                        {this.props.rating}
                    </Text>
                </TouchableOpacity>

                <Popover
                    popoverStyle={{
                        backgroundColor: '#3399ff',
                        borderRadius: DIMENSION_RADIUS_LARGE,
                    }}
                    isVisible={this.state.showPopover}
                    fromView={this.buttonRef}
                    onClose={this._onClosePopover}
                    showInModal={true}
                    showBackground={false}
                    animationConfig={{ duration: 100, easing: Easing.ease }}>

                    <Text
                        style={{
                            color: 'white',
                            fontSize: DIMENSION_TEXT_CONTENT,
                            padding: DIMENSION_PADDING_MEDIUM
                        }}>
                        {this._getMessage()}
                    </Text>

                </Popover>
            </View>
        )
    }

    _getMessage = () => {
        switch (this.props.rating.toLowerCase()) {
            case 'p':
                return 'Phim phổ biển cho mọi lứa tuổi';
            case 'c13':
                return 'Phim dành cho khán giả từ 13 tuổi trở lên';
            case 'c16':
                return 'Phim dành cho khán giả từ 16 tuổi trở lên';
            case 'c18':
                return 'Phim dành cho khán giả từ 18 tuổi trở lên';
            default:
                return '';
        }
    }

    _onButtonRef = (ref) => this.buttonRef = ref;

    _onButtonPressed = () => {
        this.setState({
            showPopover: true
        })
    }

    _onClosePopover = () => {
        this.setState({
            showPopover: false
        })
    }
}

MovieRatingButton.propTypes = {
    rating: PropTypes.any
}