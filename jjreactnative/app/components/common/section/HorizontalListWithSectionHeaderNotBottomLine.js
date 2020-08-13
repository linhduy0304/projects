import React  from 'react';
import {Dimensions, FlatList} from 'react-native'
import PropTypes from 'prop-types'
import { View } from 'react-native';
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import ItemHorizontalList from "./ItemHorizontalList";
import ItemLoadMoreHorizontalList from "./ItemLoadMoreHorizontalList";
import SectionGrayNotBottomLine from "../SectionGrayNotBottomLine";
import {BaseComponent} from "../BaseComponent";

const { width } = Dimensions.get('window');
const itemWidth = width - 52;
const itemHeight = (width / 2) - 52;

export default class HorizontalListWithSectionHeaderNotBottomLine extends BaseComponent {

    render() {
        if (!this.props.deals || this.props.deals.size < 1) return null;
        return (
            <SectionGrayNotBottomLine title={this.props.title}>
                <FlatList
                    style={{ width: '100%', backgroundColor: '#FAFAFA' }}
                    initialNumToRender={2}
                    maxToRenderPerBatch={3}
                    data={this.props.deals.toJS()}
                    horizontal={true}
                    onEndReachedThreshold={0.5}
                    keyExtractor={this._getKeyExtractor}
                    renderItem={this._renderItem}
                    ListFooterComponent={this._renderFooter}
                    showsHorizontalScrollIndicator={false}
                />
            </SectionGrayNotBottomLine>
        )
    }

    _getKeyExtractor = (item, index) => `HorizontalList_${index}_${item.id}_${index}`;

    _renderItem = ({item}) => {
        return (
            <ItemHorizontalList deal={item}
                                path={this.props.path}
                                width={itemWidth}
                                height={itemHeight}
                                navigation={this.props.navigation}/>
        )
    }

    _renderFooter = () => {
        if (!this.props.showMore) return <View style={{width: DIMENSION_PADDING_MEDIUM}}/>;

        return <ItemLoadMoreHorizontalList navigation={this.props.navigation}
                                           onViewMoreClicked={this._onViewMoreClicked}/>
    }

    _onViewMoreClicked = () => {
        if (this.props.screenType === 'dat-cho') {
            if (!!this.props.onGoToBookingTab) this.props.onGoToBookingTab();
            return;
        }
        console.log('_onViewMoreClicked', this.props);
        if (!!this.props.onViewMoreExclusive) {
            this.props.onViewMoreExclusive();
            return;
        }
        this.props.navigation.push('SubCategory', {
            screenType: this.props.screenType,
            title: this.props.title,
            subList: this.props.subList
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.deals && !nextProps.deals.equals(this.props.deals)) return true;
        if (!!nextProps.title && nextProps.title !== this.props.title) return true;
        if (!!nextProps.screenType && nextProps.screenType !== this.props.screenType) return true;
        return false;
    }
}

HorizontalListWithSectionHeaderNotBottomLine.propTypes = {
    navigation: PropTypes.any,
    title: PropTypes.any,
    deals: PropTypes.any,
    path: PropTypes.any,
    showMore: PropTypes.any,
    screenType: PropTypes.any,
    onGoToBookingTab: PropTypes.any,
    onViewMoreExclusive: PropTypes.any,
    subList: PropTypes.any,
}

