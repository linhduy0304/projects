import { connect } from 'react-redux';
import { View } from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'

import CircleCategory from '../../../common/CircleCategory';
import Section from '../../../common/Section';
import {BaseComponent} from "../../../../common/base/BaseComponent";
import {COLOR_TEXT_BLACK_1} from "../../../../resources/colors";
import {DIMENSION_PADDING_MEDIUM} from "../../../../resources/dimens";
import {AnalyticsUtil} from "../../../common/analytics/analytics";

class GridCategory extends BaseComponent {

    render() {
        console.log('render GridCategory');
        return (
            <Section title={'BẠN CẦN KHUYẾN MÃI GÌ?'}>
                {
                    !!this.props.categories &&
                    !!this.props.categories.size > 0 &&
                    <View style={{ flexDirection: 'row', marginBottom: DIMENSION_PADDING_MEDIUM }}>
                        {
                            this.props.categories.filter((ct, i) => i < 4).map((category, index) => (
                                <CircleCategory
                                    key={category.get('name')}
                                    uri={category.get('icon')}
                                    name={category.get('name')}
                                    color={COLOR_TEXT_BLACK_1}
                                    onPress={this.gotoCategoryDetail}
                                    item={category}
                                />
                            ))
                        }
                    </View >
                }

                <View style={{ flexDirection: 'row' }}>

                    <CircleCategory
                        icon={'exclusive__o'}
                        name={'Độc quyền'}
                        color={COLOR_TEXT_BLACK_1}
                        onPress={this.gotoExclusiveDeals} />

                    <CircleCategory
                        icon={'mall_o'}
                        name={'TTTM'}
                        color={COLOR_TEXT_BLACK_1}
                        onPress={this.gotoMallList} />

                    <CircleCategory
                        icon={'collection_o'}
                        name={'Bộ sưu tập'}
                        color={COLOR_TEXT_BLACK_1}
                        onPress={this.gotoCollections} />

                    <CircleCategory
                        icon={'more_horizontal_o'}
                        name={'Khác'}
                        color={COLOR_TEXT_BLACK_1}
                        onPress={this._gotoOtherCategory} />

                </View >
            </Section>
        )
    }

    gotoCategoryDetail = (category) => {
        this.props.navigation.push('SubCategory', {
            screenType: category.get('slug'),
            title: category.get('name'),
            subList: fromJS(category.get('sub_categories'))
        });

        this._logButtonClicked(category.get('slug'));
    }

    gotoExclusiveDeals = () => {
        this.props.navigation.push('SubCategory', {
            screenType: 'doc-quyen',
            title: 'Độc quyền tại JAMJA'
        });
        this._logButtonClicked('doc-quyen');
    }

    gotoMallList = () => {
        this.props.navigation.navigate('ShoppingMall')
        this._logButtonClicked('mall_list');
    }

    gotoCollections = () => {
        this.props.navigation.navigate('Collections');
        this._logButtonClicked('collection');
    }

    _gotoOtherCategory = () => {
        this.props.navigation.push('SubCategory', {
            screenType: 'khac',
            title: 'Khác',
        });
        this._logButtonClicked('khac');
    }

    _logButtonClicked = (type) => {
        AnalyticsUtil.logViewMoreButtonInDiscoveryTab(`grid_cat_${type}`);
    }

        // _openMallList = () => {
    //     this.props.navigation.navigate('ShoppingMall');
    // }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.categories && !this.props.categories) return true;
        if (!!nextProps.categories && !nextProps.categories.equals(this.props.categories)) return true;
        if (!!nextProps.eCouponSubList && !nextProps.eCouponSubList.equals(this.props.eCouponSubList)) return true;
        return false;
    }
}

GridCategory.propTypes = {
    navigation: PropTypes.any
}

function mapStateToProps(state) {
    return {
        categories: state.homeReducer.get('categories'),
        eCouponSubList: state.homeReducer.get('eCouponSubList'),
    };
}

export default connect(mapStateToProps)(GridCategory);
