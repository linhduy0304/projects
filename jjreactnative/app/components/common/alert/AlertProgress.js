import React from 'react'
import PropTypes from 'prop-types'
import {Text, Button} from 'native-base';
import {View, Modal, ActivityIndicator} from 'react-native';

type Props = {
    visible: PropTypes.bool,
    message: PropTypes.string,
    onPressClose?: PropTypes.func
}

export default class AlertProgress extends React.PureComponent<Props> {

    constructor() {
        super();
        this.state = {visible: false};
    }

    componentWillMount() {
        this.setState({visible: this.props.visible});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({visible: nextProps.visible})
    }

    componentWillUnmount() {
        this.setState({visible: false})
        if (this.props.onPressClose) this.props.onPressClose();
    }

    render() {
        let {message} = this.props;

        return (
            <Modal visible={this.state.visible}
                   transparent={true}
                   animationType={'fade'}
                   onRequestClose={() => this._onPressClose()}>
                <View style={{flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    justifyContent: 'center',
                    padding: 20}}>
                    <View style={{padding: 20, flexDirection: 'row', backgroundColor: '#ffffff', alignItems: 'center'}}>
                        <ActivityIndicator size={'large'} style={{padding: 10}}/>
                        <Text style={{fontSize: 12}}>{message}</Text>
                    </View>
                </View>

            </Modal>
        )
    }

    _onPressClose = () => {
        this.setState({visible: false});
        if (this.props.onPressClose !== undefined && this.props.onPressClose !== null) this.props.onPressClose();
    }
}