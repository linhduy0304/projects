import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {BasePureComponent} from "../common/BasePureComponent";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../resources/dimens";
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE_DISABLE} from "../../resources/colors";

export default class ResendButton extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            time: 60
        }
    }


    render() {

        return (
            <TouchableOpacity
                style={{
                    padding: DIMENSION_PADDING_MEDIUM,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: DIMENSION_PADDING_MEDIUM
                }}
                activeOpacity={0.8}
                disabled={this.state.time > 0}
                onPress={this._onResendClicked}>

                <Text
                    style={{
                        color: this.state.time <= 0 ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE_DISABLE,
                        fontSize: DIMENSION_TEXT_CONTENT
                    }}>
                    {`Gửi lại ${this.state.time > 0 ? `(${this.state.time})` : ''}`}
                </Text>

            </TouchableOpacity>
        )
    }

    _onResendClicked = () => {
        this._startInterval();
        this.props.onPress();
    }

    _updateTime = () => {
        if (this.state.time <= 1) {
            clearInterval(this.intervalTask);
        }
        this.setState({
            time: this.state.time - 1
        });
    }

    _startInterval = () => {
        this.setState({
            time: 60
        }, () => this.intervalTask = setInterval(this._updateTime, 1000));
    }

    componentDidMount() {
        super.componentDidMount();
        if (!!this.props.active) this._startInterval();
    }

    componentWillUnmount() {
        clearInterval(this.intervalTask);
        super.componentWillUnmount();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.active && !!this.props.active) {
            this.setState({
                time: 60
            });
            clearInterval(this.intervalTask);
        }
    }
}

ResendButton.propTypes = {
    active: PropTypes.any,
    onPress: PropTypes.any
}