import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { strings } from '../../../locates/i18n';
import { COLOR_PRIMARY, COLOR_TEXT_BLACK_1 } from '../../resources/colors';
import CollectionSavedItem from './CollectionSavedItem';
import { DIMENSION_PADDING_EXTRA, DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_HEADER_X } from '../../resources/dimens';
import { BaseComponent } from '../../components/common/BaseComponent';
import { Map } from 'immutable';
import { AppConfig } from '../../common/config';

export default class DealSavedHeader extends BaseComponent {
    render() {
        return (
            <View >
                {!!this.props.collections && this.props.collections.size > 0 && (
                    <View>
                        <View
                            style={{
                                paddingLeft: DIMENSION_PADDING_MEDIUM,
                                paddingRight: DIMENSION_PADDING_MEDIUM,
                                paddingBottom: DIMENSION_PADDING_MEDIUM,
                                paddingTop: DIMENSION_PADDING_MEDIUM
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', color: '#454545', fontSize: 18 }}>{strings('label.collection').toUpperCase()}</Text>
                            <View style={{ backgroundColor: COLOR_PRIMARY, width: 62, height: 2, marginTop: 2 }} />
                        </View>
                        <FlatList
                            ref={'flist'}
                            style={{ width: '100%', backgroundColor: '#FAFAFA' }}
                            initialNumToRender={3}
                            maxToRenderPerBatch={3}
                            removeClippedSubviews={!AppConfig.ios}
                            data={this.props.collections.toJS()}
                            horizontal={true}
                            onEndReachedThreshold={0.5}
                            keyExtractor={this._getKeyExtractor}
                            renderItem={this._renderCollectionSavedItem}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}
                {this.props.dealCount > 0 && (
                    <View style={{ padding: DIMENSION_PADDING_MEDIUM, marginTop: DIMENSION_PADDING_EXTRA, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: 'bold', color: COLOR_TEXT_BLACK_1, fontSize: DIMENSION_TEXT_HEADER_X }}>
                            {this.props.dealCount} KHUYẾN MÃI
                        </Text>
                        <View style={{ backgroundColor: COLOR_PRIMARY, width: 62, height: 2, marginTop: 2 }} />
                    </View>
                )}
            </View>
        );
    }

    _renderCollectionSavedItem = ({ item, index }) => {
        if (!item || this.props.collections === undefined || this.props.collections === null) return null;
        const latestItem = index >= this.props.collections.size - 1;
        return (
            <View style={{ paddingLeft: DIMENSION_PADDING_MEDIUM, flexDirection: 'row' }}>
                <CollectionSavedItem collection={item.collection} navigation={this.props.navigation} onUnSaveClicked={this.props.onUnSaveClicked} />
                {latestItem && <View style={{ width: DIMENSION_PADDING_MEDIUM }} />}
            </View>
        );
    };

    _getKeyExtractor = (item, index) => (!!item.collection ? item.collection.id : `collection_${index}`);
    
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.dealCount !== this.props.dealCount) return true;
        if (!!nextProps.collections && (this.props.collections === undefined || !nextProps.collections.equals(this.props.collections))) return true;
        if (nextProps.dealCount !== this.props.dealCount) return true;
        return false;
    }
}

DealSavedHeader.propTypes = {
    collections: PropTypes.object,
    dealCount: PropTypes.number,
    navigation: PropTypes.object,
    onUnSaveClicked: PropTypes.func,
};
