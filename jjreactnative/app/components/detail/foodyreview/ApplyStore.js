import { connect } from 'react-redux';
import { Text, Container } from 'native-base';
import { View, StyleSheet, Image, FlatList, RefreshControl, TouchableOpacity, Easing } from 'react-native';
import Popover from 'react-native-popover-view'
import React, { Component } from 'react';

import {calculateDistance} from '../../../utils/LocationUtils';
import DividerLine from '../../common/DividerLine';
import ErrorView from '../../common/ErrorView';
import LoadingView from '../../common/LoadingView';
import NoDataView from '../../common/NoDataView';
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY, DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_HEADER, DIMENSION_TEXT_SUB
} from "../../../resources/dimens";
import JJIcon from "../../common/JJIcon";
import {COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";

import PropTypes from 'prop-types'
import LoadMoreView from "../../common/LoadMoreView";
import {dealApi} from '../../../api/deal-api'

type Props = {
    deal?: PropTypes.object,
    navigation?: PropTypes.object
}

const ITEM_LIMIT = 20;

class ApplyStore extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSuccess: false,
            isFail: false,
            isRefreshing: false,
            hasMore: false,
            meta: {},
            stores: [],
            selectedView: undefined,
            isShowPopover: false,
            selectedStore: undefined,
        };
    }

    render() {
        return (
            <Container>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Popover
                        popoverStyle={{ backgroundColor: '#0a7feb' }}
                        isVisible={this.state.isShowPopover}
                        placement={'top'}
                        showBackground={false}
                        fromView={this.state.selectedView}
                        animationConfig={{ easing: Easing.inOut(Easing.ease) }}
                        onClose={() => {
                            this.setState({
                                ...this.state,
                                isShowPopover: false
                            })
                        }}>
                        {this.renderPopoverViewIfNeed()}
                    </Popover>
                    {this.renderMainContent()}
                </View>
            </Container >
        )
    }

    componentDidMount() {
        this.fetchData(true)
    }

    renderPopoverViewIfNeed = () => {
        const average_location = this.state.selectedStore !== undefined ? this.state.selectedStore.average_location : '_._'
        const average_price = this.state.selectedStore !== undefined ? this.state.selectedStore.average_price : '_._'
        const average_quality = this.state.selectedStore !== undefined ? this.state.selectedStore.average_quality : '_._'
        const average_services = this.state.selectedStore !== undefined ? this.state.selectedStore.average_services : '_._'
        const average_decor = this.state.selectedStore !== undefined ? this.state.selectedStore.average_decor : '_._'
        return (
            <View style={{
                padding: 16,
                borderRadius: DIMENSION_RADIUS_MEDIUM,
                alignItems: 'flex-end'
            }}>
                <Text style={styles.popoverText}>Vị trí  <Text style={styles.valueText}>{average_location}</Text></Text>
                <Text style={styles.popoverText}>Giá cả  <Text style={styles.valueText}>{average_price}</Text></Text>
                <Text style={styles.popoverText}>Chất lượng  <Text style={styles.valueText}>{average_quality}</Text></Text>
                <Text style={styles.popoverText}>Dịch vụ  <Text style={styles.valueText}>{average_services}</Text></Text>
                <Text style={styles.popoverText}>Không gian  <Text style={styles.valueText}>{average_decor}</Text></Text>
            </View>
        )
    }

    renderMainContent = () => {
        if (this.state.isLoading) {
            return <LoadingView />
        } else {
            if (this.state.isSuccess) {
                if (this.state.stores && this.state.stores.length > 0) {
                    return this.renderData();
                } else {
                    return <NoDataView />
                }
            } else {
                return <ErrorView />;
            }
        }
    }

    renderData = () => {
        return (
            <FlatList
                scrollEventThrottle={1}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop: 0}}
                overScrollMode="never"
                refreshing={this.state.isRefreshing}
                onRefresh={this.refreshData}
                style={{ flex: 1, backgroundColor: '#ffffff'}}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                data={this.state.stores}
                onEndReached={this._loadMore}
                onEndReachedThreshold={0.5}
                keyExtractor={(item, index) => item.id + '_' + index}
                ListHeaderComponent={this._renderHeader}
                ItemSeparatorComponent={() => <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>}
                renderItem={this._renderItem}
                ListFooterComponent={this._renderFooter}/>
        )
    }

    _renderHeader = () =>  {
        const { deal } = this.props;
        const rate = this.round(deal.foody_review.point, 1).toFixed(1);
        return (
            <View>
                {/* Brand Name */}
                <Text style={styles.brandName}>
                    {deal.brand.brand_name}
                </Text>
                {/* Number rate */}
                <View style={styles.rateWrapper}>
                    <View style={[styles.buttonRate, {backgroundColor: rate >= 6 ? '#03ae03' : '#e52402'}]}>
                        <JJIcon name={"star_full"} size={16} color='white' />
                        <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_HEADER, fontWeight: 'bold' }}>
                            {rate}
                         </Text>
                        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: DIMENSION_TEXT_SUB }}>
                            /10
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT }}>
                            {this.state.meta.total_review_count} đánh giá
                        </Text>
                        <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB }}>
                            Cho {this.state.stores.length} cửa hàng áp dụng khuyến mãi
                        </Text>
                    </View>
                </View>

                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: DIMENSION_PADDING_MEDIUM }}>
                    <View style={styles.metaWrap}>
                        <Text style={styles.metaTitle}>
                            Vị trí
                        </Text>
                        <Text style={[styles.metaValue, {color: this.state.meta.average_location >= 6 ? '#03ae03' : '#e52402'}]}>
                            {this.state.meta.average_location}
                        </Text>
                    </View>

                    <View style={styles.metaWrap}>
                        <Text style={styles.metaTitle}>
                            Giá cả
                        </Text>
                        <Text style={[styles.metaValue, {color: this.state.meta.average_price >= 6 ? '#03ae03' : '#e52402'}]}>
                            {this.state.meta.average_price}
                        </Text>
                    </View>

                    <View style={styles.metaWrap}>
                        <Text style={styles.metaTitle}>
                            Chất lượng
                        </Text>
                        <Text style={[styles.metaValue, {color: this.state.meta.average_quality >= 6 ? '#03ae03' : '#e52402'}]}>
                            {this.state.meta.average_quality}
                        </Text>
                    </View>

                    <View style={styles.metaWrap}>
                        <Text style={styles.metaTitle}>
                            Dịch vụ
                        </Text>
                        <Text style={[styles.metaValue, {color: this.state.meta.average_services >= 6 ? '#03ae03' : '#e52402'}]}>
                            {this.state.meta.average_services}
                        </Text>
                    </View>

                    <View style={styles.metaWrap}>
                        <Text style={styles.metaTitle}>
                            Không gian
                        </Text>
                        <Text style={[styles.metaValue, {color: this.state.meta.average_decor >= 6 ? '#03ae03' : '#e52402'}]}>
                            {this.state.meta.average_decor}
                        </Text>
                    </View>
                </View>
                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>
                <Text style={styles.description}>
                    Điểm đánh giá qua Foody trên đây là điểm đánh giá trung bình của
                    {' ' + this.state.stores.length + ' '}
                    cửa hàng áp dụng khuyến mãi trên JAMJA từ thương hiệu
                    {' ' + deal.brand.brand_name + ' '}
                    tại
                    {' ' + this.props.selectedProvinceName}
                </Text>
                <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>
            </View>
        )
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: DIMENSION_PADDING_MEDIUM }}>
                <View style={{ flex: 1 , paddingRight: DIMENSION_PADDING_SMALL}}>
                    {this.renderStoreNameIfHave(item)}
                    <Text style={{ marginBottom: DIMENSION_PADDING_TINY, marginTop: DIMENSION_PADDING_TINY, fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1 }}>
                        {item.address}
                    </Text>
                    <Text style={{ fontSize: DIMENSION_TEXT_SUB, color: COLOR_TEXT_BLACK_1 }}>
                        {this.calculateDistance(item)}
                    </Text>
                </View>
                {this.displayRateValueIfHave(item, index)}
            </View>
        )
    }

    _renderFooter = () => {
        if (!this.state.hasMore) {
            return null;
        } else {
            return <LoadMoreView />
        }
    }


    renderStoreNameIfHave(item) {
        if (item.foody_restaurant_review && item.foody_restaurant_review.length > 0) {
            return <Text style={{ fontWeight: 'bold' }}>{item.foody_restaurant_review[0].store_name}</Text>
        } else {
            return null
        }
    }

    calculateDistance(item) {
        if (this.props.latitude !== null) {
            return `${calculateDistance(item.latitude, item.longitude, this.props.latitude, this.props.longitude)} km`;
        } else {
            return null
        }
    }

    displayRateValueIfHave(item, index) {
        if (item.foody_restaurant_review && item.foody_restaurant_review.length > 0) {
            const store = item.foody_restaurant_review[0]
            const avg = (Number(store.average_decor) + Number(store.average_location) + Number(store.average_price) + Number(store.average_quality) + Number(store.average_services)) / 5
            const value = this.round(avg, 1).toFixed(1);
            if (value <= 0) return this._renderEmptyRatePoint();
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            ...this.state,
                            selectedView: this[`circleButton${index}`],
                            isShowPopover: true,
                            selectedStore: item.foody_restaurant_review.length > 0 ? item.foody_restaurant_review[0] : undefined,
                        })
                    }}
                    ref={button => {
                        this[`circleButton${index}`] = button;
                    }}
                    style={[styles.circleValue, {backgroundColor: value >= 6 ? '#03ae03' : '#e52402' }]}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER }}>
                        {value}
                    </Text>
                </TouchableOpacity>
            )
        }

        return this._renderEmptyRatePoint();
    }

    _renderEmptyRatePoint = () => {
        return (
            <View style={[styles.circleValue, {backgroundColor: '#03ae03' }]}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: DIMENSION_TEXT_HEADER }}>
                    _._
                </Text>
            </View>
        )
    }

    refreshData = () => {
        this.fetchData(true);
    }

    _loadMore = () => {
        this.fetchData(false);
    }

    fetchData = (refresh) => {
        if (!refresh && !this.state.hasMore) return;
        dealApi.getFoodyReviewByDeal(this.props.deal.id, refresh ? 0 : this.state.stores.length, ITEM_LIMIT)
            .then(result => {
                console.log(result)
                if (result !== undefined && result.objects !== undefined) {
                    if (refresh) {
                        this.state.stores = result.objects;
                    } else {
                        this.state.stores.push(...result.objects);
                    }
                    this.setState({
                        ...this.state,
                        isLoading: false,
                        isRefreshing: false,
                        isFail: false,
                        isSuccess: true,
                        hasMore: result.objects.length >= ITEM_LIMIT,
                        meta: result.meta,
                    })
                } else {
                    this.setState({
                        ...this.state,
                        isLoading: false,
                        isRefreshing: false,
                    })
                }
            }).catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    isLoading: false,
                    isRefreshing: false,
                })
            })
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
}

function mapStateToProps(state) {
    return {
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
        selectedProvinceName: state.locationReducer.getIn(['province', 'name'], ''),
    };
}

export default connect(mapStateToProps)(ApplyStore);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowRate: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8
    },
    brandName: {
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        paddingTop: DIMENSION_PADDING_MEDIUM,
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_CONTENT,
        color: COLOR_TEXT_BLACK_1
    },
    buttonRate: {
        flexDirection: 'row',
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: DIMENSION_PADDING_SMALL,
        paddingBottom: DIMENSION_PADDING_SMALL,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
    },
    rateWrapper: {
        flexDirection: 'row',
        padding: DIMENSION_PADDING_MEDIUM,
        alignItems: 'center'
    },
    metaWrap: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    metaTitle: {
        color: COLOR_TEXT_INACTIVE,
        marginBottom: DIMENSION_PADDING_TINY,
        fontSize: DIMENSION_TEXT_SUB
    },
    metaValue: {
        fontWeight: 'bold',
        fontSize: DIMENSION_TEXT_HEADER
    },
    description: {
        padding: DIMENSION_PADDING_MEDIUM,
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_SUB,
        textAlign: 'justify'
    },
    circleValue: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popoverText: {
        color: 'white',
        marginBottom: 8,
    },
    valueText: {
        fontWeight: 'bold',
        color: 'white'
    }
});

