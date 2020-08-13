import React from 'react';
import {View, Button, Text, Alert} from 'react-native';

export default class TestModalDialog extends React.Component {

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    justifyContent: 'flex-end'
                }}>

                <View
                    style={{
                        width: '100%',
                        height: '50%',
                        backgroundColor: 'white'
                    }}>

                    <Text>
                        testmodal
                    </Text>
                    <Button
                        style={{
                            margin: 24
                        }}
                        title={'Open Alert'}
                        onPress={this._onOpenAlertPressed}/>
                </View>

            </View>
        )
    }

    _onOpenAlertPressed = () => {
        Alert.alert(
            'This is title',
            'THis is message alert'
        )
    }

}