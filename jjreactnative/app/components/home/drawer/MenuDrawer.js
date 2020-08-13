import {connect} from 'react-redux';
import {LoginManager} from 'react-native-fbsdk';
import {Text} from 'native-base';
import firebase from 'react-native-firebase';
import VersionNumber from 'react-native-version-number';
import {DrawerActions} from 'react-navigation';

import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    Linking
} from 'react-native';
import React from 'react';

import {
    COLOR_PRIMARY,
    COLOR_GRAY_BG,
    COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE
} from '../../../resources/colors';
import {logoutUser} from '../../login/action';
import NavigationMenuItem from './NavigationMenuItem'
import NavigationMenuHeader from './NavigationMenuHeader'
import NavigationMenuLogout from './NavigationMenuLogout'

import {
    DIMENSION_PADDING_EXTRA,
    DIMENSION_PADDING_EXTRA_X,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER_XXX,
    DIMENSION_TEXT_TINY,
} from "../../../resources/dimens";
import {fromJS} from "immutable";
import {BasePureComponent} from "../../../common/base/BasePureComponent";
import {getPaddingTopBar} from "../../../utils/common-utils";
import {AppConfig} from '../../../common/config';
import {KEY, PARAMS} from '../../../common/config/key_configs';
import { DeliveryDraffDb } from '../../../api/storage/DeliveryDraffDb';

const paddingTopBar = 32 + getPaddingTopBar();

class MenuDrawer extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentVersion: VersionNumber.appVersion,
            latestVersion: AppConfig.firebaseConfig.getIn([KEY.UPDATE, PARAMS.VERSION_NAME], VersionNumber.appVersion),
            latestVersionCode: AppConfig.firebaseConfig.getIn([KEY.UPDATE, PARAMS.VERSION_CODE], VersionNumber.buildVersion)
        }
    }

    render() {
        return (
            <ScrollView
                style={{
                    flex: 1
                }}
                showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, backgroundColor: 'white', paddingTop: paddingTopBar}}>

                    {/* Login */}
                    <NavigationMenuHeader onPress={this._openLoginPress}
                                          hasLogin={this.props.isLoginned}
                                          userAvatar={!!this.props.user ? this.props.user.avatar : undefined}
                                          userName={!!this.props.user ? this.props.user.full_name : undefined}/>

                    {/* Mã khuyến mãi của tôi */}
                    <NavigationMenuItem icon={'ticket_o'}
                                        name={'Mã khuyến mãi của tôi'}
                                        notiCount={this.props.availableVoucherCount}
                                        hasBottomDivider={true}

                                        onPress={this._onSelectOwnerCoupon}/>

                    {/* Khuyến mãi đánh dấu */}
                    <NavigationMenuItem icon={'bookmark_o'}
                                        name={'Khuyến mãi đánh dấu'}
                                        hasBottomDivider={true}
                                        onPress={this._onSelectDealBookmarked}/>

                    {/* Theo dõi thương hiệu */}
                    <NavigationMenuItem icon={'plus_o'}
                                        name={'Theo dõi thương hiệu'}
                                        hasBottomDivider={true}
                                        onPress={this._onSelectBrandFollowing}/>

                    {/* City */}
                    <NavigationMenuItem icon={'map_pin_o'}
                                        name={'Thành phố'}
                                        value={this.props.selectedProvinceName}
                                        hasBottomDivider={true}
                                        onPress={this._onSelectCity}/>

                    <View style={{height: DIMENSION_PADDING_LARGE, backgroundColor: 'white'}}/>

                    {/* Danh mục */}
                    <View style={styles.headerSection}>
                        <Text style={styles.tittleHeaderSection}>
                            Danh mục
                        </Text>
                    </View>

                    {
                        !!this.props.categories &&
                        this.props.categories.filter((ct, i) => i < 4)
                            .map((category, index) => (
                                <NavigationMenuItem key={`menu_item_${index}_${category.get('name')}`}
                                                    iconUri={category.get('icon')}
                                                    name={category.get('name')}
                                                    item={category}
                                                    hasBottomDivider={true}
                                                    onPress={this._gotoCategoryDetail}/>
                            ))
                    }

                    {/* Xem hết */}
                    <NavigationMenuItem icon={'more_horizontal_o'}
                                        name={'Khác'}
                                        hasBottomDivider={true}
                                        onPress={this._gotoOtherCategory}/>

                    <View style={{height: DIMENSION_PADDING_LARGE, backgroundColor: 'white'}}/>

                    {/* Khám phá */}
                    <View style={styles.headerSection}>
                        <Text style={styles.tittleHeaderSection}>
                            Khám phá
                        </Text>
                    </View>

                    {/* Độc quyền */}
                    <NavigationMenuItem icon={'exclusive__o'}
                                        name={'Độc quyền - Chỉ có tại JAMJA'}
                                        hasBottomDivider={true}
                                        onPress={this._gotoExclusiveDeals}/>

                    {/* Bộ sưu tập */}
                    <NavigationMenuItem icon={'collection_o'}
                                        name={'Bộ sưu tập'}
                                        hasBottomDivider={true}
                                        onPress={this._goToCollection}/>

                    {/* Trung tâm thương mại */}
                    <NavigationMenuItem icon={'mall_o'}
                                        name={'Trung tâm thương mại'}
                                        hasBottomDivider={true}
                                        onPress={this._goToMall}/>

                    <View style={{height: DIMENSION_PADDING_LARGE, backgroundColor: 'white'}}/>
                    <View style={{height: DIMENSION_PADDING_LARGE, backgroundColor: COLOR_GRAY_BG}}/>

                    {/* Về JAMJA */}
                    {/*<NavigationMenuItem icon={'info_o'}*/}
                    {/*name={'Về JAMJA'}*/}
                    {/*hasBottomDivider={true}*/}
                    {/*onPress={this._goToAbout}/>*/}

                    {/* Đánh giá JAMJA */}
                    <NavigationMenuItem icon={'star_o'}
                                        name={'Đánh giá JAMJA'}
                                        hasBottomDivider={true}
                                        onPress={this._goToRate}/>

                    {/* Điều khoản */}
                    <NavigationMenuItem icon={'book_o'}
                                        name={'Điều khoản'}
                                        hasBottomDivider={true}
                                        onPress={this._gotoRulePage}/>

                    {/* Chính sách bảo mật */}
                    <NavigationMenuItem icon={'lock_o'}
                                        name={'Chính sách bảo mật'}
                                        hasBottomDivider={true}
                                        onPress={this._gotoPrivacyPage}/>

                    {/*<NavigationMenuItem icon={'lock_o'}*/}
                    {/*name={'Test'}*/}
                    {/*hasBottomDivider={true}*/}
                    {/*onPress={this._onGotoTest}/>*/}


                    <View style={{height: DIMENSION_PADDING_LARGE, backgroundColor: 'white'}}/>
                    <View style={{height: DIMENSION_PADDING_LARGE, backgroundColor: COLOR_GRAY_BG}}/>

                    {/* Footer */}
                    <View style={{
                        backgroundColor: COLOR_GRAY_BG,
                        justifyContent: 'center',
                    }}>

                        {
                            this.props.isLoginned &&
                            <NavigationMenuLogout onPress={this._logOutUser}/>
                        }

                        <Text style={{
                            color: COLOR_TEXT_INACTIVE,
                            marginTop: DIMENSION_PADDING_MEDIUM,
                            textAlign: 'center'
                        }}>
                            © <Text style={{color: COLOR_TEXT_INACTIVE, fontWeight: 'bold'}}>JAM</Text>JA Corp. version {this.state.currentVersion}
                        </Text>

                        <Text style={{
                            color: COLOR_TEXT_INACTIVE,
                            marginTop: DIMENSION_PADDING_TINY,
                            marginBottom: DIMENSION_PADDING_MEDIUM,
                            textAlign: 'center',
                            fontSize: DIMENSION_TEXT_TINY
                        }}>
                            1557368884
                        </Text>

                        {
                            this.state.currentVersion !== this.state.latestVersion &&
                            VersionNumber.buildVersion < this.state.latestVersionCode &&
                            <TouchableOpacity
                                onPress={this._updateNewVersion}
                                style={{
                                    marginBottom: DIMENSION_PADDING_EXTRA,
                                }}>
                                <Text style={{
                                    color: COLOR_PRIMARY,
                                    textDecorationLine: 'underline',
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                    fontSize: DIMENSION_TEXT_CONTENT
                                }}>
                                    {`Cập nhật phiên bản ${this.state.latestVersion}`}
                                </Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </ScrollView>
        )
    }

    componentDidMount() {
        super.componentDidMount();
    }

    _openLoginPress = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'nav',
                        action_name: 'nav_login',
                    },
                    action: {
                        name: 'click_login_button',
                        category: 'login'
                    }
                });
        } else {
            // this.props.navigation.navigate('UserProfile');
        }
    }

    _onSelectOwnerCoupon = () => {
        this._closeDrawerMenu();
        this.props.navigation.navigate('MaUuDai')
    }

    _onSelectDealBookmarked = () => {
        this._closeDrawerMenu();
        this.props.navigation.navigate('DanhDau')
    }

    _onSelectBrandFollowing = () => {
        this._closeDrawerMenu();
        this.props.navigation.navigate('TheoDoi')
    }

    _onSelectCity = () => {
        this._closeDrawerMenu();
        this.props.navigation.navigate('SelectCity')
    }

    _gotoExclusiveDeals = () => {
        this._closeDrawerMenu();
        this.props.navigation.push('SubCategory', {
            screenType: 'doc-quyen',
            title: 'Độc quyền tại JAMJA'
        })
    }

    _gotoCategoryDetail = (category) => {
        this._closeDrawerMenu();
        this.props.navigation.push('SubCategory', {
            screenType: category.get('slug'),
            title: category.get('name'),
            subList: fromJS(category.get('sub_categories'))
        })
    }

    _gotoOtherCategory = () => {
        this._closeDrawerMenu();
        this.props.navigation.push('SubCategory', {
            screenType: 'khac',
            title: 'Khác',
        })
    }

    _goToMall = () => {
        this._closeDrawerMenu();
        this.props.navigation.navigate('ShoppingMall')
    }

    _goToCollection = () => {
        this._closeDrawerMenu();
        this.props.navigation.navigate('Collections')
    }

    _goToRate = () => {
        this._closeDrawerMenu();
        const url = Platform.OS === 'ios' ? 'itms-apps://itunes.apple.com/app/id980165889' : 'market://details?id=com.jamjavn.jamja';
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Not supported");
            }
        });
    }

    _gotoPrivacyPage = () => {
        this._closeDrawerMenu();
        this.props.navigation.navigate('InAppWebView', {
            url: "https://jamja.vn/chinh-sach-bao-mat/"
        });
    }

    _gotoRulePage = () => {
        this._closeDrawerMenu();
        this.props.navigation.navigate('InAppWebView', {url: "https://jamja.vn/dieu-khoan/"});
    }

    _updateNewVersion = () => {
        this._closeDrawerMenu();
        const url = Platform.OS === 'ios' ? 'itms-apps://itunes.apple.com/app/id980165889' : 'market://details?id=com.jamjavn.jamja';
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Not supported");
            }
        });
    }

    _logOutUser = () => {
        try {
            LoginManager.logOut();
            firebase.auth().signOut();
            this._closeDrawerMenu();
            this.props.dispatch(logoutUser());
            this._removeDraffDelivery();
        } catch (e) {
            console.log(e);
        }
    }

    _removeDraffDelivery = () => {
        DeliveryDraffDb.removeAll();
    }

    _closeDrawerMenu = () => {
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

}

const styles = StyleSheet.create({
    headerSection: {
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_EXTRA_X,
        paddingBottom: DIMENSION_PADDING_SMALL,
        backgroundColor: COLOR_GRAY_BG
    },
    tittleHeaderSection: {
        fontSize: DIMENSION_TEXT_HEADER_XXX,
        fontWeight: 'bold',
        color: COLOR_TEXT_BLACK_1
    }
});

function mapStateToProps(state) {
    return {
        isLoginned: state.loginReducer.isLoginned,
        user: state.loginReducer.user,
        //Location
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
        //Categories
        categories: state.homeReducer.get('categories'),
        //Get buy_online_sub_list from  homepageDealsReducer
        eCouponSubList: state.homeReducer.get('eCouponSubList'),

        availableVoucherCount: state.homeReducer.getIn(['userInfo', 'available_voucher_count'], 0)
    };
}

export default connect(mapStateToProps)(MenuDrawer);