import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TestEmojiSelector from './TestEmojiSelector';
import TestList from './TestList';
import TestFs from './TestFs';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{flex: 1, marginTop: 100}}>
                {/* <TestList/> */}
                {/* <TestEmojiSelector/> */}
                <TestFs/>
            </View>
        );
    }
}

export default App;
