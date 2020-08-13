import {Text} from 'native-base';
import {View, TouchableOpacity, Platform, Dimensions, Animated} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";

import {
    COLOR_TEXT_INACTIVE
} from '../../../resources/colors';
import JJIcon from '../../common/JJIcon';
import {BaseComponent} from "../../../common/base/BaseComponent";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import JJStatusBar from "../../common/view/JJStatusBar";
import BadgeNumberView from './BadgeNumberView'
import TextBoxSearchBanner from '../../common/view/TextBoxSearchBanner'
import {getPaddingTopBar} from "../../../utils/common-utils";
import {DrawerActions} from "react-navigation";

const {width} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const toolbarSize = ios ? 44 : 56;
const paddingTopBar = getPaddingTopBar();

class TabDiscoveryToolbar extends BaseComponent {

    render() {

        const toolbarBackgroundOpacity = this.props.scrollY.interpolate({
            inputRange: [0, 75],
            outputRange: [0, 1]
        });

        const toolbarOpacity = this.props.scrollY.interpolate({
            inputRange: [-22, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        const toolbarTranslateY = this.props.scrollY.interpolate({
            inputRange: [-24, 0],
            outputRange: [-39, 0],
            extrapolate: 'clamp'
        });

        console.log('TabDiscoveryToolbar', this.props);

        return (
            <Animated.View
                style={{
                    width,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    opacity: toolbarOpacity,
                    transform: [
                        { translateY: toolbarTranslateY }
                    ]
                }}>

                <Animated.View
                    style={{
                        opacity: toolbarBackgroundOpacity,
                        backgroundColor: this.props.headerColor,
                        position: 'absolute',
                        top: 0,
                        width,
                        bottom: 0,
                    }}/>

                <JJStatusBar styleColor={!this.props.styleColor ? 'dark' : this.props.styleColor}/>

                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: paddingTopBar
                }}>

                    <TouchableOpacity
                        style={{
                            height: toolbarSize,
                            width: toolbarSize,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={this._onOpenMenuDrawer}>

                        <JJIcon
                            style={{marginBottom: ios ? 6 : 0}}
                            name={"hamburger_o"}
                            size={22}
                            color={COLOR_TEXT_INACTIVE}/>

                        {
                            !!this.props.isLoginned
                            &&
                            (
                                this.props.availableVoucherCount === undefined ||
                                this.props.availableVoucherCount > 0
                            )
                            &&
                            <BadgeNumberView count={this.props.availableVoucherCount}/>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: 'rgba(250, 250, 250, 0.8)',
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            marginRight: DIMENSION_PADDING_SMALL,
                            marginBottom: ios ? 4 : 0,
                            height: 36,
                        }}
                        onPress={this._openSearchDeal}>
                        <JJIcon style={{margin: 8}} name={"search"} size={16} color={COLOR_TEXT_INACTIVE}/>
                        <Text style={{
                            color: COLOR_TEXT_INACTIVE,
                            fontSize: DIMENSION_TEXT_CONTENT,
                            marginBottom: ios ? 2 : 0,
                            flex: 1
                        }}>
                            {this.props.selectedProvinceName}
                        </Text>
                        {
                            !!this.props.banner43 &&
                            <TextBoxSearchBanner banner={this.props.banner43}
                                                 navigation={this.props.navigation}/>
                        }
                    </TouchableOpacity>

                </View>
            </Animated.View>
        );
    }

    _openSearchDeal = () => {
        this.props.navigation.navigate('SearchDeal');
    }

    _onOpenMenuDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.scrollY !== this.props.scrollY) return true;
        if (nextProps.selectedProvinceName !== this.props.selectedProvinceName) return true;
        if (nextProps.styleColor !== this.props.styleColor) return true;
        if (nextProps.headerColor !== this.props.headerColor) return true;
        if (nextProps.availableVoucherCount !== this.props.availableVoucherCount) return true;

        if (!!nextProps.banner43 && !this.props.banner43) return true;
        if (!nextProps.banner43 && !!this.props.banner43) return true;
        if (!!nextProps.banner43 && !nextProps.banner43.equals(this.props.banner43)) return true;

        return false;
    }
}

TabDiscoveryToolbar.defaultProps = {
    styleColor: 'dark',
    headerColor: 'white'
}

TabDiscoveryToolbar.propTypes = {
    navigation: PropTypes.any,
    selectedProvinceName: PropTypes.any,
    scrollY: PropTypes.any,
    styleColor: PropTypes.any,
    headerColor: PropTypes.any
}

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned,
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
        availableVoucherCount: state.homeReducer.getIn(['userInfo', 'available_voucher_count']),
        banner43: state.homeReducer.getIn(['banners', 'banner_43'])
    };
}

export default connect(mapStateToProps)(TabDiscoveryToolbar);
