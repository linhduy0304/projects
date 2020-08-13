import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types'
import {
    COLOR_PRIMARY, COLOR_GRAY_BG,
} from '../../resources/colors';
import {
    DIMENSION_PADDING_EXTRA,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL,
    DIMENSION_TEXT_CONTENT,
    DIMENSION_TEXT_HEADER_XX
} from "../../resources/dimens";
import {BaseComponent} from "../common/BaseComponent";
import PriceSection from './PriceSection'
import NormalFilterSection from './NormalFilterSection'

export default class SearchFilterItem extends BaseComponent {

    render() {
        return (
            <View style={{backgroundColor: 'white', paddingTop: DIMENSION_PADDING_SMALL}}>
                {/* Header */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                    paddingRight: DIMENSION_PADDING_MEDIUM,
                    paddingBottom: DIMENSION_PADDING_MEDIUM,
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: DIMENSION_TEXT_HEADER_XX, fontWeight: 'bold'}}>
                        {this.props.filter.label}
                    </Text>
                    {
                        !!this.props.filter.selectedCount && this.props.filter.selectedCount > 0 &&
                        <TouchableOpacity
                            onPress={() => this.props.onClearAllSelection(this.props.filter)}
                            style={{paddingLeft: DIMENSION_PADDING_SMALL}}>
                            <Text style={{color: COLOR_PRIMARY, fontSize: DIMENSION_TEXT_CONTENT}}>
                                Bỏ chọn
                            </Text>
                        </TouchableOpacity>
                    }
                </View>

                {this.renderListTags()}
                <View style={{
                    marginTop: DIMENSION_PADDING_SMALL,
                    height: DIMENSION_PADDING_EXTRA,
                    backgroundColor: COLOR_GRAY_BG
                }}/>
            </View>
        );
    }

    renderListTags = () => {
        if (this.props.filter.type === 'muc-gia') {
            return <PriceSection filter={this.props.filter} onPress={this._onItemClicked}/>;
        } else {
            return <NormalFilterSection filter={this.props.filter} onPress={this._onItemClicked}/>;
        }
    }

    _onItemClicked = (item) => {
        this.props.onItemSelected(this.props.filter, item);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.filter && this.props.filter === undefined) return true;
        if (this.props.filter === undefined) return false;
        if (nextProps.filter.selectedCount !== this.props.filter.selectedCount) return true;
        if (nextProps.filter.type !== this.props.filter.type) return true;
        return false;
    }
}

SearchFilterItem.propTypes = {
    filter: PropTypes.any,
    onItemSelected: PropTypes.any,
    onClearAllSelection: PropTypes.any
}