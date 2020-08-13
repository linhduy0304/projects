import { connect } from "react-redux";
import { Text } from 'native-base';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropsType from 'prop-types'
import React from 'react';
import FastImage from 'react-native-fast-image'

import {COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import JJIcon from '../../common/JJIcon';
import {BaseComponent} from "../../common/BaseComponent";
import {StringUtil} from '../../../utils/string-util'
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER
} from "../../../resources/dimens";
import {followBrand} from '../../detail/action'
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";
import {getQRCodeUrl} from "../../../utils/Utils";

class ItemBrandFollowing extends BaseComponent {

    render() {
        if (this.props.isHeader) {
            return (
                <Text style={{
                    color: COLOR_TEXT_BLACK_1,
                    backgroundColor: COLOR_GRAY_BG,
                    padding: DIMENSION_PADDING_MEDIUM,
                    fontSize: DIMENSION_TEXT_HEADER,
                    fontWeight: 'bold',
                    marginTop: DIMENSION_PADDING_MEDIUM
                }}
                      uppercase={true}>
                    Theo dõi thêm
                </Text>
            )
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onFollowBrandClicked}
                                  style={{ height: DIMENSION_BUTTON_MEDIUM, width: DIMENSION_BUTTON_MEDIUM, alignItems: 'center', justifyContent: 'center' }}>
                    <JJIcon name={'plus_o'}
                        size={14}
                        color={this.props.brand.following ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, padding: 5 }}
                                  onPress={this._seeDeals}>
                    <View style={{ flex: 1, height: DIMENSION_BUTTON_MEDIUM }}>
                        <FastImage
                            source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(this.props.brand.image, 0, DIMENSION_BUTTON_MEDIUM))}
                            style={{ height: DIMENSION_BUTTON_MEDIUM, width: undefined }}
                            resizeMode={FastImage.resizeMode.contain}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._seeDeals}>
                    <View style={{
                        flexDirection: 'row',
                        height: DIMENSION_BUTTON_MEDIUM,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: DIMENSION_PADDING_MEDIUM
                    }}>
                        <Text style={{ color: COLOR_TEXT_BLACK_1, textAlign: 'center', padding: 5, fontSize: DIMENSION_TEXT_CONTENT }}>
                            Xem ưu đãi
                        </Text>
                        <JJIcon name={'chevron_right_o'}
                            size={8}
                            color={COLOR_TEXT_BLACK_1} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _seeDeals = () => {
        this.props.navigation.navigate('BrandDetail', { brand: this.props.brand });
    };

    _onFollowBrandClicked = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'brand_list',
                        action_name: 'click_follow_brand',
                    },
                    action: {
                        name: 'click_follow_brand',
                        category: 'login'
                    }
                });
            return;
        }

        this.props.dispatch(
            followBrand(
                this.props.brand.id,
                this.props.brand.following
            )
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.brand && this.props.brand === undefined) return true;
        if (nextProps.brand === undefined || this.props.brand === undefined) return false;
        if (nextProps.brand.id !== this.props.brand.id) return true;
        if (nextProps.brand.id === this.props.brand.id && nextProps.brand.following !== this.props.brand.following) return true;
        return false;
    }
}

ItemBrandFollowing.propTypes = {
    isHeader: PropsType.bool,
    brand: PropsType.object,
    navigation: PropsType.object
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: "center",
        alignItems: 'center'
    }
});

const mapStateToProps = (state, props) => {
    return {
        isLoginned: state.loginReducer.isLoginned,
    }
};

export default connect(mapStateToProps)(ItemBrandFollowing);