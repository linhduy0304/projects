import { View, FlatList, StyleSheet } from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'

import Section from "../../../components/common/Section";
import CircleCategory from "../../../components/common/CircleCategory";
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import {StringUtil} from '../../../utils/string-util'
import {AnalyticsUtil} from "../../common/analytics/analytics";
import BookingSubListPlaceholder from './BookingSubListPlaceholder'
import {BaseComponent} from "../../../common/base/BaseComponent";

export default class BookingSubList extends BaseComponent {

    render() {
        console.log('BookingSubList:render', this.props.sublist);
        if (this.props.sublist === undefined || this.props.sublist === null) return <BookingSubListPlaceholder/>;
        return (
            <View>
                <Section title={'BẠN CẦN ĐẶT CHỖ CHO?'}/>
                <FlatList
                    style={{ width: '100%', backgroundColor: '#FAFAFA' }}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={this.props.sublist.toJS()}
                    horizontal={true}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item, index) => 'booking_sub_list_' + index}
                    ListHeaderComponent={<View style={{width: DIMENSION_PADDING_MEDIUM}}/>}
                    ListFooterComponent={<View style={{width: DIMENSION_PADDING_MEDIUM}}/>}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={true}
                />
            </View>
        )
    }

    _renderItem = ({item}) => {
        return (
            <CircleCategory
                navigation={this.props.navigation}
                key={'booking_sub_' + item.name}
                onPress={this._goToSubCategoryDetail}
                item={item}
                style={styles.category}
                uri={item.icon}
                name={item.name}/>
        )
    }

    _goToSubCategoryDetail = (subCate) => {
        //Generate detail_tag
        let detail_tag = undefined;
        let tags = '';
        if (!(StringUtil.isEmpty(subCate.tag_type) && StringUtil.isEmpty(subCate.tags) && StringUtil.isEmpty(subCate.filter_detail))) {
            let tag_type = !!subCate.tag_type ? subCate.tag_type : 'danh-muc';
            tags = !!subCate.tags ? subCate.tags : subCate.filter_detail;
            detail_tag = { "tag_type": tag_type, "tags": tags };
        }

        AnalyticsUtil.logNormalEvent(
            `click_booking_sub_cat_${tags}`,
            {
                category: 'dat-cho',
                description: 'dat-cho'
            },
            'sub_cat'
        );

        this.props.navigation.push('SubCategory', {
            screenType: 'dat-cho',
            title: `Đặt chỗ ${subCate.name}`,
            detailTag: detail_tag,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.sublist && !nextProps.sublist.equals(this.props.sublist)) return true;
        return false;
    }
}

BookingSubList.propTypes = {
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
