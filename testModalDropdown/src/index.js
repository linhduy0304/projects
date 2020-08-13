import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Layout from './Layout';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    aa = () => {
        console.log(this.props);
    };

    render() {
        console.log(this.props);

        return (
            <Layout>
                {this.aa()}
                <Text>ddddd</Text>
            </Layout>
        );
    }
}

export default App;
