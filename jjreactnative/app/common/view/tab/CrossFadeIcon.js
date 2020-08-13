import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import JJIcon from "../../../components/common/JJIcon";
import {BasePureComponent} from "../../base/BasePureComponent";
import {StringUtil} from '../../../utils/string-util';

export default class TabBarIcon extends BasePureComponent {
    render() {
        const {
            params,
            isFocus,
            style
        } = this.props;

        const activeOpacity = !!isFocus ? 1 : 0;
        const inActiveOpacity = !!isFocus ? 0 : 1;

        return (
            <View style={style}>
                <Animated.View style={[styles.icon, { opacity: activeOpacity }]}>
                    <JJIcon
                        name={this._getNameIcon(params.activeIcon)}
                        uri={this._getUriIcon(params.activeIcon)}
                        size={24}
                        color={params.activeColor}
                    />
                </Animated.View>
                <Animated.View style={[styles.icon, { opacity: inActiveOpacity }]}>
                    <JJIcon
                        name={this._getNameIcon(params.inactiveIcon)}
                        uri={this._getUriIcon(params.inactiveIcon)}
                        size={24}
                        color={params.inactiveColor}
                    />
                </Animated.View>
            </View>
        );
    }

    _getUriIcon = url => {
        try {
            if (StringUtil.isEmpty(url)) return undefined;
            if (url.indexOf('http') >= 0) return url;
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    }

    _getNameIcon = url => {
        try {
            if (StringUtil.isEmpty(url)) return undefined;
            if (url.indexOf('http') < 0) return url;
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    }
}

const styles = StyleSheet.create({
    icon: {
        // We render the icon twice at the same position on top of each other:
        // active and inactive one, so we can fade between them:
        // Cover the whole iconContainer:
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        // Workaround for react-native >= 0.54 layout bug
        minWidth: 25
    }
});