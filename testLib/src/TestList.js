import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class TestList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const list = ['le li', 'ldd', 'do ', 'le ky hoi', 'adfa', 'le linh duy', 'ldd', 'do thi thuy', 'le ky hoi', 'adfa',]
        return (
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {
                    list.map((item, index) => <View key={index} style={{paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 15, borderWidth: 1, borderColor: 'red', marginTop: 20}}><Text>{item}</Text></View>)
                }
            </View>
        );
    }
}

export default TestList;
