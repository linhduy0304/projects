import React from 'react';
import { Text, Container } from 'native-base';
import {View, StyleSheet, VirtualizedList, TouchableOpacity, TextInput} from 'react-native';
import {connect} from "react-redux";

import ItemBrandFollowing from "./ItemBrandFollowing";
import JJHeader from '../../common/JJHeader';
import LoadingView from '../../common/LoadingView';
import LoadMoreView from '../../common/LoadMoreView';
import {NOT_AVAILABLE_HEADER_TYPE} from '../../../const'
import {
    COLOR_GRAY_BG, COLOR_LINE, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE,
    COLOR_TEXT_INACTIVE_DISABLE
} from "../../../resources/colors";
import JJIcon from "../../common/JJIcon";
import Repository from "./Repository";
import {
    DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT,
} from "../../../resources/dimens";
import {StringUtil} from '../../../utils/string-util'

class TheoDoi extends Repository {

    render() {
        return (
            <Container>
                {/* Toolbar */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={"THEO DÕI THƯƠNG HIỆU"}
                />
                {/* Content */}
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#ffffff'}}>
                    <View style={{height: 50, padding: 8, backgroundColor: COLOR_GRAY_BG, width: '100%', flexDirection: 'row'}}>
                        <View style={styles.input}>
                            <TextInput style={{color: COLOR_TEXT_BLACK_1, padding: 0, margin: 0}}
                                       placeholder={'Tìm thương hiệu'}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(text) => this._searchInputChanged(text)}
                                       placeholderTextColor={COLOR_TEXT_INACTIVE_DISABLE}
                                       returnKeyType={'search'}
                                       autoCapitalize={'none'}
                                       numberOfLines={1}
                                       multiline={false}
                                       value={this.state.query}
                                       editable={!this.state.isRefreshing}
                                       onSubmitEditing={(event) => {
                                           this._refresh();
                                       }}/>
                        </View>

                        <JJIcon style={{position: 'absolute', left: 16, top: 17}}
                                name={'search'}
                                size={14}
                                color={COLOR_TEXT_INACTIVE}/>

                        {
                            !this.state.isRefreshing && this.state.clearInputVisible &&
                            <TouchableOpacity style={{
                                position: 'absolute',
                                top: 10,
                                right: 8,
                                padding: 7
                            }}
                                              onPress={this._onClearInputClicked}
                                              disabled={this.state.isRefreshing}>
                                <JJIcon name={"x_o"}
                                        size={14}
                                        color={'rgba(69, 69, 69, 0.2)'}
                                />
                            </TouchableOpacity>
                        }

                    </View>
                    {this._renderContent()}
                </View>
            </Container>
        )
    }

    _renderContent = () => {
        console.log('===_renderContent', this.state);
        if (!this.state.isLoading && this.state.brands.length <= 0){
            if(StringUtil.isBlank(this.state.query)){
                return this._renderEmptyList();
            }
            return this._renderNoData();
        }
        if (this.state.brands.length < 1 && this.state.isRefreshing) {
            return <LoadingView />
        }
        return <VirtualizedList
            refreshing={this.state.isRefreshing}
            onRefresh={this._refresh}
            style={{flex: 1, backgroundColor: '#ffffff'}}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            data={this.state.brands}
            getItem={this._getBrandItem}
            getItemCount={this._getBrandItemCount}
            onEndReachedThreshold={0.5}
            onEndReached={this._onLoadMoreBrand}
            keyExtractor={this._getBrandFollowKeyExtractor}
            renderItem={this._renderItem}
            ListEmptyComponent={this._renderEmptyList}
            ListFooterComponent={this._renderFooterOfListBrand}
            removeClippedSubviews={true}
        />
    }

    _getBrandItemCount = (data) => !!data ? data.length : 0;

    _getBrandItem = (data, index) => data[index];

    _getBrandFollowKeyExtractor = (item, index) => `brand_follow_item_${item.id}_${index}`;

    _onLoadMoreBrand = () => {
        !!this.state.hasMore && this._fetchBrandUnfollowing();
    }

    _renderFooterOfListBrand = () => !!this.state.hasMore ? <LoadMoreView/> : null;

    _renderEmptyList = () => {
        return (
            <Text style={{color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_CONTENT, padding: DIMENSION_PADDING_MEDIUM}}>
                Danh sách thương hiệu đang được cập nhật!
            </Text>
        )
    }

    _renderNoData = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <View style={{
                    backgroundColor: 'rgba(240, 240, 240, 0.2)',
                    padding: 32,
                    borderRadius: 200,
                    borderWidth: 0.1,
                    borderColor: 'rgba(240, 240, 240, 0.2)',
                }}>
                    <View style={styles.circleNoData}>
                        <View style={styles.circleNoData}>
                            <JJIcon style={{ margin: 8 }} name={"search"} size={48} color={'#999999'} />
                        </View>
                    </View>
                </View>
                <Text style={{fontSize: 14, color: '#454545', padding: 16, marginTop: 8}}>
                    Không tìm thấy kết quả nào cho "
                    <Text style={{fontWeight: 'bold'}}>
                        {this.state.query}
                    </Text>
                    "
                </Text>

            </View>
        )
    }

    _renderItem = ({item, index}) => {
        return (
            <View>
                <ItemBrandFollowing brand={item}
                    navigation={this.props.navigation}
                    isHeader={!!item.row_type && item.row_type === NOT_AVAILABLE_HEADER_TYPE}/>
                <View style={{ height: 1, backgroundColor: COLOR_LINE, marginLeft: DIMENSION_PADDING_MEDIUM }} />
            </View>
            )
    }

    _searchInputChanged = (text) => {
        console.log('search: ' + text);
        this.setState({
            clearInputVisible: !StringUtil.isBlank(text),
            query: text
        });
    };

    _onClearInputClicked = () => {
        this.setState({
            clearInputVisible: false,
            query: ''
        }, () => {
            this._refresh();
        });
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: "center",
        alignItems: 'center'
    },
    centerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingMore: {
        padding: 20
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderColor: COLOR_GRAY_BG,
        backgroundColor: '#ffffff',
        paddingLeft: 24,
        paddingRight: 16,
        justifyContent: 'center'
    },
    circleNoData: {
        padding: 16,
        backgroundColor: 'rgba(240, 240, 240, 0.3)',
        borderRadius: 200,
        borderWidth: 0.1,
        borderColor: 'rgba(240, 240, 240, 0.3)'
    }
});

const mapStateToProps = (state, props) => {
    return {
        isLoginned: state.loginReducer.isLoginned,
        //deal action dispatcher
        dealAction: state.dealActionReducer,
    }
};

export default connect(mapStateToProps)(TheoDoi);