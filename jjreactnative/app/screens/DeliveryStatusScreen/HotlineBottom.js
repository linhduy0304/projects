import React from 'react';
import {  Text, TouchableOpacity, Linking } from 'react-native';
import { BaseComponent } from '../../common/base/BaseComponent';
import { COLOR_PRIMARY } from '../../resources/colors';
import { DIMENSION_PADDING_MEDIUM } from '../../resources/dimens';
import JJIcon from '../../common/view/icon/JJIcon';
import {HOTLINE} from '../../const';

export default class HotlineBottom extends BaseComponent {
    render() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: DIMENSION_PADDING_MEDIUM
                }}
                onPress={() => {
                    Linking.openURL(`tel:${HOTLINE}`);
                }}
            >
                <Text style={{ marginRight: 8 }}>Hotline JAMJA: {HOTLINE}</Text>
                <JJIcon name="phone_o" style={{ marginRight: 4 }} size={12} color={COLOR_PRIMARY} />
                <Text style={{ color: COLOR_PRIMARY }}>Gọi</Text>
            </TouchableOpacity>
        );
    }
}

