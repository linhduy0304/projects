import { Text } from 'native-base';
import { View, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import {
    COLOR_GRAY_BG, COLOR_PRIMARY,
    COLOR_TEXT_INACTIVE
} from '../../../resources/colors';
import PropTypes from 'prop-types'
import JJIcon from '../../common/JJIcon';
import {BaseComponent} from "../BaseComponent";
import {DIMENSION_PADDING_SMALL} from "../../../resources/dimens";

export default class SortList extends BaseComponent {

    render() {
        return (
            <View style={[{ backgroundColor: !!this.props.backgroundColor ? this.props.backgroundColor : COLOR_GRAY_BG, alignItems: 'center' }, this.props.style]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!!this.props.onSortMenuPressed) {
                                this.props.onSortMenuPressed()
                            }
                        }}
                        disabled={true}
                        style={{ marginLeft: 16, marginRight: 16 }} >
                        <JJIcon name={'sort_2_o'}
                                color={COLOR_TEXT_INACTIVE}
                                size={16} />
                    </TouchableOpacity>

                    <ScrollView showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                style={{ paddingTop: 8, paddingBottom: 8 }}>

                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            {this.props.sorts.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!!this.props.onSortSelected) {
                                                this.props.onSortSelected(item)
                                            }
                                        }}
                                        key={'sort_' + index}
                                        style={{
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                            paddingLeft: 16,
                                            paddingRight: 16
                                        }}>
                                        <Text style={{ color: item.sort_type === this.props.selectedSortType ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE }}>
                                            {item.sort_name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                            <View style={{ marginLeft: 16 }} />
                        </View>
                    </ScrollView>
                </View>
                {
                    this.props.loading &&
                    <ActivityIndicator animating={true}
                                       size={'small'}
                                       color={COLOR_PRIMARY}
                                       style={{marginBottom: DIMENSION_PADDING_SMALL}}/>
                }
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.sorts !== undefined && this.props.sorts === undefined) return true;
        if (nextProps.sorts === undefined) return false;
        if (this.props.sorts === undefined) return false;
        if (nextProps.selectedSortType !== this.props.selectedSortType) return true;
        if (nextProps.sorts.length !== this.props.sorts.length) return true;
        if (nextProps.loading !== this.props.loading) return true;
        return false;
    }
}

SortList.propTypes = {
    sorts: PropTypes.any,
    selectedSortType: PropTypes.any,
    style: PropTypes.any,
    onSortMenuPressed: PropTypes.any,
    onSortSelected: PropTypes.any,
    loading: PropTypes.any,
    backgroundColor: PropTypes.any
}

