import { connect } from 'react-redux';
import { Text } from 'native-base';
import { View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React  from 'react';
import PropTypes from 'prop-types'

import {
    COLOR_GRAY_BG, COLOR_PRIMARY,
    COLOR_TEXT_INACTIVE, COLOR_LINE
} from '../../resources/colors';
import { getPaddingTopBar } from '../../utils/common-utils';
import JJIcon from './JJIcon';
import {
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT
} from "../../resources/dimens";
import JJStatusBar from "./view/JJStatusBar";
import TextBoxSearchBanner from './view/TextBoxSearchBanner'
import {BasePureComponent} from "./BasePureComponent";
import {AppConfig} from '../../common/config';

const headerHeigh = Platform.OS === 'ios' ? 44 : 56;
const paddingTopBar = getPaddingTopBar();

class JJHeader extends BasePureComponent {

    render() {
        return (
            <View
                style={{width: '100%'}}>

                {
                    !this.props.removeStatusBar &&
                    <JJStatusBar/>
                }

                <View style={{
                    width: '100%',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    paddingTop: !!this.props.removeStatusBar && AppConfig.ios ? DIMENSION_PADDING_SMALL : paddingTopBar,
                    borderBottomWidth: 1,
                    borderBottomColor: COLOR_LINE
                }}>

                    {this.renderLeftButton()}
                    {this.renderMainContent()}
                    {this.renderRightButton()}

                </View>
            </View>
        );
    }

    renderMainContent() {
        if (this.props.showSearchBar) {
            return (
                <TouchableOpacity style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: COLOR_GRAY_BG,
                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                    marginRight: DIMENSION_PADDING_SMALL,
                    marginBottom: Platform.OS === 'ios' ? 4 : 0,
                    height: 36,
                }}
                onPress={this._openSearchDeal}>
                    <JJIcon style={{ margin: 8 }} name={"search"} size={16} color={COLOR_TEXT_INACTIVE} />
                    {
                        this.props.hideSelectedCity !== true &&
                        <Text
                            style={{
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_CONTENT,
                                marginBottom: Platform.OS === 'ios' ? 2 : 0
                            }}>
                            {this.props.selectedProvinceName}
                        </Text>
                    }
                    {this.renderFilterIfHave()}
                    {
                        !!this.props.banner43 &&
                        !this.props.hideBanner &&
                        <TextBoxSearchBanner banner={this.props.banner43}
                                             navigation={this.props.navigation}/>
                    }
                </TouchableOpacity>
            )
        }

        if (this.props.title) {
            return (
                <View style={{
                    flex: 1,
                    height: headerHeigh,
                    marginRight: this.props.rightItem !== undefined ? 0 : headerHeigh,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: !!this.props.titleColor ? this.props.titleColor : COLOR_PRIMARY,
                        fontSize: 16,
                        marginBottom: Platform.OS === 'ios' ? 4 : 0,
                        fontWeight: 'bold'
                    }}>{this.props.title}</Text>
                </View >
            )
        }

        if (this.props.customTitleView) {
            return (
                <View style={{
                    flex: 1,
                    height: headerHeigh,
                    marginRight: this.props.rightItem !== undefined ? 0 : headerHeigh,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {this.props.customTitleView()}
                </View >
            )
        }
    }

    renderRightButton() {
        let rightItem = undefined;
        if (!!this.props.rightItem) {
            console.log(this.props.rightItem)
            if (typeof this.props.rightItem === "function") {
                rightItem = this.props.rightItem()
            } else {
                rightItem = <Text>{this.props.rightItem}</Text>
            }
        }
        if (!!rightItem) {
            return (
                <View style={{
                    height: headerHeigh,
                    minWidth: headerHeigh,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {rightItem}
                </View>
            )
        }
    }

    renderLeftButton() {
        if (this.props.onToggleBurger) {
            return (
                <TouchableOpacity
                    style={{
                        height: headerHeigh,
                        width: headerHeigh,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={this.props.onToggleBurger}>
                    <JJIcon
                        style={{ marginBottom: Platform.OS === 'ios' ? 6 : 0 }}
                        name={"hamburger_o"}
                        size={22}
                        color={COLOR_TEXT_INACTIVE} />
                </TouchableOpacity>
            )
        }
        if (this.props.leftItem) {
            return (
                <View
                    style={{
                        height: headerHeigh,
                        minWidth: headerHeigh,
                    }}>
                    {this.props.leftItem()}
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{
                        height: headerHeigh,
                        width: headerHeigh,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={this._onBackClicked}>
                    <JJIcon
                        style={{ marginBottom: Platform.OS === 'ios' ? 4 : 0 }}
                        name={!!this.props.leftIcon ? this.props.leftIcon : 'chevron_left_o'}
                        color={!!this.props.leftIconColor ? this.props.leftIconColor : COLOR_TEXT_INACTIVE}
                        size={18} />
                </TouchableOpacity>
            )
        }

    }

    renderFilterIfHave() {
        if (this.props.filter) {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom: Platform.OS === 'ios' ? 2 : 0,
                    alignItems: 'center',
                    alignSelf: 'center',
                    paddingRight: DIMENSION_PADDING_SMALL,
                }}>
                    {
                        this.props.hideSelectedCity !== true &&
                        <Icon style={{ marginTop: 3 }}
                              name={"chevron-right"}
                              size={18}
                              color={COLOR_TEXT_INACTIVE} />
                    }
                    <Text
                        style={[
                            {
                                color: COLOR_TEXT_INACTIVE,
                                fontSize: DIMENSION_TEXT_CONTENT,
                                fontWeight: 'bold',
                                flex: 1,
                                marginRight: !!this.props.banner43 ? 32 : 0
                            },
                            this.props.searchKeywordStyle
                        ]}
                          numberOfLines={1}
                          ellipsizeMode={'tail'}>
                        {this.props.filter}
                    </Text>
                </View>
            )
        } else {
            return null
        }
    }

    _onBackClicked = () => {
        if (!!this.props.onGoBackAction) this.props.onGoBackAction();
        if (!this.props.overrideGoBack) this.props.navigation.goBack();
    }

    _openSearchDeal = () => {
        if (this.props.onSearchPressed) {
            this.props.onSearchPressed()
        } else {
            this.props.navigation.navigate('SearchDeal')
        }
    }
}

JJHeader.propTypes = {
    showSearchBar: PropTypes.any,
    searchKeywordStyle: PropTypes.any,
    onSearchPressed: PropTypes.func,
    customTitleView: PropTypes.any,
    leftItem: PropTypes.any,
    rightItem: PropTypes.any,
    title: PropTypes.string,
    navigation: PropTypes.any,
    filter: PropTypes.any,
    hideSelectedCity: PropTypes.any,
    onGoBackAction: PropTypes.any,
    overrideGoBack: PropTypes.any,
    hideBanner: PropTypes.any,
    titleColor: PropTypes.any,
    removeStatusBar: PropTypes.any,
    leftIcon: PropTypes.any,
    leftIconColor: PropTypes.any
}

const mapStateToProps = (state) => {
    return {
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
        banner43: state.homeReducer.getIn(['banners', 'banner_43'])
    }
};

export default connect(mapStateToProps)(JJHeader);
