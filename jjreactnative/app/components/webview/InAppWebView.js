import React from "react";
import {View, TouchableOpacity, Platform} from 'react-native';

import {BaseComponent} from "../common/BaseComponent";
import JJWebView from './JJWebView';
import {ObjectUtil} from '../../utils/object-utils';
import JJStatusBar from "../common/view/JJStatusBar";
import JJIcon from '../common/JJIcon';
import {DIMENSION_BUTTON_MEDIUM} from "../../resources/dimens";
import {COLOR_TEXT_INACTIVE} from "../../resources/colors";
import {getPaddingTopBar} from "../../utils/common-utils";

const ios = Platform.OS === 'ios';
const paddingTopBar = (!!ios ? 4 : 32) + getPaddingTopBar();

/**
 * url: String
 */
export default class InAppWebView extends BaseComponent {

    render() {
        return (
            <View style={{flex: 1}}>
                <JJStatusBar/>
                <JJWebView
                    url={ObjectUtil.getValue(this, '', ['props', 'navigation', 'state', 'params', 'url'])}
                    style={{flex: 1}}
                />

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: paddingTopBar,
                        left: 0,
                        height: DIMENSION_BUTTON_MEDIUM,
                        width: DIMENSION_BUTTON_MEDIUM,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    activeOpacity={0.8}
                    onPress={this._onBackPressed}>

                    <JJIcon
                        color={COLOR_TEXT_INACTIVE}
                        size={14}
                        name={'chevron_left_o'}/>

                </TouchableOpacity>

            </View>
        )
    }

    _onBackPressed = () => {
        this.props.navigation.goBack();
    }
}
