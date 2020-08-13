import React from 'react'
import PropTypes from 'prop-types'
import {Text} from 'native-base';
import {Platform, TouchableOpacity, View, FlatList, ActivityIndicator, TextInput, KeyboardAvoidingView, Keyboard} from 'react-native';
import {connect} from "react-redux";

import JJIcon from '../../common/JJIcon';
import {fetchKeywordSearchDealHistory, addKeywordSearchDeal, removeKeywordSearchDeal} from './action'
import ButtonNormalGray from "../../common/button/ButtonNormalGray";
import {StringUtil} from '../../../utils/string-util'
import {commonApi} from '../../../api/common-api'
import {BasePureComponent} from "../../common/BasePureComponent";
import TrendingItem from './TrendingItem'
import HistoryItem from './HistoryItem'
import SuggestionItem from './SuggestionItem'
import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY} from "../../../resources/dimens";
import JJStatusBar from "../../common/view/JJStatusBar";
import ImageBanner from "../../common/view/ImageBanner";
import {getPaddingTopBar} from "../../../utils/common-utils";

const ios = Platform.OS === 'ios';
const headerHeigh = ios ? 44 : 56;
const paddingTopBar = getPaddingTopBar();

class SearchDealKeywordInput extends BasePureComponent {


    constructor(props, context) {
        super(props, context);
        this.state = {
            clearInputVisible: false,
            draftKeyword: undefined,
            isLoadingTrending: true,
            trends: undefined,
            keywordLoadFinished: undefined,
            suggests: undefined,
            isLoadingSuggestion: false,
            histories: undefined
        }
    }

    componentDidMount() {
        super.componentDidMount();
        console.log('SearchDealKeywordInput start fetch ', this.props);
        this.props.dispatch(fetchKeywordSearchDealHistory());
        this._fetchTrendingKeyword();

        Keyboard.addListener('keyboardDidShow', this._onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', this._onKeyboardDidHide);

        setTimeout(() => {
            if (!!this.refs && !!this.refs.textInputKeyword) {
                this.refs.textInputKeyword.focus();
            }
        }, 1000);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fafafa', alignItems: 'center'}}>
                <JJStatusBar/>
                <View style={{
                    width: '100%',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    paddingTop: paddingTopBar,
                }}>
                    <TouchableOpacity
                        style={{
                            height: headerHeigh,
                            width: headerHeigh,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={this.props.onClose}>
                        <JJIcon
                            style={{marginBottom: ios ? 6 : 0}}
                            name={"x_o"}
                            size={18}
                            color={'gray'}/>
                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginRight: 16,
                        borderBottomWidth: 0.5,
                        borderColor: 'rgba(69, 69, 69, 0.2)'
                    }}>
                        <JJIcon style={{margin: 8}} name={"search"} size={16} color={'rgba(69, 69, 69, 0.2)'}/>
                        <TextInput style={{
                                        color: '#454545',
                                        marginBottom: ios ? 2 : 0,
                                        paddingLeft: 0,
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        flex: 1
                                    }}
                                   ref='textInputKeyword'
                                   placeholder={'Tìm thương hiệu, sản phẩm'}
                                   placeholderTextColor={'rgba(69, 69, 69, 0.2)'}
                                   underlineColorAndroid='transparent'
                                   defaultValue={this.props.keyword}
                                   value={this.state.draftKeyword}
                                   autoFocus={false}
                                   multiline={false}
                                   numberOfLines={1}
                                   returnKeyType={'search'}
                                   onChangeText={this._searchInputChanged}
                                   onSubmitEditing={this._onSubmitKeyword}
                        />
                        {
                            ((this.props.keyword !== undefined && this.props.keyword !== null && this.props.keyword.trim().length > 0) || this.state.clearInputVisible) &&
                            <TouchableOpacity
                                style={{
                                    paddingLeft: DIMENSION_PADDING_SMALL,
                                    paddingTop: DIMENSION_PADDING_TINY,
                                    paddingBottom: DIMENSION_PADDING_TINY,
                                    paddingRight: DIMENSION_PADDING_TINY
                                }}
                                onPress={this._onClearInputClicked}>
                                <JJIcon name={"x_circle_o"}
                                        size={16}
                                        color={'rgba(69, 69, 69, 0.2)'}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                </View>

                {
                    this._renderEmptyHistoryKeyword()
                }
                {this._renderKeywordSuggestion()}
            </View>
        )
    }

    _renderTrendingKeyword = () => {
        if (this.state.isLoadingTrending) {
            return (
                <ActivityIndicator
                    style={{padding: 24}}
                    animating
                    size="small" />
            )
        }
        if (this.state.trends === undefined || this.state.trends === null || this.state.trends.length < 1) {
            return null
        }
        return (
            <View>
                <FlatList
                    style={{ backgroundColor: 'white', paddingBottom: 8 }}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={this.state.trends.slice(0,5)}
                    onEndReachedThreshold={0.5}
                    keyboardShouldPersistTaps={'handled'}
                    keyExtractor={this._generateKeyExtratorTrendingKeyword}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this._renderTrendingItem}
                    ListHeaderComponent={this._renderTrendingHeader}
                    removeClippedSubviews={true}
                />
            </View>
        )
    }

    _generateKeyExtratorTrendingKeyword = (item, index) => {
        return `trending_keyword_${index}_${item.id}`
    }

    _renderTrendingHeader = () => {
        return (
            <View style={{paddingLeft: 16, paddingRight: 8, justifyContent: 'center', alignItems: 'center', paddingTop: 16}}>
                <JJIcon name={"trending_up_o"} size={16} color='#999999'/>
            </View>
        )
    }

    _renderTrendingItem = ({item}) => <TrendingItem onPress={this._onKeywordTrendingClicked} keyword={item.keyword}/>;

    _renderEmptyHistoryKeyword = () => {
        if (!StringUtil.isBlank(this.state.draftKeyword)) return null;

        let hasHistories = this.props.histories !== undefined && this.props.histories !== null && this.props.histories.length > 0;

        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'column'
                }}
                behavior={ios ? 'padding' : undefined}>
                {this._renderTrendingKeyword()}
                {
                    !!this.props.banner46 &&
                    <ImageBanner navigation={this.props.navigation}
                                 banner={this.props.banner46}/>
                }
                {
                    hasHistories &&
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={this._onCloseKeyboard}>
                            <Text style={{
                                color: '#999999',
                                fontWeight: 'bold',
                                fontSize: 14,
                                padding: 16
                            }}>
                                Tìm kiếm gần đây
                            </Text>
                        </TouchableOpacity>
                        <FlatList
                            style={{ flex: 1, backgroundColor: '#FAFAFA'}}
                            initialNumToRender={3}
                            maxToRenderPerBatch={3}
                            data={this.props.histories}
                            onEndReachedThreshold={0.5}
                            keyboardShouldPersistTaps={'handled'}
                            keyExtractor={this._trendingItemKeyGenerator}
                            renderItem={this._renderHistoryItem}
                            ListFooterComponent={this._renderButtonClearHistory}
                            removeClippedSubviews={true}
                        />
                    </View>
                }
            </KeyboardAvoidingView>
        )
    }

    _renderButtonClearHistory = () => {

        return (
            <ButtonNormalGray text={'Xoá lịch sử tìm kiếm'}
                              onPress={this._onDeleteAllHistoryClicked}
                              style={{
                                  margin: DIMENSION_PADDING_MEDIUM
                              }}/>
        )
    }

    _onDeleteAllHistoryClicked = () => this._onDeleteHistoryKeyword('', true);

    _trendingItemKeyGenerator = (item, index) => `trending_${item.keyword}_${index}`;

    _renderHistoryItem = ({item}) => <HistoryItem item={item} onPress={this._onKeywordHistoryClicked} onDeletePress={this._onDeleteHistoryKeyword}/>;

    _renderKeywordSuggestion = () => {
        if (StringUtil.isBlank(this.state.draftKeyword) ||
            this.state.suggests === undefined ||
            this.state.suggests === null ||
            this.state.suggests.length < 1) {
            return null
        }

        return (
            <KeyboardAvoidingView
                style={{
                    width: '100%',
                    flex: 1,
                    flexDirection: 'column'
                }}
                behavior={ios ? 'padding' : undefined}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={this._onCloseKeyboard}>
                    <Text style={{
                        color: '#999999',
                        fontWeight: 'bold',
                        fontSize: 14,
                        padding: 16
                    }}>
                        Gợi ý tìm kiếm
                    </Text>
                </TouchableOpacity>

                <FlatList
                    style={{ flex: 1, backgroundColor: '#FAFAFA' }}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={this.state.suggests}
                    onEndReachedThreshold={0.5}
                    keyboardShouldPersistTaps={'handled'}
                    keyExtractor={this._suggestItemKeyGenerator}
                    renderItem={this._renderKeywordSuggestionItem}
                    removeClippedSubviews={true}
                />
            </KeyboardAvoidingView>
        )
    }

    _onCloseKeyboard = () => Keyboard.dismiss();

    _suggestItemKeyGenerator = (item, index) => `suggest_${item.keyword}_${index}`;

    _renderKeywordSuggestionItem = ({item}) => <SuggestionItem onPress={this._onKeywordSuggestClicked} item={item}/>;

    _onKeyboardDidShow = () => {
        console.log('_onKeyboardWillShow');
        if (!this.mounted) return;
        this.setState({...this.state, keyboardVisible: true});
    }

    _onKeyboardDidHide = () => {
        console.log('_onKeyboardWillHide')
        if (!this.mounted) return;
        this.setState({...this.state, keyboardVisible: false});
    }

    _onClearInputClicked = () => {
        this._searchInputChanged('');
    }

    _onKeywordSuggestClicked = (keyword) => {
        this._saveAndSetKeywordSelected(keyword)
    }

    _onKeywordHistoryClicked = (keyword) => {
        this._saveAndSetKeywordSelected(keyword)
    }

    _onKeywordTrendingClicked = (keyword) => {
        this._saveAndSetKeywordSelected(keyword)
    }

    _onSubmitKeyword = (event) => {
        let keyword = event.nativeEvent.text;
        if (!keyword || StringUtil.isEmpty(keyword.trim())) return;
        this._saveAndSetKeywordSelected(keyword)
    }

    _saveAndSetKeywordSelected = (keyword) => {
        if (keyword !== undefined && keyword.length > 0) this.props.dispatch(addKeywordSearchDeal(keyword))
        if (this.props.onKeywordSelected) this.props.onKeywordSelected(keyword)
    }

    _searchInputChanged = (q) => {
        this.setState({
            ...this.state,
            clearInputVisible: !StringUtil.isBlank(q),
            draftKeyword: q
        }, () => {
            if (this.state.isLoadingSuggestion) return;
            this._fetchKeywordSuggestion();
        });
    }

    _onDeleteHistoryKeyword = (item, deleteAll) => {
        if (deleteAll) {
            this.props.dispatch(removeKeywordSearchDeal(null, deleteAll))
        } else if (item !== undefined && item.keyword !== undefined && item.keyword.length > 0) {
            this.props.dispatch(removeKeywordSearchDeal(item.keyword, deleteAll))
        }
    }

    _fetchTrendingKeyword = () => {
        commonApi.getTrendingKeyword(5)
            .then(trends => {
                console.log('getTrendingKeyword:success', trends);
                this.setState({
                    ...this.state,
                    isLoadingTrending: false,
                    trends: trends
                });
            })
            .catch(error => {
                console.log('getTrendingKeyword:error', error);
                this.setState({
                    ...this.state,
                    isLoadingTrending: false,
                    trends: undefined
                });
            })
    }

    _fetchKeywordSuggestion = () => {
        this.setState({
            ...this.state,
            isLoadingSuggestion: true
        });
        const keyword = this.state.draftKeyword;
        console.log('_fetchKeywordSuggestion:', this.state, keyword);
        commonApi.getKeywordSuggestion(keyword, 0, 20)
            .then(suggest => {
                console.log('getKeywordSuggestion:success', suggest);
                this.setState({
                    ...this.state,
                    keywordLoadFinished: keyword,
                    suggests: suggest,
                    isLoadingSuggestion: false
                });
            })
            .catch(error => {
                console.log('getKeywordSuggestion:error', error);
                this.setState({
                    ...this.state,
                    keywordLoadFinished: keyword,
                    suggests: undefined,
                    isLoadingSuggestion: false
                })
            })
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardDidShow', this._onKeyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', this._onKeyboardDidHide);
        super.componentWillUnmount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.isLoadingSuggestion && this.state.draftKeyword !== this.state.keywordLoadFinished && !StringUtil.isEmpty(this.state.draftKeyword)) {
            this._searchInputChanged(this.state.draftKeyword);
        }
    }
}

SearchDealKeywordInput.propTypes = {
    navigation: PropTypes.any,
    keyword: PropTypes.any,
    onClose: PropTypes.any,
    onKeywordSelected: PropTypes.any
}

const mapStateToProps = (state) => {
    return {
        //user
        user: state.loginReducer.user,

        histories: state.keywordSearchDealHistoryReducer.histories,

        banner46: state.homeReducer.getIn(['banners', 'banner_46'])
    }
};

export default connect(mapStateToProps)(SearchDealKeywordInput);