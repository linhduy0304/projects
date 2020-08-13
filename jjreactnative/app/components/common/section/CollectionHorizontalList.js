import {View, VirtualizedList} from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'

import Section from "../Section";
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import {BaseComponent} from "../BaseComponent";
import CollectionItemHorizontalList from './CollectionItemHorizontalList'
import CollectionHorizontalListPlaceholder from './CollectionHorizontalListPlaceholder'

export default class CollectionHorizontalList extends BaseComponent {

    render() {
        if (
            this.props.collections === undefined ||
            this.props.collections === null ||
            this.props.collections.size < 1)
        {
            return <CollectionHorizontalListPlaceholder/>;
        }
        return (
            <View>
                <Section title={this.props.title}/>
                <VirtualizedList
                    style={{ width: '100%', backgroundColor: '#FAFAFA' }}
                    initialNumToRender={3}
                    maxToRenderPerBatch={5}
                    data={this.props.collections}
                    getItem={this._getCollectionHorizontalItem}
                    getItemCount={this._getCollectionHorizontalCount}
                    keyExtractor={this._collectionHorizontalKeyExtractor}
                    renderItem={this._renderCollectionHorizontalItem}
                    ListFooterComponent={this._renderCollectionHorizontalListFooter}
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                />
            </View>
        )
    }

    _getCollectionHorizontalItem = (data, index) => data.get(index);

    _getCollectionHorizontalCount = (data) => !!data ? data.size : 0;

    _collectionHorizontalKeyExtractor = (item, index) => `collection_horizontal_list_${item.id}_${index}`;

    _renderCollectionHorizontalItem = ({item}) => <CollectionItemHorizontalList
                                                            collection={item}
                                                            onPressed={this.props.onCollectionClicked}
                                                            onSaveClicked={this.props.onSaveCollectionClicked}/>;

    _renderCollectionHorizontalListFooter = () => <View style={{width: DIMENSION_PADDING_MEDIUM}}/>;

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.collections && !nextProps.collections.equals(this.props.collections)) return true;
        if (!!nextProps.title && nextProps.title !== this.props.title) return true;
        return false;
    }
}

CollectionHorizontalList.propTypes = {
    title: PropTypes.any,
    collections: PropTypes.any,
    onCollectionClicked: PropTypes.any,
    onSaveCollectionClicked: PropTypes.any
}
