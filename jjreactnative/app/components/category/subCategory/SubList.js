import { View, FlatList, StyleSheet } from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'

import CircleCategory from "../../../components/common/CircleCategory";
import {DIMENSION_PADDING_MEDIUM} from "../../../resources/dimens";
import {BaseComponent} from "../../../components/common/BaseComponent";
import {StringUtil} from '../../../utils/string-util'
import {AnalyticsUtil} from '../../../components/common/analytics/analytics'

class SubList extends BaseComponent {

    render() {
        console.log('SubList:render', this.props);
        if (this.props.sublist === undefined || this.props.sublist === null) return null;
        return (
            <View style={{
                marginTop: !!this.props.marginTop ? this.props.marginTop : DIMENSION_PADDING_MEDIUM,
                marginBottom: !!this.props.marginBottom ? this.props.marginBottom : DIMENSION_PADDING_MEDIUM}}>
                <FlatList
                    style={{ width: '100%', backgroundColor: '#FAFAFA' }}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={this.props.sublist.toJS()}
                    horizontal={true}
                    removeClippedSubviews={true}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item, index) => 'category_sub_list_' + index}
                    ListHeaderComponent={<View style={{width: DIMENSION_PADDING_MEDIUM}}/>}
                    ListFooterComponent={<View style={{width: DIMENSION_PADDING_MEDIUM}}/>}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    _renderItem = ({item}) => {
        return (
            <CircleCategory
                navigation={this.props.navigation}
                key={'category_sub_' + item.name}
                onPress={this._goToSubCategoryDetail}
                style={styles.category}
                item={item}
                uri={item.icon}
                name={item.name} />
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

        let title = undefined;
        if (!StringUtil.isBlank(this.props.screenType) && this.props.screenType === 'dat-cho') {
            title = `${this.props.screenType} ${subCate.name}`
        }
        else {
            title = subCate.name;
        }

        console.log('_goToSubCategoryDetail', subCate, detail_tag, this.props);

        AnalyticsUtil.logNormalEvent(
            `click_sub_cat_${this.props.screenType}_${tags}`,
            {
                description: this.props.screenType,
                category: this.props.screenType,
                tags: tags
            },
            'sub_cat'
        );

        this.props.navigation.push('SubCategory', {
            screenType: this.props.screenType,
            title: title,
            detailTag: detail_tag,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.sublist && !nextProps.sublist.equals(this.props.sublist)) return true;
        return false;
    }
}

SubList.propTypes = {
    screenType: PropTypes.any,
    title: PropTypes.any,
    sublist: PropTypes.any,
    navigation: PropTypes.any,
    marginTop: PropTypes.any,
    marginBottom: PropTypes.any
}

const styles = StyleSheet.create({
    category: {
        marginRight: 24,
    },
    icon: {
        marginTop: 3,
    }
});

export default SubList;
