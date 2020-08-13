import {View, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {Text} from 'native-base'
import PropTypes from 'prop-types'

import Section from "../Section";
import {DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM} from "../../../resources/dimens";
import SmallDealItem from '../SmallDealItem';
import BigDealItem from '../BigDealItem';
import {COLOR_PRIMARY} from "../../../resources/colors";
import {BaseComponent} from "../BaseComponent";
import {AnalyticsUtil} from "../analytics/analytics";
import {MainTabRouteAction} from "../../../router/MainTabContainer";

const { width } = Dimensions.get('window');

const smallItemWidth = width / 2;

export default class GridView extends BaseComponent {

    render() {
        const { deals } = this.props;
        if (deals === undefined || deals === null || deals.size < 1) return null;

        const dealSize = deals.size;

        return (
            <Section title={this.props.title}>
                <View>
                    <View style={{ paddingBottom: DIMENSION_PADDING_MEDIUM }}>
                        <BigDealItem
                            navigation={this.props.navigation}
                            path={this.props.path}
                            item={deals.get(0).toJS()} />
                    </View>
                    {
                        dealSize > 1 &&
                        <View style={{ paddingBottom: DIMENSION_PADDING_MEDIUM, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SmallDealItem
                                navigation={this.props.navigation}
                                path={this.props.path}
                                item={deals.get(1).toJS()}
                                width={smallItemWidth}/>
                            {
                                dealSize > 2 &&
                                <SmallDealItem
                                    navigation={this.props.navigation}
                                    path={this.props.path}
                                    item={deals.get(2).toJS()}
                                    width={smallItemWidth}/>
                            }
                        </View>
                    }
                    {
                        dealSize > 3 &&
                        <View style={{ paddingBottom: DIMENSION_PADDING_MEDIUM, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <SmallDealItem
                                navigation={this.props.navigation}
                                path={this.props.path}
                                item={deals.get(3).toJS()}
                                width={smallItemWidth}/>
                            {
                                dealSize > 4 &&
                                <SmallDealItem
                                    navigation={this.props.navigation}
                                    path={this.props.path}
                                    item={deals.get(4).toJS()}
                                    width={smallItemWidth}/>
                            }
                        </View>
                    }


                    {
                        this.props.showMore &&
                        <TouchableOpacity
                            onPress={this._onViewMoreClicked}
                            style={{
                                borderColor: COLOR_PRIMARY,
                                marginBottom: DIMENSION_PADDING_MEDIUM,
                                marginLeft: DIMENSION_PADDING_MEDIUM,
                                marginRight: DIMENSION_PADDING_MEDIUM,
                                borderRadius: DIMENSION_RADIUS_MEDIUM,
                                borderWidth: 1,
                                height: DIMENSION_BUTTON_MEDIUM,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: COLOR_PRIMARY, fontSize: 16, fontWeight: 'bold' }}>
                                XEM THÊM
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </Section>
        )
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

GridView.propTypes = {
    title: PropTypes.any,
    deals: PropTypes.any,
    path: PropTypes.any,
    showMore: PropTypes.any,
    screenType: PropTypes.any,
    subList: PropTypes.any,
    navigation: PropTypes.any
}
