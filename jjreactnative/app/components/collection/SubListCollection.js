import { View, Dimensions, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import CircleCategory from "../../components/common/CircleCategory";
import {DIMENSION_PADDING_LARGE, DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import {BaseComponent} from "../../components/common/BaseComponent";

class SubListCollection extends BaseComponent {

    render() {
        console.log('SubListCollection:render', this.props);
        if (this.props.sublist === undefined || this.props.sublist === null) return null;
        return (
            <View style={{marginTop: DIMENSION_PADDING_MEDIUM, marginBottom: DIMENSION_PADDING_LARGE}}>
                <FlatList
                    style={{ width: '100%', backgroundColor: '#FAFAFA' }}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={this.props.sublist.toJS()}
                    horizontal={true}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item, index) => 'collection_sub_list_' + index}
                    ListHeaderComponent={<View style={{width: DIMENSION_PADDING_MEDIUM}}/>}
                    ListFooterComponent={<View style={{width: DIMENSION_PADDING_MEDIUM}}/>}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    _renderItem = ({item}) => {
        return (
            <CircleCategory
                navigation={this.props.navigation}
                key={'collection_sub_' + item.name}
                onPress={() => this._goToSubCollection(item)}
                style={styles.category}
                uri={item.icon}
                name={item.name} />
        )
    }

    _goToSubCollection = (sub) => {
        this.props.navigation.push('Collections', {
            name: sub.name,
            tags: sub.tags
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.sublist && !nextProps.sublist.equals(this.props.sublist)) return true;
        return false;
    }
}

SubListCollection.propTypes = {
    sublist: PropTypes.any,
    navigation: PropTypes.any,
}

const styles = StyleSheet.create({
    category: {
        marginRight: 24,
    },
    icon: {
        marginTop: 3,
    }
});

export default SubListCollection;
