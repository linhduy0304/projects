import React from 'react';
import { Text, Container } from 'native-base';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { strings } from '../../../locates/i18n';
import EmptyView from './EmptyView';
import LoginRequiredView from '../../components/tabwallet/LoginRequiredView';
import { TYPE_SAVED } from '../../const';
import JJHeader from '../../components/common/JJHeader';
import LoadMoreView from '../../components/common/LoadMoreView';
import BigDealItem from '../../components/common/BigDealItem';
import Repository from './Repository';
import DealSavedHeader from './DealSavedHeader';
import { DIMENSION_PADDING_MEDIUM } from '../../resources/dimens';
import { StringUtil } from '../../utils/string-util';

class DanhDau extends Repository {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Container>
                <JJHeader navigation={this.props.navigation} title={'KHUYẾN MÃI ĐÁNH DẤU'} />
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                    {!this.props.isLoginned ? <LoginRequiredView type={TYPE_SAVED} navigation={this.props.navigation} /> : this._renderContent()}
                </View>
            </Container>
        );
    }

    _renderContent() {
        if (
            !this.state.isRefreshing && !this.state.isLoadingMore &&
            (!this.state.data.get('collections') || this.state.data.get('collections').size < 1) &&
            this.state.data.get('deals').size < 1
        ) {
            return <EmptyView onRefresh={this._refresh} onOpenMarketTabSelected={() => this.props.navigation.goBack()} />;
        }
        return this._renderListView();
    }

    _renderListView() {
        return (
            <FlatList
                refreshing={this.state.isRefreshing}
                onRefresh={this._refresh}
                style={{ flex: 1, backgroundColor: '#FAFAFA' }}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                removeClippedSubviews={true}
                data={this.state.data.get('deals').toJS()}
                onEndReachedThreshold={0.5}
                onEndReached={this._onLoadMore}
                keyExtractor={this._generateKeyExtractorItem}
                renderItem={this._renderDeal}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter}
            />
        );
    }

    _renderDeal = ({ item }) => {
        if (item.type !== undefined && item.type !== null && item.type === -1) {
            return <Text style={styles.header}>{strings('wallet.deal_saved.header')}</Text>;
        }

        return (
            <View style={{ paddingBottom: DIMENSION_PADDING_MEDIUM }}>
                <BigDealItem item={item} path={'saved_list'} navigation={this.props.navigation} />
            </View>
        );
    };

    _renderFooter = () => (this.state.hasMore && !this.state.isRefreshing ? <LoadMoreView /> : null);

    _renderHeader = () => (
        <DealSavedHeader
            ref={c => this.refCollection = c}
            navigation={this.props.navigation}
            dealCount={this.state.dealCount}
            collections={this.state.data.get('collections')}
            onUnSaveClicked={this._onUnSaveClicked}
        />
    );

    _generateKeyExtractorItem = (item, index) => `deal_saved_${index}_${item.id}`;

    _onLoadMore = () => {
        if (this.state.isLoadingMore || !this.state.hasMore) return;
        this.setState(
            {
                ...this.state,
                isLoadingMore: true
            },
            () => {
                this._fetchDealSaved();
            }
        );
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isLoginned === false && this.props.isLoginned === true) {
            this._refresh();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!StringUtil.isEmpty(nextProps.dealAction.get('action'))) {
            this._onDealSavingDataChangeDealInfo(nextProps.dealAction);
        }
        if (!StringUtil.isEmpty(nextProps.collectionAction.get('action'))) {
            this._onCollectionSavingDataChangeCollectionInfo(nextProps.collectionAction);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#e5e5e5'
    },
    loadingMore: {
        padding: 20
    },
    header: {
        color: '#666666',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 16,
        backgroundColor: '#e5e5e5'
    }
});

const mapStateToProps = state => {
    return {
        isLoginned: state.loginReducer.isLoginned,
        user: state.loginReducer.user,
        dealAction: state.dealActionReducer,
        collectionAction: state.collectionActionReducer,
    };
};

export default connect(mapStateToProps)(DanhDau);
