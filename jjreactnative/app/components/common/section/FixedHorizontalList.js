import {View, FlatList, Dimensions} from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'

import Section from "../Section";
import FixedHorizontalItem from "./FixedHorizontalItem";
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import {BaseComponent} from "../BaseComponent";

const { width } = Dimensions.get('window');
const itemWidth = width - 80;
const itemHeight = width / 2.5;

class FixedHorizontalList extends BaseComponent {

    render() {
        return (
            <Section title={this.props.title}>
                <FlatList
                    style={{ width: '100%', backgroundColor: '#FAFAFA' }}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={this.props.deals.toJS()}
                    horizontal={true}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item, index) => 'FixedHorizontalList_' + item.id + '_' + index}
                    renderItem={this._renderItem}
                    ListFooterComponent={<View style={{width: DIMENSION_PADDING_MEDIUM}}/>}
                    showsHorizontalScrollIndicator={false}
                />
            </Section>
        )
    }

    _renderItem = ({item}) => {
        return (
            <FixedHorizontalItem navigation={this.props.navigation}
                                 path={this.props.path}
                                 width={itemWidth}
                                 height={itemHeight}
                                 deal={item}/>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.deals && !nextProps.deals.equals(this.props.deals)) return true;
        if (!!nextProps.title && nextProps.title !== this.props.title) return true;
        return false;
    }
}

FixedHorizontalList.propTypes = {
    title: PropTypes.any,
    deals: PropTypes.any,
    path: PropTypes.any,
    navigation: PropTypes.any
}

export default FixedHorizontalList;
