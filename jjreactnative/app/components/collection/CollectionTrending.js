import React from 'react'
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types'
import {Dimensions, StyleSheet, View} from "react-native";

import {BaseComponent} from "../common/BaseComponent";
import TrendingCollectionItem from './TrendingCollectionItem'

const width = Dimensions.get("window").width;
const height = width / 2;

export default class CollectionTrending extends BaseComponent {

    render() {
        if (this.props.collections === undefined || this.props.collections === null || this.props.collections.size < 1) return null;

        console.log('CollectionTrending:render', this.props);

        return (
            <Swiper
                width={width}
                height={height}
                autoplay={true}
                autoplayTimeout={6}
                index={0}
                loop={true}
                loadMinimal={true}
                loadMinimalSize={2}
                horizontal={true}
                showsPagination={true}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                paginationStyle={styles.paginationStyle}>

                {
                    !!this.props.collections.get(0) &&
                    <TrendingCollectionItem collection={this.props.collections.get(0).toJS()}
                                            navigation={this.props.navigation}
                                            width={width}
                                            height={height}
                                            key={`trending_collection_item_${this.props.collections.get(0).id}_0`}/>
                }

                {
                    !!this.props.collections.get(1) &&
                    <TrendingCollectionItem collection={this.props.collections.get(1).toJS()}
                                            navigation={this.props.navigation}
                                            width={width}
                                            height={height}
                                            key={`trending_collection_item_${this.props.collections.get(1).id}_1`}/>
                }

                {
                    !!this.props.collections.get(2) &&
                    <TrendingCollectionItem collection={this.props.collections.get(2).toJS()}
                                            navigation={this.props.navigation}
                                            width={width}
                                            height={height}
                                            key={`trending_collection_item_${this.props.collections.get(2).id}_2`}/>
                }
            </Swiper>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.collections && !nextProps.collections.equals(this.props.collections)) return true;
        return false;
    }
}

CollectionTrending.propTypes = {
    collections: PropTypes.any,
    navigation: PropTypes.any
}

const styles = StyleSheet.create({
    dotStyle: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2,
    },
    activeDotStyle: {
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2,
    },
    paginationStyle: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        top: 8,
        right: 8,
    }
});