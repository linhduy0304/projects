import {Text} from 'native-base';
import {View, TouchableOpacity, Platform, Dimensions} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";

import {
    COLOR_GRAY_BG,
    COLOR_TEXT_INACTIVE
} from '../../resources/colors';
import JJIcon from '../common/JJIcon';
import {BaseComponent} from "../common/BaseComponent";
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../resources/dimens";
import JJStatusBar from "../common/view/JJStatusBar";
import TextBoxSearchBanner from '../common/view/TextBoxSearchBanner'
import BadgeNumberView from "../tabDiscovery/BadgeNumberView";
import {getPaddingTopBar} from "../../utils/common-utils";

const {width} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const toolbarSize = ios ? 44 : 56;
const paddingTopBar = getPaddingTopBar();

class TabEventToolbar extends BaseComponent {

    render() {
        console.log('TabEventToolbar:render', this.props);
        return (
            <View
                style={{
                    width
                }}>

                <JJStatusBar bgColor={this.props.headerColor}
                             styleColor={'light'}/>

                <View style={{
                    width: '100%',
                    backgroundColor: this.props.headerColor,
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
                        onPress={this.props.onSideMenuButtonPress}>

                        <JJIcon
                            style={{marginBottom: ios ? 6 : 0}}
                            name={"hamburger_o"}
                            size={22}
                            color={COLOR_TEXT_INACTIVE}/>

                        {
                            !!this.props.isLoginned
                            &&
                            (
                                !this.props.isLoginned ||
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
                            backgroundColor: COLOR_GRAY_BG,
                            borderRadius: DIMENSION_RADIUS_MEDIUM,
                            marginRight: DIMENSION_PADDING_SMALL,
                            marginBottom: ios ? 4 : 0,
                            height: 36,
                        }}
                        onPress={this._openSearchDeal}>

                        <JJIcon style={{ margin: 8 }} name={"search"} size={16} color={COLOR_TEXT_INACTIVE} />
                        <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT, marginBottom: Platform.OS === 'ios' ? 2 : 0 }}>
                            {this.props.selectedProvinceName}
                        </Text>

                        {
                            !!this.props.banner43 &&
                            <TextBoxSearchBanner banner={this.props.banner43}
                                                 navigation={this.props.navigation}/>
                        }

                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _openSearchDeal = () => {
        this.props.navigation.navigate('SearchDeal');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selectedProvinceName !== this.props.selectedProvinceName) return true;
        if (nextProps.headerColor !== this.props.headerColor) return true;
        if (nextProps.availableVoucherCount !== this.props.availableVoucherCount) return true;

        if (!!nextProps.banner43 && !this.props.banner43) return true;
        if (!nextProps.banner43 && !!this.props.banner43) return true;
        if (!!nextProps.banner43 && !nextProps.banner43.equals(this.props.banner43)) return true;

        return false;
    }
}

TabEventToolbar.defaultProps = {
    headerColor: 'white'
}

TabEventToolbar.propTypes = {
    navigation: PropTypes.any,
    onSideMenuButtonPress: PropTypes.any,
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

export default connect(mapStateToProps)(TabEventToolbar);
