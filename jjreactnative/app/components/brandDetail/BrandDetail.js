import React from "react";
import {Platform, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Tab, Tabs, ScrollableTab, Container, Text} from 'native-base';
import FastImage from 'react-native-fast-image'

import JJIcon from '../common/JJIcon';
import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import TabAboutBrand from './about/TabAboutBrand'
import TabStoresOfBrand from './stores/TabStoresOfBrand'
import TabDealsOfBrand from './deals/TabDealsOfBrand'
import {StringUtil} from '../../utils/string-util'
import {brandApi} from '../../api/brand-api'
import JJHeader from '../common/JJHeader'
import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_TEXT_CONTENT} from "../../resources/dimens";
import DividerLine from "../common/DividerLine";
import JJStatusBar from "../common/view/JJStatusBar";
import {getPaddingTopBar} from "../../utils/common-utils";
import {buildImageSource, IMAGE_INTERNET} from "../../utils/image-util";

const paddingTopBar = getPaddingTopBar();

export default class BrandDetail extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            brand: props.navigation.state.params.brand
        }
    }

    render() {
        const brand = this.state.brand;
        if (StringUtil.isEmpty(brand)) return this._renderLoadingBrand();

        const brandName = brand ? brand.brand_name : '';
        const brandImage = brand ? brand.image : '';

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffffff',
                flexDirection: 'column',
                paddingTop: paddingTopBar
            }}>
                <JJStatusBar/>
                <View style={{flexDirection: 'column', height: 56, width: '100%'}}>
                    <View
                        style={{
                            flex: 1,
                            paddingLeft: 56,
                            paddingRight: 56,
                            paddingTop: 8,
                            paddingBottom: 8
                        }}>
                        <FastImage
                            source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(brandImage, 0, 40))}
                            style={{height: 40, width: undefined}}
                            resizeMode={FastImage.resizeMode.contain}/>
                    </View>

                    <TouchableOpacity
                        style={{
                            height: 56,
                            width: 56,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            left: 0,
                            top: 0
                        }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <JJIcon
                            style={{marginBottom: Platform.OS === 'ios' ? 4 : 0}}
                            name={'chevron_left_o'}
                            color={'gray'}
                            size={16}/>
                    </TouchableOpacity>
                </View>

                <DividerLine/>

                <View style={{height: 86, flexDirection: 'column'}}>
                    <FastImage
                        source={require('../../resources/images/ic_store_common.png')}
                        style={{height: 54, width: undefined, marginTop: DIMENSION_PADDING_SMALL}}
                        resizeMode={FastImage.resizeMode.contain}/>

                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        width: '100%',
                        textAlign: 'center',
                        color: '#454545'
                    }}>
                        {brandName}
                    </Text>
                </View>

                <Tabs renderTabBar={()=> <ScrollableTab backgroundColor={'white'}
                                                        tabsContainerStyle={{paddingLeft: 0, paddingRight: 0}}
                                                        style={{borderWidth: 0, borderColor: 'white'}}/>}
                      initialPage={0}
                      tabBarUnderlineStyle={{backgroundColor: COLOR_PRIMARY, height: 2}}
                      tabStyle={{backgroundColor: 'white'}}>

                    <Tab heading="Ưu Đãi">
                        <TabDealsOfBrand brand={brand}
                                         navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="Cửa Hàng">
                        <TabStoresOfBrand brand={brand}
                                          navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="Thương Hiệu">
                        <TabAboutBrand brand_id={brand ? brand.id : ''}
                                       navigation={this.props.navigation}/>
                    </Tab>
                </Tabs>
            </View>
        );
    }

    componentDidMount() {
        if (!StringUtil.isEmpty(this.state.brand)) return;
        if (StringUtil.isEmpty(this.props.navigation.state.params.slug)) {
            alert('Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!');
            return;
        }
        this._fetchBrand();
    }

    _renderLoadingBrand = () => {
        return (
            <Container>
                {/* Header */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={'CHI TIẾT THƯƠNG HIỆU'}
                />

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color={COLOR_PRIMARY} animating={true} size={'small'}/>
                    <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT, padding: DIMENSION_PADDING_MEDIUM}}>
                        Đang tải dữ liệu...
                    </Text>
                </View>
            </Container>
        )
    }

    _fetchBrand = () => {
        brandApi.getBrandDetailBySlug(this.props.navigation.state.params.slug)
            .then(response => {
                this.setState({
                    brand: response
                })
            })
            .catch(error => {
                console.log(error);
                alert('Có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại sau!');
            })
    }
}
