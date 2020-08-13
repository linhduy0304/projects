import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Keyboard} from 'react-native';

import EmojiSelector, { Categories } from 'react-native-emoji-selector';

class TestEmojiSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '1F625',
            showEmoji: false
        };
    }

    charFromUtf16 = utf16 => {
        console.log(String.fromCodePoint(...utf16.split('-').map(u => '0x' + u)));
        return String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
    };

    _openEmoji = () => {
        Keyboard.dismiss()
        this.setState({
            showEmoji: true
        });
    };

    _onFocus = () => {
        this.setState({ showEmoji: false });
    };

    _pickEmoji = (emoji) => {
        let text = this.state.text;
        text = text+emoji;
        this.setState({text})
    }

    _onChange = (text) => {this.setState({text})}

    charFromEmojiObject = (utf16) => {
        return  String.fromCodePoint(...utf16.split('-').map(u => '0x' + u))
    }
   
    render() {
        const { showEmoji, text } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
                { this.charFromEmojiObject('1F618') }
            </Text>
                <View style={{flex: 1,}}/>
                    <View style={{  backgroundColor: '#999',height: 50, flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput onChangeText={this._onChange} value={text} style={{ flex: 1, backgroundColor: '#fff' }} onFocus={this._onFocus} />
                        <Text onPress={this._openEmoji}>Hinh</Text>
                    </View>

                {!!showEmoji && <EmojiSelector category={Categories.people} onEmojiSelected={this._pickEmoji} />}
                
            </View>
        );
    }
}

export default TestEmojiSelector;
