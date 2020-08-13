import React from 'react'
import PropTypes from 'prop-types'
import {Text, Button} from 'native-base';
import {View, StyleSheet, Modal} from 'react-native';
import {strings} from "../../../../locates/i18n";
import {COLOR_PRIMARY} from "../../../resources/colors";
import CIcon from '../CIcon';

type Props = {
    type: PropTypes.string,
    title?: PropTypes.string,
    titleIcon?: PropTypes.string,
    visible: PropTypes.bool,
    message: PropTypes.string,
    titleButton_1?: PropTypes.string,
    onPressButton_1?: PropTypes.func,
    colorTextButton_1?: PropTypes.string,
    titleButton_2?: PropTypes.string,
    colorTextButton_2?: PropTypes.string,
    onPressButton_2?: PropTypes.func,
    onPressClose?: PropTypes.func
}

export default class AlertConfirm extends React.PureComponent<Props> {

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
        let {type, title, message, titleButton_1, titleButton_2} = this.props;
        let titleStr = null;
        if (title !== undefined || title !== null) {
            titleStr = title;
        } else if (type === 'error') {
            titleStr = strings('info.label_error')
        } else if (type === 'success') {
            titleStr = strings('info.label_success');
        } else {
            titleStr = strings('info.label_warning');
        }

        return (
            <Modal visible={this.state.visible}
                   transparent={true}
                   animationType={'fade'}
                   onRequestClose={() => this._onPressClose()}>
                <View style={styles.alertModal}>
                    <View style={styles.alertModalContent}>
                        <Text style={[styles.title, {color: type === 'error' ? COLOR_PRIMARY:'#353535'}]}>
                            {this.props.titleIcon && <CIcon name={this.props.titleIcon} family={'FontAwesome'} style={{color: type === 'error' ? COLOR_PRIMARY:'#353535', fontSize: 14}}/>}
                            {titleStr}
                        </Text>
                        <Text style={{width: '100%', padding: 10, marginTop: 10, marginBottom: 10, fontSize: 14, color: '#454545'}}>{message}</Text>
                        <View style={{width: '100%', padding: 10, flexDirection: 'row'}}>
                            {titleButton_1 !== undefined && titleButton_1 !== null &&
                                <Button onPress={() => this._onPressButton1()} transparent style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={{color: this.props.colorTextButton_1 === undefined || this.props.colorTextButton_1 === null ? '#4f8ff7':this.props.colorTextButton_1, fontWeight: 'bold', textAlign: 'center'}}>
                                        {titleButton_1}
                                        </Text>
                                </Button>
                            }
                            {titleButton_2 !== undefined && titleButton_2 !== null &&
                                <Button onPress={() => this._onPressButton2()} transparent style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={{color: this.props.colorTextButton_2 === undefined || this.props.colorTextButton_2 === null ? COLOR_PRIMARY:this.props.colorTextButton_2, fontWeight: 'bold', textAlign: 'center'}}>{titleButton_2}</Text>
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
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
});