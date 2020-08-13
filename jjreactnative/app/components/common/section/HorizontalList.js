import React  from 'react';
import {Dimensions, FlatList} from 'react-native'
import PropTypes from 'prop-types'
import { View } from 'react-native';
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import ItemHorizontalList from "./ItemHorizontalList";
import ItemLoadMoreHorizontalList from "./ItemLoadMoreHorizontalList";
import Section from "../Section";
import {BaseComponent} from "../BaseComponent";
import {AnalyticsUtil} from "../analytics/analytics";
import {MainTabRouteAction} from '../../../router/MainTabContainer'

const { width } = Dimensions.get('window');
const itemWidth = width - 52;
const itemHeight = (width / 2) - 52;

export default class HorizontalList extends BaseComponent {

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
                    keyExtractor={this._getKeyExtractorHorizontalList}
                    renderItem={this._renderItem}
                    ListFooterComponent={this._renderFooter}
                    showsHorizontalScrollIndicator={false}
                />
            </Section>
        )
    }

    _getKeyExtractorHorizontalList = (item, index) => `HorizontalList_${item.id}_${index}`;

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
            this.props.navigation.dispatch({type: MainTabRouteAction.open_tab, routeName: 'TabBooking'});
        }
        else {
            this.props.navigation.push('SubCategory', {
                screenType: this.props.screenType,
                title: this.props.title,
                subList: this.props.subList
            })
        }
        AnalyticsUtil.logViewMoreButtonInDiscoveryTab(this.props.screenType);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.deals && !nextProps.deals.equals(this.props.deals)) return true;
        if (!!nextProps.title && nextProps.title !== this.props.title) return true;
        if (!!nextProps.screenType && nextProps.screenType !== this.props.screenType) return true;
        return false;
    }
}

HorizontalList.propTypes = {
    navigation: PropTypes.any,
    title: PropTypes.any,
    path: PropTypes.any,
    deals: PropTypes.any,
    showMore: PropTypes.any,
    screenType: PropTypes.any,
    subList: PropTypes.any,
}
