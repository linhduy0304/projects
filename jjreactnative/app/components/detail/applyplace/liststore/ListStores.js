import {connect} from 'react-redux';
import {Marker} from 'react-native-maps';
import {Text, Container} from 'native-base';
import {View, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import Communications from 'react-native-communications';
import MapView from 'react-native-maps';
import React from 'react';
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Rect
} from 'react-native-svg';

import {COLOR_TEXT_BLACK_1} from '../../../../resources/colors';
import JJHeader from '../../../common/JJHeader';
import {
    DIMENSION_BUTTON_SMALL, DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT,
} from "../../../../resources/dimens";
import {BasePureComponent} from "../../../common/BasePureComponent";
import {StringUtil} from '../../../../utils/string-util'
import StoreItem from './StoreItem'
import {DEAL_TYPE_MOVIE} from "../../../../const";
import {ObjectUtil} from '../../../../utils/object-utils';

const {width} = Dimensions.get('window');

/**
 * deal
 */
class ListStores extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedStore: undefined,
            stores: []
        }
    }

    render() {

        const {deal} = this.props.navigation.state.params;
        if (this.state.selectedStore === undefined) this.state.selectedStore = this.state.stores.length > 0 ? this.state.stores[0] : undefined;

        const dealType = deal.get('deal_type');

        return (
            <Container>
                {/* Header */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={dealType === DEAL_TYPE_MOVIE ? 'RẠP CHIẾU ÁP DỤNG' : 'CỬA HÀNG ÁP DỤNG'}
                />
                {/* Content View */}
                <View style={{flex: 1, backgroundColor: 'white'}}>

                    <Text style={{
                        paddingLeft: DIMENSION_PADDING_MEDIUM,
                        paddingRight: DIMENSION_PADDING_MEDIUM,
                        paddingTop: DIMENSION_PADDING_SMALL,
                        paddingBottom: DIMENSION_PADDING_SMALL,
                        color: COLOR_TEXT_BLACK_1,
                        fontSize: DIMENSION_TEXT_CONTENT
                    }}>
                        Áp dụng tại {this.state.stores.length}{dealType === DEAL_TYPE_MOVIE ? ' rạp chiếu ' : ' cửa hàng '} tại khu vực
                        <Text style={{fontSize: DIMENSION_TEXT_CONTENT, fontWeight: 'bold'}}>
                            {' ' + this.props.selectedProvinceName}
                        </Text>
                    </Text>

                    <View style={{width: width, height: 145}}>
                        <MapView
                            style={{flex: 1}}
                            region={{
                                latitude: this.state.selectedStore ? this.state.selectedStore.latitude : 0,
                                longitude: this.state.selectedStore ? this.state.selectedStore.longitude : 0,
                                latitudeDelta: 0.0009,
                                longitudeDelta: 0.0005,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: this.state.selectedStore ? this.state.selectedStore.latitude : 0,
                                    longitude: this.state.selectedStore ? this.state.selectedStore.longitude : 0,
                                }}
                                title={this.state.selectedStore ? this.state.selectedStore.address : ''}
                            />
                        </MapView>
                        <Svg style={{
                            position: 'absolute',
                            height: 56,
                            width: '100%',
                            bottom: 0,
                            left: 0
                        }}>
                            <Defs>
                                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="1" stopColor="black" stopOpacity="0.2"/>
                                    <Stop offset="0" stopColor="black" stopOpacity="0"/>
                                </LinearGradient>
                            </Defs>
                            <Rect x="0" y="0" width="100%" height={56} fill="url(#grad)"/>
                        </Svg>
                    </View>

                    {
                        !StringUtil.isBlank(deal.get('online_store')) &&
                        <View style={{
                            paddingLeft: DIMENSION_PADDING_MEDIUM,
                            paddingRight: DIMENSION_PADDING_MEDIUM,
                            paddingTop: DIMENSION_PADDING_SMALL,
                            paddingBottom: DIMENSION_PADDING_SMALL,
                            width: '100%',
                            flexDirection: 'row',
                            backgroundColor: '#ef863b',
                            alignItems: 'center'
                        }}>
                            <Text style={{flex: 1, color: 'white', fontSize: DIMENSION_TEXT_CONTENT}}>
                                Áp dụng cho {dealType === DEAL_TYPE_MOVIE ? ' rạp chiếu ' : ' cửa hàng '} trực tuyến trên hệ thống của {deal.getIn(['brand', 'brand_name'], '')}
                            </Text>
                            <TouchableOpacity style={{
                                height: DIMENSION_BUTTON_SMALL,
                                paddingLeft: DIMENSION_PADDING_SMALL,
                                paddingRight: DIMENSION_PADDING_SMALL,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: 'white',
                                borderWidth: 1,
                                borderRadius: DIMENSION_RADIUS_MEDIUM
                            }}
                                              onPress={this._openOnlineStore}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: DIMENSION_TEXT_CONTENT
                                }}>
                                    Xem web
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <FlatList
                        scrollEventThrottle={1}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingTop: 0}}
                        overScrollMode="never"
                        style={{flex: 1, backgroundColor: '#ffffff'}}
                        initialNumToRender={3}
                        maxToRenderPerBatch={3}
                        data={this.state.stores}
                        onEndReachedThreshold={0.5}
                        keyExtractor={(item, index) => item.id + '_' + index}
                        renderItem={this._renderItem}
                    />

                </View>

            </Container>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        const {deal} = this.props.navigation.state.params;
        if (deal.get('stores') && deal.get('stores').size > 0) {
            this.setState({
                ...this.state,
                stores: deal.get('stores').toJS()
            })
        }
    }

    _renderItem = ({item}) => {
        return (
            <StoreItem navigation={this.props.navigation}
                       store={item}
                       dealType={ObjectUtil.getValue(this.props, {get: () => {}}, ['navigation', 'state', 'params', 'deal']).get('deal_type')}
                       selected={item.id === this.state.selectedStore.id}
                       longitude={this.props.longitude}
                       latitude={this.props.latitude}
                       onItemClicked={this._onStoreClicked}/>
        )
    }

    _onStoreClicked = (store) => {
        this.setState({
            ...this.state,
            selectedStore: store
        })
    }

    _openOnlineStore = () => {
        const {deal} = this.props.navigation.state.params;
        Communications.web(deal.get('online_store', ''))
    }
}

function mapStateToProps(state) {
    return {
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
    };
}


export default connect(mapStateToProps)(ListStores);


