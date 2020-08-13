import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Picker,
    Dimensions,
    Style
} from 'react-native';

var PickerItemIOS = Picker.Item;
// import I18n from '../I18n/I18n.js';

var SCREEN_WIDTH = Dimensions.get('window').width;

class PickerItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: this.props.options,
            color: this.props.color || '#007AFF',
            modalVisible: this.props.modalVisible ? this.props.modalVisible : false,
            selectedOption: (this.props.selectedOption != '') ? this.props.selectedOption : this.props.options[0].value,
            oldSelectedOption: '',
            isChange: this.props.isChange ? this.props.isChange: false,
            txtConfirm: this.props.txtConfirm ? this.props.txtConfirm: 'Đồng ý',
            txtCancel: this.props.txtCancel ? this.props.txtCancel: 'Bỏ qua',
            boxDisplayStyles: this.props.boxDisplayStyles ? this.props.boxDisplayStyles : {},
            textDisplayStyle: this.props.textDisplayStyle ? this.props.textDisplayStyle : {},

        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps){
            this.setState({
                options: nextProps.options,
                modalVisible: nextProps.modalVisible
            });
        }

    }

    onPressPicker() {
        var oldSelected = this.state.selectedOption;
        this.setState({ modalVisible: true, oldSelectedOption: oldSelected});
    }

    confirm() {
        if(this.props.onSubmit) {
            this.props.onSubmit(this.state.selectedOption);
        }
        var _this = this;
        setTimeout(function(){
            _this.setState({modalVisible: false});
        }, 100);
        
    }

    cancel() {
        if (!this.state.isChange) {
            var oldSelected = this.state.oldSelectedOption;
            this.props.onCancel();
            this.setState({modalVisible: false, selectedOption: oldSelected});
        } else {
            this.props.onCancel();
            this.setState({modalVisible: false});
        }
    }

    onChange(value) {
        if (this.state.isChange) {
            if(this.props.onSubmit) {
                this.props.onSubmit(value);
            }
            this.setState({selectedOption: value, modalVisible: false});
        } else {
            this.setState({selectedOption: value});
        }
    }

    displaySelected() {
        var selectedOption = this.state.selectedOption;
        var item = new Array();
        item = this.state.options.filter(function(option){
          return option.value == selectedOption;
        })
        return item.length > 0 ? item[0].label : '';
    }



    render() {
        return (
            // <TouchableOpacity
            //     style={[{ height: 40, borderWidth: 1, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center' }, this.state.boxDisplayStyles ]}
            //     underlayColor={'transparent'}
            //     onPress={() => this.onPressPicker()}
            //   >
                <Modal
                    //animated={false}
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={styles.basicContainer}>
                        <View style={styles.modalContainer}>
                            <View style={styles.buttonView}>
                                <TouchableOpacity onPress={() => this.cancel() }>
                                    <Text style={{color:this.state.color}}>{ this.state.txtCancel }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.confirm() }>
                                    <Text style={{color:this.state.color}}>{ this.state.txtConfirm }</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mainBox}>
                                {/*Model body*/}
                                <Picker
                                    ref={'picker'}
                                    style={styles.bottomPicker}
                                    selectedValue={this.state.selectedOption}
                                    onValueChange={(value) => this.onChange(value) }
                                    >
                                    {this.state.options.map((option, i) => {
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
            // </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    basicContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(78, 78, 78, 0.68)'
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
        padding: 15,
        borderTopWidth:0.5,
        borderTopColor:'lightgrey',
        justifyContent: 'space-between',
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    bottomPicker : {
        width:SCREEN_WIDTH,
    },
    mainBox: {
    }
});
export default PickerItem;


