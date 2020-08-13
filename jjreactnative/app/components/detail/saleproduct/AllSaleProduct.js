import {View, FlatList, Dimensions} from 'react-native';
import { Container } from 'native-base';
import React from 'react';

import {COLOR_GRAY_BG} from '../../../resources/colors';
import ErrorView from '../../common/ErrorView';
import JJHeader from '../../common/JJHeader';
import LoadingView from '../../common/LoadingView';
import NoDataView from '../../common/NoDataView';
import {commonApi} from '../../../api/common-api'
import {BasePureComponent} from "../../common/BasePureComponent";
import ProductItem from './ProductItem'
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";

const { width } = Dimensions.get('window');
const cellWidth = ((width - 8 * 3) / 2);
const cellHeight = cellWidth * 1.6;

/**
 * dSlug: deal slug
 */
export default class AllSaleProduct extends BasePureComponent {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            products: [],
        };
    }

    render() {
        return (
            <Container>
                {/* Header */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={'SẢN PHẨM GIẢM GIÁ'}
                />
                {/* Content View */}
                <View style={{ flex: 1, backgroundColor: COLOR_GRAY_BG }}>
                    {this._renderMainContent()}
                </View>

            </Container >
        )
    }

    _renderMainContent = () => {
        if (this.state.isLoading) {
            return <LoadingView />
        }
        if (this.state.isError) {
            return <ErrorView onTryAgain={this._fetchDealProducts} />
        }
        if (!this.state.products || this.state.products.length < 1) {
            return <NoDataView />
        }
        return this._renderListView()
    }

    _renderListView = () => {
        return (
            <FlatList
                data={this.state.products}
                numColumns={2}
                initialNumToRender={4}
                maxToRenderPerBatch={4}
                keyExtractor={this._getItemKeyGenerator}
                renderItem={this._renderItem}
                removeClippedSubviews={true}
                ListFooterComponent={this._renderFooter}
            />
        )
    }

    _renderItem = ({ item, index }) => <ProductItem item={item} onPress={this._onItemPressed} index={index} height={cellHeight} width={cellWidth}/>;

    _renderFooter = () => <View style={{height: DIMENSION_PADDING_MEDIUM}}/>;

    _getItemKeyGenerator = (item, index) => `product_item_${index}_${item.id}`;

    _onItemPressed = (item, index) => {
        this.props.navigation.navigate('SaleProductDetail', { position: index, products: this.state.products })
    }


    _fetchDealProducts = () => {
        this.setState({isLoading: true, isError: false});
        commonApi.getProductList(this.props.navigation.state.params.dSlug, 0, 100)
            .then(response => {
                console.log('getProductList:success', response);
                return response.objects;
            })
            .then(products => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    isError: false,
                    products: products
                })
            })
            .catch(error => {
                console.log('getProductList:error', error);
                this.setState({
                    ...this.state,
                    isLoading: false,
                    isError: true,
                    products: []
                })
            });
    }

    componentDidMount() {
        super.componentDidMount();
        this._fetchDealProducts()
    }
}