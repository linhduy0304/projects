
'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Picker,
    Dimensions
} from 'react-native';

var PickerItemIOS = Picker.Item;

var SCREEN_WIDTH = Dimensions.get('window').width;

class FMPicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: this.props.options,
            labels: this.props.labels || this.props.options,
            color: this.props.color || '#007AFF',
            modalVisible: this.props.modalVisible,
            selectedOption: (this.props.itemSelected != '') ? this.props.itemSelected : this.props.options[0].label
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.show !== nextProps.show){
            this.setState({modalVisible: true});
        }
        if(this.props.itemSelected !== nextProps.itemSelected){
            this.setState({
                selectedOption: nextProps.itemSelected
            });
        }
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}>
                <View style={styles.basicContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={() => {
                                    this.setState({modalVisible: false});
                                }}>
                                <Text style={{color:this.state.color}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                    if(this.props.onSubmit) this.props.onSubmit(this.state.selectedOption);
                                    this.setState({modalVisible: false});
                                }}>
                                <Text style={{color:this.state.color}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainBox}>
                            {/*Model body*/}
                            <Picker
                                ref={'picker'}
                                style={styles.bottomPicker}
                                selectedValue={this.state.selectedOption}
                                onValueChange={(option) => this.setState({selectedOption: option})}
                                >
                                {this.state.options.map((option, i) => {
                                    var label = this.state.labels[i] || option;
                                    return (
                                        <PickerItemIOS
                                            key={i}
                                            value={option.value}
                                            label={option.label}
                                            />
                                    )
                                })}
                            </Picker>
                        </View>

                    </View>
                </View>
            </Modal>
        );
    }
}

var styles = StyleSheet.create({
    basicContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer:{
        width:SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        padding:0,
        backgroundColor: '#F5FCFF',
    },
    buttonView:{
        width:SCREEN_WIDTH,
        padding: 8,
        borderTopWidth:0.5,
        borderTopColor:'lightgrey',
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    bottomPicker : {
        width:SCREEN_WIDTH,
    },
    mainBox: {
    }
});

module.exports = FMPicker;
