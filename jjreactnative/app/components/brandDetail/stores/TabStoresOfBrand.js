import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import { Text } from 'native-base';
import {View, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {calculateDistance} from "../../../utils/LocationUtils";
import {BasePureComponent} from "../../common/BasePureComponent";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../../resources/dimens";
import {brandApi} from '../../../api/brand-api'
import StoreItem from './StoreItem'

class TabStoresOfBrand extends BasePureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedStoreId: null,
            stores: [],
            isRefreshing: false,
            isLoading: true,
            isSuccess: false
        }
    }

    render() {
        console.log('TabStoresOfBrand:render', this.props)
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff', flexDirection: 'column'}}>
                {this._renderContent()}
            </View>
        )
    }

    componentDidMount() {
        super.componentDidMount();
        this._refreshStores()
    }

    _renderContent = () => {
        if (this.state.isLoading) {
            return <ActivityIndicator
                style={{padding: 24}}
                animating
                size="small" />
        }
        else {
            if (this.state.isSuccess) {
                if (this.state.stores && this.state.stores.length > 0) {
                    return this._renderListView();
                } else {
                    return this._renderNoData();
                }
            }
        }
    }

    _renderListView() {
        return (
            <FlatList
                scrollEventThrottle={1}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingTop: DIMENSION_PADDING_MEDIUM}}
                overScrollMode="never"
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshStores}
                style={{ flex: 1, backgroundColor: '#ffffff'}}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                data={this.state.stores}
                onEndReachedThreshold={0.5}
                keyExtractor={(item, index) => item.id + '_' + index}
                renderItem={this._renderItem}
            />
        )
    }

    _renderItem = ({item}) => {
        return <StoreItem selected={this.state.selectedStoreId && this.state.selectedStoreId === item.id}
                          store={item}
                          latitude={this.props.latitude}
                          longitude={this.props.longitude}
                          onClicked={this._storeClicked}
                          navigation={this.props.navigation}/>
    }

    _renderNoData = () => {
        return (
            <View style={{flex: 1}}>
                <Text style={{
                    color: COLOR_TEXT_INACTIVE,
                    fontSize: DIMENSION_TEXT_CONTENT,
                    padding: DIMENSION_PADDING_MEDIUM
                }}>
                    Danh sách cửa hàng đang được cập nhật!
                </Text>
            </View>
        )
    }

    _refreshStores = () => {
        brandApi.getStoreByBrand(this.props.brand.id)
        .then(response => {
            return this._defineDistance(response);
        })
        .then(responses => {
            console.log('TabStoresOfBrand:_refreshStores:response', responses)
            return this._sortStores(responses)
        })
        .then(listStores =>{
            this.setState({
            ...this.state,
            stores: listStores,
            isLoading: false,
            isRefreshing: false,
            isFail: false,
            isSuccess: true,
            })
        })
        .catch(error => {
            console.log('TabStoresOfBrand:_refreshStores:error:', error);
            this.setState({
                ...this.state,
                isLoading: false,
                isRefreshing: false,
                isSuccess: true
            })
        })
    }
    _defineDistance = (response) =>{
        if(this.props.latitude !== null && this.props.longitude !== null && 
            this.props.latitude !== undefined && this.props.longitude !== undefined){
                const responses =  response.map(store => {
                let distance = calculateDistance(store.latitude, store.longitude, this.props.latitude, this.props.longitude); 
                store.distance = distance
                return responses;
            })
        }
        return response;
    }
    _sortStores = (stores) => {
        return stores.sort(( a , b ) => {
            if(a.distance >= 0 && b.distance >=0 ){ 
                return a.distance - b.distance ;
            }
            if (!a.address || !b.address) return 1;
            return (a.address + '').localeCompare(b.address);
            //
            // if(a.address < b.address) return -1;
            // if(a.address > b.address) return 1;
            // return 0;
        });
    }
    _storeClicked = (store) => {
        this.setState({
            selectedStoreId: store.id
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log('TabStore:componentWillReceiveProps', nextProps);
    }

}

TabStoresOfBrand.propTypes = {
    brand: PropTypes.object,
    navigation: PropTypes.object
}

const mapStateToProps = (state, props) => {
    return {
        latitude: state.locationReducer.getIn(['location', 'latitude']),
        longitude: state.locationReducer.getIn(['location', 'longitude']),
    }
};

export default connect(mapStateToProps)(TabStoresOfBrand);