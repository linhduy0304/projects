import React from 'react';
import {View, VirtualizedList,KeyboardAvoidingView,Platform, TouchableWithoutFeedback} from 'react-native';
import {fromJS, Map} from 'immutable';
import PropTypes from "prop-types";

import {BaseComponent} from "../../common/base/BaseComponent";
import PickUpMenuHeader from './PickUpMenuHeader';
import ButtonOutline from '../../common/view/button/ButtonOutline';
import ButtonFilled from '../../common/view/button/ButtonFilled';
import {DIMENSION_BUTTON_MEDIUM, DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_SMALL} from "../../resources/dimens";
import {AppConfig} from "../../common/config";
import SubMenuListItem from './SubMenuListItem';
import PopUpHeader from '../../common/view/header/PopUpHeader';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {StringUtil} from '../../utils/string-util';

export default class PickMenuDialogContent extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        console.debug('PickMenuDialogContent:render', this.state);
        if (!this.state.data) return null;
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
                <View style={{flex: 1}}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{flex: 1}} >

                        <PopUpHeader
                            mainText={!!this.props.item && !!this.props.item.get('idPicking') ? 'CẬP NHẬT ĐƠN HÀNG' : 'THÊM VÀO ĐƠN HÀNG'}
                            onClose={this._close}/>

                        <PickUpMenuHeader
                            title={this.props.item.get('title', '')}
                            quantity={this.state.quantity}
                            isDiscounted={this.props.item.get('is_discounted', false)}
                            price={this.props.item.get('original_price', 0)}
                            onPlus={this._onPlusItem}
                            onMinus={this._onMinusItem}
                            note={this.state.note}
                            onChangeNote={this._onChangeNote}
                        />

                        <VirtualizedList
                            style={{flex: 1}}
                            keyboardShouldPersistTaps={'handled'}
                            initialNumToRender={1}
                            maxToRenderPerBatch={10}
                            data={this.state.data.get('list')}
                            getItem={this._getSubMenuItem}
                            getItemCount={this._getSubMenuItemCount}
                            keyExtractor={this._getSubMenuItemKeyExtractor}
                            renderItem={this._renderSubMenuItem}
                            removeClippedSubviews={!AppConfig.ios}/>


                        {
                            this.state.quantity < 1 &&
                            !!this.props.item.get('idPicking') &&
                            <ButtonOutline
                                style={{
                                    marginTop: DIMENSION_PADDING_SMALL,
                                    marginBottom: DIMENSION_PADDING_SMALL,
                                    marginLeft: DIMENSION_PADDING_MEDIUM,
                                    marginRight: DIMENSION_PADDING_MEDIUM,
                                    height: DIMENSION_BUTTON_MEDIUM
                                }}
                                title={'XOÁ KHỎI ĐƠN HÀNG'}
                                icon={'trash_o'}
                                align={'center'}
                                textColor={'#FF6A00'}
                                borderColor={'#FF6A00'}
                                onPress={this._onDeleteMenuItem}/>
                        }
                        {
                            (
                                (this.state.quantity > 0 && !!this.props.item.get('idPicking')) ||
                                (this.state.quantity >= 0 && !this.props.item.get('idPicking'))
                            ) &&
                            <ButtonFilled
                                style={{
                                    marginTop: DIMENSION_PADDING_SMALL,
                                    marginBottom: DIMENSION_PADDING_SMALL,
                                    marginLeft: DIMENSION_PADDING_MEDIUM,
                                    marginRight: DIMENSION_PADDING_MEDIUM,
                                    height: DIMENSION_BUTTON_MEDIUM
                                }}
                                title={this._getBottomTitle()}
                                icon={'trash_o'}
                                align={'center'}
                                textColor={'white'}
                                backgroundColor={'#22C300'}
                                onPress={this._onSubmitChoice}/>
                        }
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>

        )
    }

    /**
     * Setup list
     */
    _prepareData = item => {
        if (!item) return;

        let customizations = item.get('customizations');

        let list = fromJS([]);
        if (!!customizations && customizations.size > 0) {
            customizations = customizations.map((c, i) => {
                if (!c.get('cat_id')) {
                    c = c.updateIn(['cat_id'], () => `${c.get('title')}_${i}`);
                }
                if (!!c && c.get('options', {size: () => 0}).size > 0) {
                    list = list.push(Map({
                        title: c.get('title'),
                        isTitle: true
                    }));

                    const autoChoiceFirst = c.get('min_permitted', 0) === 1;
                    if (!!autoChoiceFirst) {
                        c = c.updateIn(['quantity'], () => 1);
                    }

                    c.get('options').map((option, index) => {
                        if (!!autoChoiceFirst && index === 0) {
                            option = option.updateIn(['selected'], () => true);
                        }
                        list = list.push(option.updateIn(['cat_id'], () => c.get('cat_id')));
                    });
                }
                return c;
            });
        }

        item = item.updateIn(['customizations'], () => customizations);

        return {
            note: !!item.get('idPicking') ? item.get('note') : '',
            quantity: !!item.get('idPicking') ? item.get('quantity') : 1,
            data: fromJS({
                list,
                item
            })
        }
    }

    _getSubMenuItem = (data, index) => !!data && data.get(index);

    _getSubMenuItemCount = (data) => !!data ? data.size : 0;

    _getSubMenuItemKeyExtractor = (item, index) => {
        let key = `sub_menu_item_${index}_`;
        if (item) {
            if (Map.isMap(item)) {
                key += item.get('id', '');
            }
            else if (typeof item === 'string') {
                key += item
            }
            else {
                key += index
            }
        }
        return key;
    }

    _renderSubMenuItem = ({ item, index }) => <SubMenuListItem item={item} index={index} onPress={this._onSubMenuItemPress}/>;
    /**
     * End of setup list
     */

    /**
     * Sub menu item actions
     */
    _onSubMenuItemPress = (item, index) => {
        if (!item || !item.get('product_code') || index < 0) return;

        let data = this.state.data;
        const catIndex = data.getIn(['item', 'customizations']).findIndex(c => c.get('cat_id') === item.get('cat_id'));

        if (catIndex < 0) return;

        if (!item.get('selected', false)) {
            this._addSubMenu(data, catIndex, item, index);
        }
        else {
            this._removeSubMenu(data, catIndex, item, index);
        }
    }

    _addSubMenu = (data, catIndex, item, index) => {
        let cat = data.getIn(['item', 'customizations', catIndex]);

        if (!cat || (cat.get('quantity', 0) > 1 && cat.get('max_permitted', 0) > 0 && cat.get('quantity', 0) >= cat.get('max_permitted', 0))) return;

        const isSingleChoice = cat.get('max_permitted', 0) === 1;
        let list = data.get('list');

        if (!!isSingleChoice) {
            list = list.map(l => {
                if (l.get('cat_id') === cat.get('cat_id')) {
                    return l.updateIn(['selected'], () => false);
                }
                return l;
            });
        }

        cat = cat.updateIn(['quantity'], () => !!isSingleChoice ? 1 : cat.get('quantity', 0) + 1);
        data = data.updateIn(['item', 'customizations', catIndex], () => cat);
        list = list.updateIn([index, 'selected'], () => !item.get('selected'));

        this.setState({
            data: data.updateIn(['list'], () => list)
        })
    }

    _removeSubMenu = (data, catIndex, item, index) => {
        let cat = data.getIn(['item', 'customizations', catIndex]);

        if (!cat || cat.get('quantity', 0) < 0 || cat.get('quantity', 0) < cat.get('min_permitted', 0)) return;

        const isSingleChoice = cat.get('max_permitted', 0) === 1;
        if (!!isSingleChoice) return;

        let list = data.get('list');

        cat = cat.updateIn(['quantity'], () => cat.get('quantity', 0) - 1);
        data = data.updateIn(['item', 'customizations', catIndex], () => cat);
        list = list.updateIn([index, 'selected'], () => !item.get('selected'));

        this.setState({
            data: data.updateIn(['list'], () => list)
        })
    }
    /**
     * End of Sub menu item actions
     */

    _onPlusItem = () => {
        this.setState({
            quantity: this.state.quantity + 1
        });
    }

    _onMinusItem = () => {
        if (this.state.quantity <= 0) return;
        this.setState({
            quantity: this.state.quantity - 1
        });
    }

    _onDeleteMenuItem = () => {
        !!this.props.onRemoveItem && this.props.onRemoveItem(this.props.item);
        this._close();
    }

    _getBottomTitle = () => {
        if (this.state.quantity < 1 && !this.props.item.get('idPicking')) return 'ĐÓNG';
        if (this.state.quantity > 0 && !!this.props.item.get('idPicking')) return 'CẬP NHẬT ĐƠN HÀNG';

        return this._getPriceBottomTitle();
    }

    _getPriceBottomTitle = () => {
        let data = this.state.data;
        let quantity = this.state.quantity;
        if (!data || !data.get) return;

        let item = data.get('item');
        let list = data.get('list');
        
        let price = item.get('original_price');
        list.map((l, i) => {
            if (!l || !l.get) return;
            if(l.get('selected')) {
                price += l.get('original_price')
            }
        })
        price *= quantity;
        return `THÊM VÀO ĐƠN HÀNG - ${StringUtil.beautyNumber(price)}`
    }

    _onSubmitChoice = () => {
        let data = this.state.data;
        let item = data.get('item');
        
        if (!item.get('idPicking') && this.state.quantity < 1) {
            this._close()
            return;
        }

        item = item.updateIn(['quantity'], () => this.state.quantity);
        item = item.updateIn(['note'], () => this.state.note);
        let customizations = item.get('customizations');

        const list = data.get('list');
        list.map(m => {

            const subMenuIndex = customizations.findIndex(c => c.get('cat_id') === m.get('cat_id'));
            const itemInOptionsIndex = customizations.getIn([subMenuIndex, 'options']).findIndex(op => op.get('id') === m.get('id'));

            customizations = customizations.updateIn([subMenuIndex, 'options', itemInOptionsIndex, 'selected'], () => m.get('selected', false));
        });
        item = item.updateIn(['customizations'], () => customizations);

        this._close();

        if (!item.get('idPicking')) {
            !!this.props.onAddItem && this.props.onAddItem(item);
            return;
        }

        if (this.state.quantity > 0) {
            this.props.onUpdateItem && this.props.onUpdateItem(item);
            return;
        }

        this.props.onRemoveItem && this.props.onRemoveItem(item);
    }

    _close = () => {
        !!this.props.onClosePress && this.props.onClosePress();
    }

    _onChangeNote = (note) => {
        this.setState({
            note
        });
    }

    componentDidMount() {
        super.componentDidMount();
        console.debug('PickMenuDialogContent:componentDidMount');
        if (!!this.props.item) {
            this.setState( this._prepareData(this.props.item));
        }
        else {
            this.setState({});
        }
    }

    componentWillUnmount() {
        console.debug('PickMenuDialogContent:componentWillUnmount');
        super.componentWillUnmount();
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (!nextProps.item) return false;
        if (!this.props.item) return true;
        if (nextProps.item.get('id') !== this.props.item.get('id')) return true;
        if (nextState.quantity !== this.props.quantity) return true;
        if (!!nextState.data && !!this.state.data && nextState.data.get('list', {equals: () => false}).equals(this.state.data.get('list'))) return true;
        return false;
    }

    // componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    //     console.debug('PickMenuDialogContent:componentWillReceiveProps: ', nextProps.item.toJS());
    //     if (!!nextProps.item) {
    //         this.setState(this._prepareData(nextProps.item));
    //     }
    // }
}

PickMenuDialogContent.propTypes = {
    item: PropTypes.object,
    onClosePress: PropTypes.func,
    onAddItem: PropTypes.func,
    onUpdateItem: PropTypes.func,
    onRemoveItem: PropTypes.func
}