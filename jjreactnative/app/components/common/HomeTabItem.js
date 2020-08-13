import React from 'react'
import {Text} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'

import {BaseComponent} from "../common/BaseComponent";
import {
    DIMENSION_TEXT_TINY
} from "../../resources/dimens";
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import JJIcon from './JJIcon'
import PopoverGuideView from './view/PopoverGuideView'

export default class HomeTabItem extends BaseComponent {

    disablePopover = false;

    render() {
        const textColor = this.props.active ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE;
        const fontWeight = this.props.active ? 'bold' : 'normal';

        return (
            <View>
                <TouchableOpacity
                    key={`${this.props.name}_${this.props.page}`}
                    onPress={this._onPress}
                    onLayout={this.props.onLayoutHandler}
                    style={{backgroundColor: 'white'}}
                    ref={this._onRefTabButton}
                >
                    <View style={{
                        height: 49,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft: 20,
                        paddingRight: 20,
                        backgroundColor: 'white'
                    }}>
                        <JJIcon
                            name={this.props.icon}
                            uri={this.props.uri}
                            size={24}
                            color={textColor}
                        />
                        <Text style={{color: textColor, fontWeight, fontSize: DIMENSION_TEXT_TINY}}>
                            {this.props.name}
                        </Text>
                    </View>
                </TouchableOpacity>

                {
                    !!this.props.active &&
                    !this.disablePopover &&
                    <PopoverGuideView type={this.props.name}
                                      active={this.props.active}
                                      getAnchorView={this._getAnchorViewPopover}
                                      position={'top'}
                                      navigation={this.props.navigation}
                                      onShowPopover={this._onShowPopoverTrigger}/>
                }
            </View>
        )
    }

    _onRefTabButton = (ref) => this.refTabButton = ref;

    _getAnchorViewPopover = () => this.refTabButton;

    _onShowPopoverTrigger = () => this.disablePopover = true;

    _onPress = () => {
        this.props.onPressHandler(this.props.page);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.active !== this.props.active ||
            nextProps.name !== this.props.name ||
            nextProps.icon !== this.props.icon ||
            nextProps.uri !== this.props.uri;
    }
}

HomeTabItem.propTypes = {
    name: PropTypes.string,
    page: PropTypes.any,
    icon: PropTypes.any,
    uri: PropTypes.any,
    active: PropTypes.bool,
    navigation: PropTypes.any,
    onPressHandler: PropTypes.func,
    onLayoutHandler: PropTypes.func,
}
