
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
import {
    LunarDatePickers
} from './components';

var PickerItemIOS = Picker.Item;

var SCREEN_WIDTH = Dimensions.get('window').width;

class FMPicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            color: this.props.color || '#007AFF',
            modalVisible: this.props.modalVisible ? this.props.modalVisible : false,
            selectedOption: (this.props.itemSelected != '') ? this.props.itemSelected : this.getLunar(getLunarDate(new Date())),
            lunar: '',
        }
    }

    getLunar(today) {
        var day = today.day.length === 1 ? ('0'+today.day) : today.day;
        var month = today.month < 10 ? ('0'+today.month.toString()) : today.month;
        return  day+' - '+month+ ' '+today.year
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
                                    this.props.onCancel();
                                    this.setState({modalVisible: false});
                                }}>
                                <Text style={{color:this.state.color}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                    if(this.props.onSubmit) this.props.onSubmit(this.state.selectedOption, this.state.lunar);
                                    this.setState({modalVisible: false});
                                }}>
                                <Text style={{color:this.state.color}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        {/*Model body*/}
                        <LunarDatePickers initialDate={new Date()} selectedOption={this.state.selectedOption} onChangeDate={(lunerValue, lunar) => this.setState({selectedOption: lunerValue, lunar: lunar})} />
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
