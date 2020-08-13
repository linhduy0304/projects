import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CollectionItem from '../../../common/CollectionItem'
import {COLOR_GRAY_BG} from '../../../../resources/colors';
import HeaderSection from '../../../common/HeaderSection';
import {BaseComponent} from "../../../common/BaseComponent";
import {DIMENSION_PADDING_LARGE} from "../../../../resources/dimens";

export default class SameCollectionSection extends BaseComponent {

    render() {
        console.log('SameCollectionSection:render')
        const count = this.props.collection.getIn(['meta', 'total_count']);
        if (count > 0) {
            return (
                <View>
                    <View style={{ backgroundColor: 'white' }}>
                        {/* Header */}
                        <HeaderSection
                            title={'Cùng bộ sưu tập khuyến mãi'}
                            onShowAll={count > 3 ? this._goToAllSameCollections : undefined}
                        />
                        {/* List Deal */}
                        <View>
                            {
                                this.props.collection.get('objects').filter((collection, i) => i < 3)
                                    .map((collection, i) => {
                                        return (
                                            <CollectionItem
                                                key={'collection_' + collection.get('id', '')}
                                                path={'dd_col_section'}
                                                collection={collection.toJS()}
                                                navigation={this.props.navigation} />
                                        )
                                })
                            }
                        </View>
                    </View >
                    <View style={{ backgroundColor: COLOR_GRAY_BG, height: DIMENSION_PADDING_LARGE, marginTop: -1.5 }}/>
                </View>
            )
        } else {
            return null;
        }
    }

    _goToAllSameCollections = () => {
        this.props.navigation.push('AllSameCollections', { collections: this.props.collection.get('objects', []).toJS() });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.collection !== undefined && this.props.collection === undefined) return true;
        if (!!this.props.collection && !this.props.collection.equals(nextProps.collection)) return true;
        return false;
    }
}

SameCollectionSection.propTypes = {
    deal: PropTypes.object,
    navigation: PropTypes.object,
    collection: PropTypes.object
}