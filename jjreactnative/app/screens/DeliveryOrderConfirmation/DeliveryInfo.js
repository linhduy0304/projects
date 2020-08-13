import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../common/base/BasePureComponent";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY} from "../../resources/dimens";
import {COLOR_TEXT_INACTIVE} from "../../resources/colors";
import JJIcon from '../../common/view/icon/JJIcon';
import Text from '../../common/view/text/JJText';
import {styles} from './styles';

export default class DeliveryInfo extends BasePureComponent {

    render() {

        return (
            <View style={{flexDirection: 'row', padding: DIMENSION_PADDING_MEDIUM, backgroundColor: 'white'}}>
                <View>
                    <JJIcon
                        name={'map_pin_o'}
                        size={14}
                        color={COLOR_TEXT_INACTIVE}/>
                </View>

                <View style={{marginLeft: DIMENSION_PADDING_SMALL, flex: 1}}>
                    <Text style={{color: COLOR_TEXT_INACTIVE}}>
                        Nhờ mua hộ đến
                    </Text>

                    <TouchableOpacity
                        style={{
                            paddingTop: DIMENSION_PADDING_TINY,
                            paddingBottom: DIMENSION_PADDING_TINY
                        }}
                        activeOpacity={0.8}
                        onPress={this.props.onEditNamePress}
                        >
                        <Text style={{color: '#22C300', fontWeight: 'bold'}}>
                            {`${this.props.userName} - ${this.props.phoneNumber} `} <JJIcon color={'#22C300'} name={'edit_o'} size={12}/>
                        </Text>
                    </TouchableOpacity>

                    <Text style={{color: COLOR_TEXT_INACTIVE}}>
                        {this.props.address}
                    </Text>
                    
                </View>
            </View>
        )
    }
}

DeliveryInfo.propTypes = {
    userName: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    onEditNamePress: PropTypes.func
}