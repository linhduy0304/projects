import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {Text} from "native-base";

import PropTypes from 'prop-types'
import JJIcon from "../../common/JJIcon";
import {
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_XX,
    DIMENSION_TEXT_UNDER_TINY
} from "../../../resources/dimens";
import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from "../../../resources/colors";
import {BaseComponent} from "../../../common/base/BaseComponent";
import DividerLine from "../../common/DividerLine";

export default class NavigationMenuItem extends BaseComponent {

    render() {

        return (
            <View>

                <TouchableOpacity
                    style={styles.rowList}
                    onPress={this._onPress}
                    activeOpacity={0.9}>

                    <JJIcon name={this.props.icon}
                            uri={this.props.iconUri}
                            size={DIMENSION_TEXT_HEADER_XX}
                            color={COLOR_TEXT_BLACK_1}
                            style={{width: DIMENSION_TEXT_HEADER_XX}}/>
                    <Text style={styles.labelMenu}>
                        {this.props.name}
                    </Text>
                    {
                        !!this.props.value &&
                        <Text style={{ fontSize: DIMENSION_TEXT_HEADER, color: COLOR_TEXT_BLACK_1, marginRight: DIMENSION_PADDING_SMALL }}>
                            {this.props.value}
                        </Text>
                    }
                    {
                        this.props.notiCount > 0 &&
                        <View
                            style={{
                                backgroundColor: COLOR_PRIMARY,
                                borderRadius: 6,
                                marginLeft: DIMENSION_PADDING_SMALL,
                                marginRight: DIMENSION_PADDING_SMALL,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>

                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 8,
                                    paddingTop: 1,
                                    paddingBottom: 1,
                                    paddingLeft: 4,
                                    paddingRight: 4
                                }}>
                                {this.props.notiCount}
                            </Text>

                        </View>
                    }
                    <JJIcon name={"chevron_right_o"}
                            size={DIMENSION_TEXT_UNDER_TINY}
                            color={COLOR_TEXT_BLACK_1}/>
                </TouchableOpacity>
                {
                    !!this.props.hasBottomDivider &&
                    <DividerLine style={styles.shortSeparateLine} />
                }
            </View>
        )
    }

    _onPress = () => {
        if (!!this.props.onPress) this.props.onPress(this.props.item);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.name !== this.props.name ||
            nextProps.value !== this.props.value ||
            nextProps.icon !== this.props.icon ||
            nextProps.iconUri !== this.props.iconUri ||
            nextProps.onPress !== this.props.onPress ||
            nextProps.notiCount !== this.props.notiCount;
    }
}

NavigationMenuItem.propTypes = {
    onPress: PropTypes.any,
    name: PropTypes.any,
    iconUri: PropTypes.any,
    value: PropTypes.any,
    icon: PropTypes.any,
    item: PropTypes.any,
    hasBottomDivider: PropTypes.any,
    notiCount: PropTypes.any
}

const styles = StyleSheet.create({
    rowList: {
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingBottom: DIMENSION_PADDING_SMALL,
        paddingTop: DIMENSION_PADDING_LARGE,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelMenu: {
        marginLeft: DIMENSION_PADDING_SMALL,
        flex: 1,
        color: COLOR_TEXT_BLACK_1,
        fontSize: DIMENSION_TEXT_HEADER

    },
    shortSeparateLine: {
        marginLeft: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM
    }
});