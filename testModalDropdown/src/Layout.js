import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ backgroundColor: 'red', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {React.cloneElement(<Text> Layout </Text>, { className: 'active' }, this.props.children)}
            </View>
        );
    }
}

export default Layout;
