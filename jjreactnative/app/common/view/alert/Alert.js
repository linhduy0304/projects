import React from 'react';
import {View, Platform} from 'react-native';

import FadeInView from '../FadeInView';
import {styles} from './styles';
import Text from '../text/JJText';
import AlertButton from './AlertButton';
import {BasePureComponent} from "../../base/BasePureComponent";
import {ObjectUtil} from '../../../utils/object-utils';

export default class Alert extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            title: 'THÔNG BÁO',
            message: undefined,
            buttons: undefined
        }
    }


    render() {

        if (!this.state.message) return null;

        return (
            <FadeInView style={styles.alertContainer} duration={300}>

                <View style={Platform.select({ios: styles.alertContentLayoutIOS, android: styles.alertContentLayoutAndroid})}>
                    <Text style={Platform.select({ios: styles.alertTitleIOS, android: styles.alertTitleAndroid})}>
                        {ObjectUtil.getValue(this.state, 'THÔNG BÁO', ['title'])}
                    </Text>
                    <Text style={Platform.select({ios: styles.alertMessageIOS, android: styles.alertMessageAndroid})}>
                        {this.state.message}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        {
                            !!this.state.buttons &&
                            this.state.buttons.length > 0 &&
                            !!this.state.buttons.map &&
                            this.state.buttons.map((button, index) => {
                                return (
                                    <AlertButton
                                        key={`button_alert_${index}`}
                                        title={button.title}
                                        color={button.color}
                                        onPress={button.onPress}
                                        onClose={this._onClose}
                                        isHighlight={button.isHighlight}
                                        isLastButton={index >= this.state.buttons.length - 1}/>
                                )
                            })
                        }
                    </View>
                </View>

            </FadeInView>
        )
    }

    show(title, message, buttons) {
        if (!this.mounted) return;
        console.debug('Alert.show', title, message, buttons);
        this.setState({
            title,
            message,
            buttons
        })
    }

    cancel() {
        if (!this.mounted) return;
        console.debug('Alert.cancel', this.state);
        this.setState({
            title: undefined,
            message: undefined,
            buttons: undefined
        })
    }

    _onClose = callback => {
        if (!this.mounted) return;
        this.setState({
            title: undefined,
            message: undefined,
            buttons: undefined
        }, callback);
    }

    componentDidMount() {
        super.componentDidMount();
    }
}

