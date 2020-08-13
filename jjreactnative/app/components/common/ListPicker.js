import React from 'react'
import {
    View, FlatList
} from 'react-native';
import PropTypes from 'prop-types'
import {COLOR_LINE} from "../../resources/colors";
import {DIMENSION_PADDING_MEDIUM} from "../../resources/dimens";
import {BasePureComponent} from "./BasePureComponent";
import {AppConfig} from '../../common/config';

export default class ListPicker extends BasePureComponent {

    render() {
        return (
            <FlatList data={this.props.data}
                      ref={(ref) => this.listRef = ref}
                      renderItem={this.props.renderItem}
                      onEndReachedThreshold={0.5}
                      keyExtractor={this._keyExtractorItemGenerate}
                      ItemSeparatorComponent={this._renderItemSeparator}
                      style={{backgroundColor: 'white'}}
                      removeClippedSubviews={!AppConfig.ios}
                      initialNumToRender={5}
            />
        )
    }

    _keyExtractorItemGenerate = (item, index) => {
        return 'ListPickerItem_' + index;
    }


    _renderItemSeparator = () => {
        return <View style={{
            height: 1,
            backgroundColor: COLOR_LINE,
            marginLeft: DIMENSION_PADDING_MEDIUM,
            marginRight: DIMENSION_PADDING_MEDIUM
        }}/>
    }

    _scrollToSelected = () => {
        try {
            const scrollToIndex = !!this.props.selectedIndex && this.props.selectedIndex > 0 ? this.props.selectedIndex : 0;
            console.log('ListPicker:_scrollToSelected', scrollToIndex);
            if (scrollToIndex > 0) {
                if (!!this.mounted && !!this.listRef) {
                    this.listRef.scrollToIndex({animated: true, index: scrollToIndex, viewPosition: 0.5});
                }
            }
        } catch (error) {
            console.log('_scrollToSelected:error', error)
        }
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout(() => {
            this._scrollToSelected();
        }, 500);

    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.listRef = undefined;
    }
}

ListPicker.propTypes = {
    data: PropTypes.array,
    renderItem: PropTypes.func,
    selectedIndex: PropTypes.number
}