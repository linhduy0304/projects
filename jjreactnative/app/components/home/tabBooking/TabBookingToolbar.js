import {Text} from 'native-base';
import {View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";

import {
    COLOR_GRAY_BG,
    COLOR_LINE,
    COLOR_TEXT_INACTIVE
} from '../../../resources/colors';
import JJIcon from '../../common/JJIcon';
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import JJStatusBar from "../../common/view/JJStatusBar";
import BadgeNumberView from '../tabDiscovery/BadgeNumberView'
import FilterButton from "../../common/section/FilterButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TextBoxSearchBanner from "../../common/view/TextBoxSearchBanner";
import {getPaddingTopBar} from "../../../utils/common-utils";
import {BaseComponent} from "../../../common/base/BaseComponent";
import {DrawerActions} from "react-navigation";


const ios = Platform.OS === 'ios';
const toolbarSize = ios ? 44 : 56;
const paddingTopBar = getPaddingTopBar();

class TabBookingToolbar extends BaseComponent {

    render() {

        return (
            <View
                style={{width: '100%'}}>

                <JJStatusBar styleColor={'dark'}/>

                <View style={{
                    width: '100%',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    paddingTop: paddingTopBar,
                    borderBottomWidth: 1,
                    borderBottomColor: COLOR_LINE
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

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginBottom: ios ? 2 : 0,
                            alignItems: 'center',
                            alignSelf: 'center',
                            paddingRight: DIMENSION_PADDING_SMALL,
                        }}>
                            <Icon style={{ marginTop: 3 }}
                                  name={"chevron-right"}
                                  size={18}
                                  color={COLOR_TEXT_INACTIVE} />

                            <Text
                                style={{
                                    color: COLOR_TEXT_INACTIVE,
                                    fontSize: DIMENSION_TEXT_CONTENT,
                                    fontWeight: 'bold',
                                    flex: 1,
                                    marginRight: !!this.props.banner43 ?  32 : 0
                                }}
                                  numberOfLines={1}
                                  ellipsizeMode={'tail'}>
                                Đặt chỗ
                            </Text>
                        </View>

                        {
                            !!this.props.banner43 &&
                            <TextBoxSearchBanner banner={this.props.banner43}
                                                 navigation={this.props.navigation}/>
                        }

                    </TouchableOpacity>

                    {
                        !!this.props.showFilter &&
                        <FilterButton onPress={this.props.onFilterClicked}
                                      disablePopover={true}
                                      navigation={this.props.navigation}
                                      badgeNumber={this.props.filterCount}/>
                    }

                </View>
            </View>
        );
    }

    _openSearchDeal = () => {
        this.props.navigation.navigate('SearchDeal');
    }

    _onOpenMenuDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.selectedProvinceName !== this.props.selectedProvinceName) return true;
        if (nextProps.availableVoucherCount !== this.props.availableVoucherCount) return true;
        if (nextProps.filterCount !== this.props.filterCount) return true;
        if (nextProps.showFilter !== this.props.showFilter) return true;

        if (!!nextProps.banner43 && !this.props.banner43) return true;
        if (!nextProps.banner43 && !!this.props.banner43) return true;
        if (!!nextProps.banner43 && !nextProps.banner43.equals(this.props.banner43)) return true;

        return false;
    }
}

TabBookingToolbar.propTypes = {
    navigation: PropTypes.any,
    filterCount: PropTypes.any,
    showFilter: PropTypes.any,
    onFilterClicked: PropTypes.any
}

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned,
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
        availableVoucherCount: state.homeReducer.getIn(['userInfo', 'available_voucher_count']),
        banner43: state.homeReducer.getIn(['banners', 'banner_43'])
    };
}

export default connect(mapStateToProps)(TabBookingToolbar);
