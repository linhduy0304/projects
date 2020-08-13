import React from 'react';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import {Text} from 'native-base';

import CrossFadeIcon from './CrossFadeIcon';
import TabItem from './TabItem';

const majorVersion = parseInt(Platform.Version, 10);
const isIos = Platform.OS === 'ios';
const isIOS11 = majorVersion >= 11 && isIos;

const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;

export default class TabBarBottom extends React.Component {
    static defaultProps = {
        activeTintColor: '#e73948',
        activeBackgroundColor: 'transparent',
        inactiveTintColor: '#999999',
        inactiveBackgroundColor: 'transparent',
        showLabel: true,
        showIcon: true,
        allowFontScaling: true,
        adaptive: isIOS11,
        safeAreaInset: { bottom: 'always', top: 'never' }
    };

    render() {
        const {
            navigation,
            onTabPress,
            onTabLongPress,
            safeAreaInset,
            style,
            tabStyle
        } = this.props;

        const { routes } = navigation.state;

        const tabBarStyle = [styles.tabBar, this._shouldUseHorizontalLabels() && !Platform.isPad ? styles.tabBarCompact : styles.tabBarRegular, style];

        return (
            <SafeAreaView
                style={tabBarStyle}
                forceInset={safeAreaInset}>

                {
                    routes.map((route, index) => {
                        const focused = index === navigation.state.index;
                        const testID = this.props.getTestID({ route });

                        return (
                            <TabItem
                                key={route.key}
                                testID={testID}
                                style={[styles.tab, tabStyle]}
                                onPress={() => onTabPress({route})}
                                onLongPress={() => onTabLongPress({route})}>

                                {this._renderIcon(route.params, focused)}
                                {this._renderLabel(route.params, focused)}
                            </TabItem>
                        )
                    })
                }
            </SafeAreaView>
        );
    }

    _shouldUseHorizontalLabels = () => {
        const { routes } = this.props.navigation.state;
        const { isLandscape, dimensions, adaptive, tabStyle } = this.props;

        if (!adaptive) {
            return false;
        }

        if (Platform.isPad) {
            let maxTabItemWidth = DEFAULT_MAX_TAB_ITEM_WIDTH;

            const flattenedStyle = StyleSheet.flatten(tabStyle);

            if (flattenedStyle) {
                if (typeof flattenedStyle.width === 'number') {
                    maxTabItemWidth = flattenedStyle.width;
                } else if (typeof flattenedStyle.maxWidth === 'number') {
                    maxTabItemWidth = flattenedStyle.maxWidth;
                }
            }

            return routes.length * maxTabItemWidth <= dimensions.width;
        } else {
            return isLandscape;
        }
    };

    _renderIcon = (params, isFocus) => <CrossFadeIcon params={params} isFocus={isFocus} style={{flex: 1}}/>;

    _renderLabel = (params, isFocus) => {

        if (!params) return null;

        return (
            <Text style={[styles.label, { color: !!isFocus ? params.activeColor : params.inactiveColor}]}>
                {params.label}
            </Text>
        )
    }
}

const DEFAULT_HEIGHT = 49;
const COMPACT_HEIGHT = 29;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0, 0, 0, .3)',
        flexDirection: 'row'
    },
    tabBarCompact: {
        height: COMPACT_HEIGHT
    },
    tabBarRegular: {
        height: DEFAULT_HEIGHT
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
    },
    label: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontSize: 10
    }
});