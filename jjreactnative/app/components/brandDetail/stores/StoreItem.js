import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import {BaseComponent} from "../../common/BaseComponent";
import JJIcon from "../../common/JJIcon";
import Communications from "react-native-communications";
import {COLOR_GRAY_BG, COLOR_GRAY_BG_2, COLOR_PRIMARY} from "../../../resources/colors";
import {StringUtil} from "../../../utils/string-util";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";

export default class StoreItem extends BaseComponent {

    render() {
        return ( 
            <View style={{flex: 1, backgroundColor: !!this.props.selected ? COLOR_GRAY_BG : 'white'}}>
                <TouchableOpacity onPress={this._onItemPressed}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                        <View style={{flex: 1}}>
                            <Text style={{ paddingRight: DIMENSION_PADDING_SMALL, fontSize: DIMENSION_TEXT_CONTENT, color: '#666666' }}>
                                {this.props.store.address}
                            </Text>
                        </View>
                       {this._renderDistance()}
                    </View>
                </TouchableOpacity>
                {this.props.selected && this.renderActionIfNeed()}
            </View>
        )
    }

    _renderDistance = () =>{
        if(this.props.store.distance >= 0 ){
            return  <View style={{flex: 0, flexDirection: 'row', minWidth: 90, maxWidth: '30%', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <JJIcon name={'map_pin_o'}
                                    color={'#666666'}
                                    size={12}/>
                            <Text style={{ fontSize: DIMENSION_TEXT_CONTENT, color: '#666666', padding: 4 }}>
                                {this.props.store.distance} km
                            </Text>
                            <JJIcon name={'chevron_right_o'}
                                    color={'#666666'}
                                    size={10}/>
                    </View>
        }
    }

    renderActionIfNeed() {
        const store = this.props.store;
        return (
            <View style={{flex: 1, backgroundColor: COLOR_GRAY_BG_2}}>
                <View style={{ flexDirection: 'row' }}>
                    {
                        !StringUtil.isBlank(store.phone_number) &&
                        <TouchableOpacity
                            onPress={this._onPhoneCallPressed}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: DIMENSION_BUTTON_MEDIUM,
                                flex: 1
                            }}>
                            <JJIcon name={'phone_forwarded_o'}
                                    color={COLOR_PRIMARY}
                                    style={{
                                        marginTop: DIMENSION_PADDING_TINY,
                                        marginRight: DIMENSION_PADDING_SMALL
                                    }}
                                    size={16}/>
                            <Text style={{ color: COLOR_PRIMARY }}>
                                Gọi cửa hàng
                            </Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                        onPress={this._onDirectionPressed}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: DIMENSION_BUTTON_MEDIUM,
                            flex: 1
                        }}>
                        <JJIcon name={'navigation_o'}
                                color={COLOR_PRIMARY}
                                style={{
                                    marginTop: DIMENSION_PADDING_TINY,
                                    marginRight: DIMENSION_PADDING_SMALL
                                }}
                                size={16}/>

                        <Text style={{ color: COLOR_PRIMARY }}>
                            Chỉ đường
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _onItemPressed = () => {
        if (!!this.props.onClicked) this.props.onClicked(this.props.store)
    }

    _onPhoneCallPressed = () => {
        Communications.phonecall(this.props.store.phone_number, true)
    }

    _onDirectionPressed = () => {
        this.props.navigation.navigate('StoreDirection', { store: this.props.store });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.store !== undefined && this.props.store === undefined ||
            nextProps.latitude !== this.props.latitude ||
            nextProps.selected !== this.props.selected;
    }
}

StoreItem.propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    store: PropTypes.object,
    onClicked: PropTypes.func,
    selected: PropTypes.bool,
    navigation: PropTypes.any
}