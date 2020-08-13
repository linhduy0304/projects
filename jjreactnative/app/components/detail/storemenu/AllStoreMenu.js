import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Text, Container, Spinner } from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image'

import {COLOR_GRAY_BG_2, COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from '../../../resources/colors';
import JJHeader from '../../common/JJHeader';
import {storeApi} from '../../../api/store-api'
import {BasePureComponent} from "../../common/BasePureComponent";
import {StringUtil} from '../../../utils/string-util'
import {fromJS} from 'immutable'
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_TINY,
    DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";
import JJIcon from "../../common/JJIcon";
import {NativeCommon} from "../../../common/native/NativeCommon";
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

const { width } = Dimensions.get('window');
const cellWidth = (width) / 3;
const ios = Platform.OS === 'ios';

class AllStoreMenu extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        let stores = undefined;
        if (this.props.navigation.state.params.deal.get('stores') && this.props.navigation.state.params.deal.get('stores').size > 0) {
            stores = this.props.navigation.state.params.deal.get('stores');
        }
        this.state = {
            selectedStore: stores ? stores.get(0) : undefined,
            images: undefined,
            isLoading: true
        };
    }

    render() {
        return (
            <Container>
                {/* Header */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={'MENU'}
                />
                {/* Content View */}
                <View style={{ flex: 1, backgroundColor: 'white' }}>

                    <TouchableOpacity
                        onPress={this._selectStores}
                        style={styles.wrapSelectStore}>

                        <Text style={{ flex: 1, color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT }}>
                            {this.state.selectedStore ? this.state.selectedStore.get('address', '') : ''}
                        </Text>
                        <Text style={{ color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT }}>
                            Đổi cửa hàng
                        </Text>
                        <JJIcon
                            style={{marginLeft: DIMENSION_PADDING_TINY}}
                            name={'chevron_down_o'}
                            size={10}
                            color={COLOR_PRIMARY}/>
                    </TouchableOpacity>

                    {this._renderMainContent()}

                </View>

            </Container >
        )
    }

    _selectStores = () => {
        if (this.props.navigation.state.params.deal.get('stores') && this.props.navigation.state.params.deal.get('stores').size > 0) {
            this.props.navigation.navigate('StorePicker', {
                stores: this.props.navigation.state.params.deal.get('stores'),
                storeSelected: this.state.selectedStore,
                onStoreSelected: this._onStorePickerItemClicked
            })
        }
    }

    _onStorePickerItemClicked = (store) => {
        this.setState({
            ...this.state,
            selectedStore: fromJS(store)
        }, () => {
            this._fetchStoreMenu();
        })
    }

    _renderMainContent = () => {
        if (this.state.isLoading) {
            return this._renderProgress();
        }

        if (this.state.images === undefined || this.state.images.length < 1) {
            return this._renderNoData();
        }
        return this._renderListData();
    }

    _renderListData = () => {
        return (
            <FlatList
                style={{ backgroundColor: 'white' }}
                data={this.state.images}
                numColumns={3}
                keyExtractor={(item, index) => item}
                renderItem={this._renderItem}
            />
        )
    }


    _renderProgress = () => {
        return (
            <View style={styles.containerProgress}>
                <Spinner
                    style={styles.progress}
                    color={'gray'}
                    animating={true}
                    size={'small'} />
            </View>
        )
    }

    _renderNoData = () => {
        return (
            <View style={styles.containerProgress}>
                <Text style={styles.nodata}>
                    Danh sách menu của cửa hàng đang được cập nhật. Mời bạn vui lòng chọn cửa hàng khác hoặc quay lại sau!
                </Text>
            </View >
        )
    }

    _renderItem = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => this._goToImageSlider(index)}
            style={{ height: cellWidth, width: cellWidth, padding: 8 }}>
            <FastImage
                style={styles.image}
                source={buildImageSource(IMAGE_INTERNET, StringUtil.addSizeToImageUrl(item.link, cellWidth))}
                resizeMode={FastImage.resizeMode.contain}/>
        </TouchableOpacity>

    )

    _fetchStoreMenu = () => {
        this.setState({isLoading: true})
        storeApi.getStoreDetail(this.state.selectedStore.get('id'))
            .then(response => {
                console.log('getStoreDetail:success', response);
                this.setState({
                    ...this.state,
                    isLoading: false,
                    images: response.menu_images
                })
            })
            .catch(error => {
                console.log('getStoreDetail:error', error);
                this.setState({
                    ...this.state,
                    isLoading: false,
                    images: undefined
                })
            })
    }

    _goToImageSlider = (position) => {
        if (!ios) {
            return NativeCommon.openImagePreview(this.state.images, position);
        }
        this.props.navigation.navigate("ImageSlider", { images: this.state.images, position: position });
    }

    componentDidMount() {
        super.componentDidMount();
        this._fetchStoreMenu();
    }
}

const styles = StyleSheet.create({
    containerProgress: {
        flex: 1,
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progress: {
        alignSelf: 'center',
        position: 'absolute',
    },
    nodata: {
        padding: 16,
        alignSelf: 'center',
        position: 'absolute',
    },
    wrapSelectStore: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: DIMENSION_PADDING_MEDIUM,
        backgroundColor: COLOR_GRAY_BG_2
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default connect()(AllStoreMenu);