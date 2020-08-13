import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {Text} from "native-base";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Communications from "react-native-communications";

import {
    COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE
} from "../../../resources/colors";
import {BasePureComponent} from "../../common/BasePureComponent";
import {
    DIMENSION_BUTTON_MEDIUM,
    DIMENSION_PADDING_LARGE,
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import {brandApi} from '../../../api/brand-api'
import {StringUtil} from '../../../utils/string-util'
import {CommonUtil} from "../../../utils/common-utils";
import JJIcon from "../../common/JJIcon";
import {followBrand} from "../../detail/action";

class TabAboutBrand extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            brand: undefined,
            isLoading: true,
            isFail: false
        }
    }

    render() {

        if (this.state.isLoading) {
            return <ActivityIndicator
                style={{padding: 24}}
                animating
                size="small"/>
        }

        if (this.state.isFail) {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: COLOR_GRAY_BG,
                    padding: DIMENSION_PADDING_MEDIUM,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}>
                        Có lỗi xảy ra trong quá trình xử lý!
                    </Text>
                    <TouchableOpacity style={{
                        height: DIMENSION_BUTTON_MEDIUM,
                        paddingLeft: DIMENSION_PADDING_MEDIUM,
                        paddingRight: DIMENSION_PADDING_MEDIUM,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        backgroundColor: COLOR_PRIMARY,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: DIMENSION_PADDING_MEDIUM
                    }}
                    onPress={this._fetchBrandInfo}>
                        <Text style={{fontSize: DIMENSION_TEXT_HEADER, color: 'white'}}>
                            THỬ LẠI
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <ScrollView
                style={{
                    backgroundColor: COLOR_GRAY_BG
                }}
                scrollEventThrottle={1}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop: 0}}
                overScrollMode="never">

                <View style={styles.content}>
                    <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT}}>Mức giá</Text>
                    <Text style={[styles.dollar, {
                        color: this.state.brand.price.length >= 1 ? COLOR_PRIMARY : '#ededed',
                        borderColor: this.state.brand.price.length >= 1 ? COLOR_PRIMARY : '#ededed'
                    }]}>
                        $
                    </Text>
                    <Text style={[styles.dollar, {
                        color: this.state.brand.price.length >= 2 ? COLOR_PRIMARY : '#ededed',
                        borderColor: this.state.brand.price.length >= 2 ? COLOR_PRIMARY : '#ededed'
                    }]}>
                        $
                    </Text>
                    <Text style={[styles.dollar, {
                        color: this.state.brand.price.length >= 3 ? COLOR_PRIMARY : '#ededed',
                        borderColor: this.state.brand.price.length >= 3 ? COLOR_PRIMARY : '#ededed'
                    }]}>
                        $
                    </Text>
                    <Text style={[styles.dollar, {
                        color: this.state.brand.price.length >= 4 ? COLOR_PRIMARY : '#ededed',
                        borderColor: this.state.brand.price.length >= 4 ? COLOR_PRIMARY : '#ededed'
                    }]}>
                        $
                    </Text>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity onPress={this._onWebsiteClicked}
                                      style={{
                                          borderColor: COLOR_PRIMARY,
                                          borderWidth: 1,
                                          height: DIMENSION_BUTTON_MEDIUM,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          borderRadius: DIMENSION_RADIUS_MEDIUM,
                                          paddingLeft: DIMENSION_PADDING_LARGE,
                                          paddingRight: DIMENSION_PADDING_LARGE,
                                      }}>
                        <JJIcon name={'online_web_o'}
                                color={COLOR_PRIMARY}
                                size={14}/>
                        <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT, paddingLeft: 4}}>
                            Website
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onFollowBrandClicked}
                                      style={{
                                          marginLeft: DIMENSION_PADDING_MEDIUM,
                                          borderColor: this.state.brand.following ? COLOR_PRIMARY : '#999999',
                                          borderWidth: 1,
                                          height: DIMENSION_BUTTON_MEDIUM,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          flexDirection: 'column',
                                          borderRadius: DIMENSION_RADIUS_MEDIUM,
                                          paddingLeft: DIMENSION_PADDING_LARGE,
                                          paddingRight: DIMENSION_PADDING_LARGE,
                                      }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <JJIcon name={'plus_o'}
                                    color={this.state.brand.following ? COLOR_PRIMARY : '#999999'}
                                    size={12}/>

                            <Text style={{
                                color: this.state.brand.following ? COLOR_PRIMARY : '#999999',
                                fontSize: DIMENSION_TEXT_CONTENT,
                                paddingLeft: 4
                            }}>
                                Theo dõi
                            </Text>
                        </View>
                        <Text style={{
                            color: this.state.brand.following ? COLOR_PRIMARY : '#999999',
                            fontSize: DIMENSION_TEXT_SUB,
                            paddingLeft: 4
                        }}>
                            {StringUtil.numberFormat(this.state.brand.follower)} lượt theo dõi
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{padding: DIMENSION_PADDING_MEDIUM, fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}>
                    Tag
                </Text>
                <View style={[styles.content, {marginTop: 0}]}>
                    {this._renderTags()}
                </View>
                <Text style={{padding: DIMENSION_PADDING_MEDIUM, fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}>
                    Điểm nổi bật
                </Text>
                <View style={[styles.content, {marginTop: 0}]}>
                    <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: '#999999'}}>
                        {this.state.brand.brand_desc}
                    </Text>
                </View>
                <View style={{height: 50}}/>
            </ScrollView>

        )
    }

    componentDidMount() {
        super.componentDidMount();
        this._fetchBrandInfo()
    }

    _renderTags = () => {
        const tag = !!this.state.brand.tags ? CommonUtil.getBrandTags(this.state.brand.tags) : undefined;
        if (StringUtil.isEmpty(tag)) return this._renderEmptyTag();
        try {
            const tagList = tag.split(',');
            if (tagList.length < 1) return this._renderEmptyTag();

            return (
                <View style={{flexDirection: 'row'}}>
                    {
                        tagList.map((t, index) => (
                            <Text style={styles.tag} key={`brand_tag_${index}_${t}`}>
                                {t}
                            </Text>
                        ))
                    }
                </View>
            )

        } catch (error) {
            console.log(error);
            return this._renderEmptyTag();
        }
    }

    _renderEmptyTag = () => {
        return (
            <Text style={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_INACTIVE_DISABLE}}>
                (hiện chưa có dữ liệu)
            </Text>
        )
    }

    _fetchBrandInfo = () => {
        this.setState({
            ...this.state,
            isLoading: true,
            isFail: false
        });
        brandApi.getBrandDetail(this.props.brand_id)
            .then(response => {
                console.log('_fetchBrandInfo:response', response);
                this.setState({
                    ...this.state,
                    brand: response,
                    isLoading: false,
                    isFail: false
                })
            })
            .catch(error => {
                console.log('_fetchBrandInfo:error', error);
                this.setState({
                    ...this.state,
                    brand: undefined,
                    isLoading: false,
                    isFail: true
                })
            })
    }

    _onWebsiteClicked = () => {
        Communications.web(this.state.brand.url)
    }

    _onFollowBrandClicked = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'tab_brand_info',
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
                this.props.brand_id,
                this.state.brand.following
            )
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log('TabAbountBrand:componentWillReceiveProps', nextProps, this.state);
        if (nextProps.dealAction.get('action') === 'follow_brand' && nextProps.dealAction.get('brand_id') === this.props.brand_id) {
            let brand = this.state.brand;
            if (!brand) return;

            if (brand.following !== nextProps.dealAction.get('following', false)) {
                brand.following = nextProps.dealAction.get('following');

                if (!brand.follower) brand.follower = 0;

                if (nextProps.dealAction.get('following') === false) {
                    brand.follower = brand.follower - 1;
                } else {
                    brand.follower = brand.follower + 1;
                }
                this.setState({
                    ...this.state,
                    brand
                });
            }
        }
    }
}

TabAboutBrand.propTypes = {
    brand_id: PropTypes.string,
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#ffffff',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    dollar: {
        borderRadius: 7,
        borderWidth: 1,
        overflow: 'hidden',
        width: 14,
        height: 14,
        fontSize: 8,
        padding: 1,
        textAlign: 'center',
        marginLeft: 8
    },
    tag: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_SUB,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        borderColor: COLOR_TEXT_INACTIVE,
        paddingLeft: DIMENSION_PADDING_SMALL,
        paddingRight: DIMENSION_PADDING_SMALL,
        marginRight: DIMENSION_PADDING_SMALL
    }
})

const mapStateToProps = (state, props) => {
    return {
        user: state.loginReducer.user,
        isLoginned: state.loginReducer.isLoginned,

        //deal action dispatcher
        dealAction: state.dealActionReducer,
    }
};

export default connect(mapStateToProps)(TabAboutBrand);