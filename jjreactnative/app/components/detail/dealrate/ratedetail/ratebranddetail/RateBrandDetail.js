import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Container } from 'native-base';
import DividerLine from '../../../../common/DividerLine';
import RateBrandItem from './RateBrandItem';
import {COLOR_GRAY_BG, COLOR_TEXT_INACTIVE} from '../../../../../resources/colors';
import { connect } from 'react-redux';

import PropTypes from 'prop-types'
import LoadMoreView from "../../../../common/LoadMoreView";
import ErrorView from "../../../../common/ErrorView";
import {dealApi} from '../../../../../api/deal-api'
import LoadingView from "../../../../common/LoadingView";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_TEXT_CONTENT,
} from "../../../../../resources/dimens";
import {BaseComponent} from "../../../../common/BaseComponent";
import RateHeader from "../RateHeader";

const ITEM_LIMIT = 20;

class RateBrandDetail extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isSuccess: false,
            isFail: false,
            isRefreshing: false,
            hasMore: false,
            meta: {},
            rateList: [],
        };
    }

    render() {
        return (
            <Container>
                {/* Content */}
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {this._renderMainContent()}
                </View>
            </Container >
        )
    }

    _renderMainContent = () => {
        if (this.state.isLoading) {
            return <LoadingView />
        } else {
            if (this.state.isSuccess) {
                return this._renderData();
            } else {
                return <ErrorView />;
            }
        }
    }

    _renderData = () => {
        return (
            <FlatList
                scrollEventThrottle={1}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop: 0}}
                overScrollMode="never"
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshData}
                style={{ flex: 1, backgroundColor: '#ffffff'}}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                data={this.state.rateList}
                onEndReached={this._loadMore}
                onEndReachedThreshold={0.5}
                keyExtractor={this._keyGenerator}
                ListHeaderComponent={this._renderHeader}
                ItemSeparatorComponent={this._renderItemSeparator}
                renderItem={this._renderItem}
                ListFooterComponent={this._renderFooter}/>
        )
    }

    _keyGenerator = (item, index) => `rate_by_brand_${item.id}_${index}`;

    _renderItemSeparator = () => <DividerLine style={{marginLeft: DIMENSION_PADDING_MEDIUM, marginRight: DIMENSION_PADDING_MEDIUM}}/>;

    _renderHeader = () => <RateHeader brandName={!!this.props.deal && !!this.props.deal.brand ? this.props.deal.brand.brand_name : ''} meta={this.state.meta}/>;

    _renderItem = ({item, index}) => <RateBrandItem key={'brand_rate_item_' + item.id} deal={this.props.deal} rate={item} navigation={this.props.navigation} />;

    _renderFooter = () => {
        return (
            <View>
                {
                    this.state.hasMore &&
                    <LoadMoreView />
                }
                <View style={{ padding: DIMENSION_PADDING_MEDIUM, backgroundColor: COLOR_GRAY_BG }}>
                    <Text style={{ color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_CONTENT }}>
                        Còn {this.state.meta.comment_without_rate} đánh giá khác đã được ẩn đi do người đánh giá chỉ cho điểm mà không chia sẻ trải nghiệm của mình về khuyến mãi.
                    </Text>
                </View>
            </View>
        )
    }

    _refreshData = () => {
        this._fetchData(true);
    }

    _loadMore = () => {
        this._fetchData(false);
    }

    _fetchData = (refresh) => {
        if (!refresh && !this.state.hasMore) return;
        dealApi.getJAMJARateByBrand(this.props.deal.brand.id, refresh ? 0 : this.state.rateList.length, ITEM_LIMIT)
            .then(result => {
                console.log(result)
                if (result !== undefined && result.objects !== undefined) {
                    if (refresh) {
                        this.state.rateList = result.objects;
                    } else {
                        this.state.rateList.push(...result.objects);
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

    componentDidMount() {
        super.componentDidMount();
        this._refreshData();
    }
}

RateBrandDetail.propTypes = {
    deal: PropTypes.object,
    navigation: PropTypes.object
}

function mapStateToProps(state) {
    return {
        user: state.loginReducer.user,
        isLoginned: state.loginReducer.isLoginned,
    };
}

export default connect(mapStateToProps)(RateBrandDetail);

