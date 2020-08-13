import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight: 0
        };
    }

    onLayout = (e) => {
        this.props.refff.measure( (fx, fy, width, height, px, py) => {
            console.log(fx, fy, width, height, px, py)
          })
        
    }

    render() {
        return (
            <View
                style={{
                    borderWidth: 1,
                    borderColor: 'blue',
                    margin: 20,
                    flexDirection: 'row'
                }}
                onLayout={this.onLayout}
            >
                {this.props.show ? (
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: 'blue',
                            margin: 20,
                            backgroundColor: 'blue',
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50
                        }}
                    >
                        <Text>{this.props.item}</Text>
                    </View>
                ) : (
                    <View
                        style={{
                            
                            margin: 20,
                            paddingHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50
                        }}
                    />
                )}

                <View>
                    <Text style={{ marginVertical: 20, textAlign: 'center' }}>adfasdfsa</Text>
                </View>
            </View>
        );
    }
}

export default Item;
