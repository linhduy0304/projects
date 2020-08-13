import React from 'react'
import PropTypes from 'prop-types'
import {Text, Button} from 'native-base';
import {View, StyleSheet, Modal} from 'react-native';
import {strings} from "../../../../locates/i18n";
import {COLOR_PRIMARY} from "../../../resources/colors";

type Props = {
    type: PropTypes.number,
    visible: PropTypes.bool,
    message: PropTypes.string,
    titleButton_1?: PropTypes.string,
    onPressButton_1?: PropTypes.func,
    titleButton_2?: PropTypes.string,
    onPressButton_2?: PropTypes.func,
    onPressClose?: PropTypes.func
}

export default class AlertModal extends React.PureComponent<Props> {

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

    render() {
        let {type, message, titleButton_1, titleButton_2} = this.props;

        let title = strings('info.label_warning');
        if (type === 'error') {
            title = strings('info.label_error')
        } else if (type === 'success') {
            title = strings('info.label_success');
        }

        return (
            <Modal visible={this.state.visible}
                   transparent={true}
                   animationType={'fade'}
                   onRequestClose={() => this._onPressClose()}>
                <View style={styles.alertModal}>
                    <View style={styles.alertModalContent}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={{width: '100%', padding: 10, marginTop: 10, marginBottom: 10}}>{message}</Text>
                        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            {titleButton_1 !== undefined && titleButton_1 !== null &&
                                <Button onPress={() => this._onPressButton1()} transparent>
                                    <Text style={{color: COLOR_PRIMARY, fontWeight: 'bold'}}>{titleButton_1}</Text>
                                </Button>
                            }
                            {titleButton_2 !== undefined && titleButton_2 !== null &&
                                <Button onPress={() => this._onPressButton2()} transparent>
                                    <Text style={{color: COLOR_PRIMARY, fontWeight: 'bold'}}>{titleButton_2}</Text>
                                </Button>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    _onPressButton1 = () => {
        let {onPressButton_1} = this.props;
        if (onPressButton_1 !== undefined && onPressButton_1 !== null) {
            onPressButton_1();
        }
        this._onPressClose();
    }

    _onPressButton2 = () => {
        let {onPressButton_2} = this.props;
        if (onPressButton_2 !== undefined && onPressButton_2 !== null) {
            onPressButton_2();
        }
        this._onPressClose();
    }

    _onPressClose = () => {
        this.setState({visible: false});
        if (this.props.onPressClose !== undefined && this.props.onPressClose !== null) this.props.onPressClose();
    }
}

const styles = StyleSheet.create({
    alertModal: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        padding: 20
    },
    alertModalContent: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        borderColor: '#ffffff'
    },
    title: {
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 0.2,
        borderColor: '#ededed',
        fontSize: 16,
        fontWeight: 'bold'
    }
});