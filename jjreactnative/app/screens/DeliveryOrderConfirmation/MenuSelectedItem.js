import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

import {BaseComponent} from "../../common/base/BaseComponent";
import {styles} from "./styles";
import {DIMENSION_PADDING_MEDIUM, DIMENSION_PADDING_TINY} from "../../resources/dimens";
import {StringUtil} from "../../utils/string-util";
import Text from '../../common/view/text/JJText';
import JJIcon from '../../common/view/icon/JJIcon';
import BottomLineListItem from '../../common/view/line/BottomLineListItem';
import {COLOR_TEXT_INACTIVE} from "../../resources/colors";
import ExclusiveFlag from '../DeliveryPickMenu/ExclusiveFlag';

export default class MenuSelectedItem extends BaseComponent {

    render() {
        const {item} = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{backgroundColor: 'white'}}
                disabled={!this.props.editable}
                onPress={this._onPress}>

                <View style={styles.menuSelectedContainer}>

                    <View>
                        <ExclusiveFlag size={'small'} style={{marginTop: 3, opacity: !!item.get('is_discounted', false) ? 1 : 0.2 }}/>
                    </View>

                    <View style={styles.menuSelectedContentLayout}>

                        <Text style={{fontWeight: 'bold'}}>
                            {item.get('title', '')}
                        </Text>

                        <Text style={{color: COLOR_TEXT_INACTIVE, marginTop: DIMENSION_PADDING_TINY, fontSize: 12}}>
                            {this._getSubMenu()}
                        </Text>
                        
                        {
                            !!item.get('note', '') &&
                            <Text style={{color: COLOR_TEXT_INACTIVE, marginTop: DIMENSION_PADDING_TINY, fontSize: 12, fontStyle: 'italic',}}>
                                Ghi chú: {item.get('note')}
                            </Text>
                        }

                    </View>

                    <View style={styles.menuSelectedPriceLayout}>
                        {
                            item.get('is_discounted', false) && <Text style={{color: 'rgba(69, 69, 69,0.5)', textDecorationLine: 'line-through', marginBottom: 2}}>{StringUtil.beautyNumber(this._getTotalPrice())}đ</Text>
                        }
                        <Text>
                            {StringUtil.beautyNumber(item.get('total_price', 0))}đ
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={styles.menuSelectedQuantity}>
                                <Text style={{color: '#22C300', fontWeight: 'bold', fontSize: 12}}>
                                    x{item.get('quantity', item.get('count', 0))}
                                </Text>
                            </View>
                            {
                                !!this.props.editable &&
                                <View style={{marginLeft: 4, marginBottom: 1}}>
                                    <JJIcon
                                        color={COLOR_TEXT_INACTIVE}
                                        name={'chevron_up_o'}
                                        size={7}/>

                                    <JJIcon
                                        color={COLOR_TEXT_INACTIVE}
                                        name={'chevron_down_o'}
                                        size={7}/>
                                </View>
                            }
                        </View>
                    </View>
                </View>

                {
                    !this.props.lastItem &&
                    <BottomLineListItem
                        style={{
                            marginLeft: DIMENSION_PADDING_MEDIUM,
                            marginRight: DIMENSION_PADDING_MEDIUM
                        }}/>
                }

            </TouchableOpacity>
        )
    }

    _getSubMenu = () => {
        if (!this.props.item) return '';
        let note = '';
        if (!!this.props.item.get('customizations')) {
            this.props.item.get('customizations').map(c => {
                if (c.get('options')) {
                    c.get('options').map(o => {
                        if (!!o.get('selected', false)) {
                            if (note.length > 0) note += '\n';
                            note += o.get('title');
                        }
                    })
                }
            });
        }
        else if (!!this.props.item.get('options')) {
            this.props.item.get('options').map(o => {
                if (note.length > 0) note += '\n';
                note += o.get('title');
            });
        }

        return note;
    }

    _getTotalPrice = () => {
        if (!this.props.item) return 0;
        if (!this.props.item.get('customizations') && !this.props.item.get('options')) return this.props.item.get('original_price', 0);
        let toppingPrice = 0;

        if (!!this.props.item.get('customizations')) {
            this.props.item.get('customizations').map(c => {
                if (!!c.get('options')) {
                    toppingPrice += c.get('options').filter(o => !!o.get('selected')).reduce((acc,o) => acc + o.get('original_price', 0), 0);
                }
            });
        }
        else if (!!this.props.item.get('options')) {
            toppingPrice += this.props.item.get('options').reduce((acc,o) => acc + o.get('original_price', 0), 0);
        }

        const quantity = !!this.props.item.get('quantity') ? this.props.item.get('quantity', 1) : this.props.item.get('count', 1)

        return (this.props.item.get('original_price', 0) + toppingPrice) * quantity;
    }

    _onPress = () => {
        !!this.props.onPress && this.props.onPress(this.props.item);
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (!nextProps.item || !this.props.item) return true;
        if (nextProps.item.get('idPicking') !== this.props.item.get('idPicking')) return true;
        if (nextProps.item.get('quantity') !== this.props.item.get('quantity')) return true;
        if (nextProps.item.get('note') !== this.props.item.get('note')) return true;
        if (nextProps.item.get('total_price') !== this.props.item.get('total_price')) return true;
        if (!!nextProps.item.get('customizations') && !nextProps.item.get('customizations').equals(this.props.item.get('customizations'))) return true;

        return false;
    }
}

MenuSelectedItem.defaultProps = {
    editable: true
}

MenuSelectedItem.propTypes = {
    item: PropTypes.object,
    editable: PropTypes.bool,
    lastItem: PropTypes.bool,
    onPress: PropTypes.func
}
