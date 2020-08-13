import React  from 'react';
import { View } from 'react-native';
import ExclusiveDealItem from '../../../common/ExclusiveDealItem'
import HeaderSection from '../../../common/HeaderSection';
import PropTypes from 'prop-types'
import {BaseComponent} from "../../../common/BaseComponent";

export default class ExclusiveDealsSection extends BaseComponent {

    render() {
        console.log('ExclusiveDealsSection:render', this.props)
        if (!!this.props.exclusiveDeals && this.props.exclusiveDeals.size > 0) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    {/* Header */}
                    <HeaderSection
                        title={'Chỉ có tại JAMJA'}
                        onShowAll={this._goToListExclusiveDeals}
                    />
                    {/* List Deal */}
                    <View>
                        {
                            this.props.exclusiveDeals.filter((deal, i) => {
                                return deal.get('id') !== this.props.dealId;
                            }).map((deal, i) => {
                                const isLastItem = i >= this.props.exclusiveDeals.size - 1 || i >= 4;
                                if (i < 5) return <ExclusiveDealItem key={deal.get('id')}
                                                                     deal={deal.toJS()}
                                                                     navigation={this.props.navigation}
                                                                     path={'deal_detail_exclusive_section'}
                                                                     isLastItem={isLastItem}/>;
                            })
                        }
                    </View>
                </View >
            )
        } else {
            return null;
        }
    }

    _goToListExclusiveDeals = () => {
        this.props.navigation.push('SubCategory', {
            screenType: 'doc-quyen',
            title: 'Độc quyền tại JAMJA',
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.exclusiveDeals !== undefined && this.props.exclusiveDeals === undefined) return true;
        if (!!this.props.exclusiveDeals && !this.props.exclusiveDeals.equals(nextProps.exclusiveDeals)) return true;
        return false;
    }
}

ExclusiveDealsSection.propTypes = {
    dealId: PropTypes.string,
    exclusiveDeals: PropTypes.any,
    navigation: PropTypes.any,
}