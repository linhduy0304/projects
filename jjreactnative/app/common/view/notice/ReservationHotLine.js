import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {phonecall} from 'react-native-communications';

import Text from '../text/JJText';
import {BaseComponent} from "../../base/BaseComponent";
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import {COLOR_PRIMARY} from "../../../resources/colors";
import {HOTLINE} from "../../../const";
import {AnalyticsHelper} from '../../analytics';

export default class ReservationHotLine extends BaseComponent {

    render() {

        return (
            <View style={[{alignItems: 'center', padding: DIMENSION_PADDING_MEDIUM}, this.props.style]}>
                <Text style={{textAlign: 'center'}}>
                    Trong mọi trường hợp không sử dụng được mã,
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this._onHotLinePress}>
                    <Text style={{textAlign: 'center'}}>
                        vui lòng liên hệ Hotline <Text style={{fontWeight: 'bold'}}>JAM</Text>JA: <Text style={{fontWeight: 'bold', color: COLOR_PRIMARY, textDecorationLine: 'underline'}}>{HOTLINE}</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _onHotLinePress = () => {
        AnalyticsHelper.trackItemListInteraction(
            {
                screen_name: this.props.screen,
                section: 'hotline'
            },
            'hotline_click',
            'open_call_prompt'
        );
        phonecall(HOTLINE, true);
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        return false;
    }
}

ReservationHotLine.propTypes = {
    screen: PropTypes.string,
    style: PropTypes.any
}