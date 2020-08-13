import { Text, Container } from 'native-base';
import {View, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'

import {COLOR_PRIMARY, COLOR_TEXT_BLACK_1} from '../../resources/colors';
import JJHeader from '../common/JJHeader';
import JJIcon from '../common/JJIcon';
import DividerLine from '../common/DividerLine';
import {BaseComponent} from "../common/BaseComponent";
import {
    DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_EXTRA,
    DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_HEADER,
    DIMENSION_TEXT_HEADER_X
} from "../../resources/dimens";
import SearchFilterItem from "./SearchFilterItem";

class SearchFilter extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            showClearAll: false,
            hasInit: false,
            filters: undefined
        }
    }

    render() {
        return (
            <Container>
                <JJHeader
                    navigation={this.props.navigation}
                    title={'BỘ LỌC'}
                    leftItem={this._renderLeftButton}
                    rightItem={() => this._renderRightButton()}
                />
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {this.renderMainContent()}
                </View>
            </Container>
        );
    }

    _renderLeftButton = () => {
        return (
            <TouchableOpacity
                onPress={this._onBackPress}
                style={{
                    flex: 1,
                    width: 80,
                    justifyContent: 'center',
                    paddingLeft: DIMENSION_PADDING_MEDIUM,
                }}>
                <JJIcon name={'x_o'}
                        size={DIMENSION_TEXT_HEADER_X}
                        color={COLOR_TEXT_BLACK_1} />
            </TouchableOpacity>
        )
    }

    _renderRightButton = () => {
        if (this.state.showClearAll) {
            return (
                <TouchableOpacity
                    onPress={this._onClearAllSelection}
                    style={{
                        flex: 1,
                        width: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ color: COLOR_PRIMARY, fontSize: 14 }}>Xóa hết</Text>
                </TouchableOpacity>
            )
        } else {
            return <View style={{width: 80}}/>
        }
    }

    _onBackPress = () =>  this.props.navigation.goBack();

    renderMainContent() {
        console.log('renderMainContent', this.state);
        if (!this.state.hasInit || this.state.filters === undefined) {
            return <ActivityIndicator color={COLOR_PRIMARY}
                                      size={'small'}
                                      animating={true}
                                      style={{margin: DIMENSION_PADDING_EXTRA}}/>;
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.filters.toJS()}
                    keyExtractor={this._getKeyGenerator}
                    renderItem={this._renderItem}
                    initialNumToRender={2}
                    maxToRenderPerBatch={5}
                    removeClippedSubviews={true}
                />
                <DividerLine />
                <TouchableOpacity
                    onPress={this._onSubmit}
                    style={{
                        marginTop: DIMENSION_PADDING_TINY,
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM,
                        marginBottom: DIMENSION_PADDING_MEDIUM,
                        backgroundColor: COLOR_PRIMARY,
                        borderRadius: DIMENSION_RADIUS_MEDIUM,
                        height: DIMENSION_BUTTON_MEDIUM,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        fontSize: DIMENSION_TEXT_HEADER,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        XEM KẾT QUẢ
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

    _getKeyGenerator = (item, index) => `filter_${index}`;

    _renderItem = ({item}) => <SearchFilterItem filter={item}
                                                onItemSelected={this._onItemSelected}
                                                onClearAllSelection={this._onClearAllSelectionOfSection}/>;

    _onSubmit = () => {
        this.props.navigation.state.params.onSubmit(this.state.filters);
        this.props.navigation.goBack();
    }

    _onBackPress = () => {
        this.props.navigation.goBack();
    }

    _onItemSelected = (filter, item) => {
        console.log('_onItemSelected', filter, item);

        const foundIndex = this.state.filters.findIndex((item, index) => {
            return item.get('type') === filter.type;
        });
        if (foundIndex < 0) return;

        let filterResult = this.state.filters.get(foundIndex);
        if (filterResult === undefined) return;

        const tags = filterResult.get('tags').map((tag, index) => {
            if (tag.get('key') === item.key) {
                tag = tag.updateIn(['selected'], () => !!!item.selected);
                filterResult = filterResult.updateIn(['selectedCount'], () =>
                    tag.get('selected', false) ? filterResult.get('selectedCount', 0) + 1 : filterResult.get('selectedCount', 1) - 1
                );
            }
            return tag;
        });
        filterResult = filterResult.updateIn(['tags'], () => tags);
        const filters = this.state.filters.update(foundIndex, () => filterResult);

        const showClearAll = filters.some((item, index) => item.get('selectedCount', 0) > 0);

        this.setState({
            ...this.state,
            showClearAll,
            filters
        })
    }

    _onClearAllSelectionOfSection = (filter) => {
        console.log('_onClearAllSelection', filter);

        const foundIndex = this.state.filters.findIndex((item, index) => {
            return item.get('type') === filter.type;
        });
        if (foundIndex < 0) return;

        let filterResult = this.state.filters.get(foundIndex);
        if (filterResult === undefined) return;

        const tags = filterResult.get('tags').map((tag, index) => {
            tag = tag.updateIn(['selected'], () => undefined);
            return tag;
        });
        filterResult = filterResult.updateIn(['tags'], () => tags);
        filterResult = filterResult.updateIn(['selectedCount'], () => 0);

        const filters = this.state.filters.update(foundIndex, () => filterResult);

        const showClearAll = filters.some((item, index) => item.get('selectedCount', 0) > 0);

        this.setState({
            ...this.state,
            showClearAll,
            filters
        })
    }

    _onClearAllSelection = () => {
        const filters = this.state.filters.map((item, index) => {
            item = item.updateIn(['selectedCount'], () => 0);
            item = item.updateIn(['tags'], () => item.get('tags').map((tag, i) => tag.updateIn(['selected'], () => undefined)));
            return item;
        })
        this.setState({
            ...this.state,
            filters,
            showClearAll: false
        })
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout(() => {
            const showClearAll = this.props.navigation.state.params.filters.some((item, index) => item.get('selectedCount', 0) > 0);
            this.setState({
                ...this.state,
                filters: this.props.navigation.state.params.filters,
                showClearAll,
                hasInit: true
            })
        }, 200);
    }
}

SearchFilter.propTypes = {
    filters: PropTypes.any,
    onSubmit: PropTypes.any
}

export default SearchFilter;
