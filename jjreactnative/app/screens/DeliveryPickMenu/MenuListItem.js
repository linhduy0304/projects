import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import {BaseComponent} from "../../common/base/BaseComponent";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_TINY,
} from "../../resources/dimens";
import JJIcon from '../../common/view/icon/JJIcon';
import BottomLineListItem from '../../common/view/line/BottomLineListItem';
import {styles} from './styles';
import Text from '../../common/view/text/JJText';
import {StringUtil} from '../../utils/string-util';
import ExclusiveFlag from './ExclusiveFlag';
import ExclusiveHighlight from './ExclusiveHighlight';

export default class MenuListItem extends BaseComponent {


    render() {

        const {item} = this.props;
        if (!item) return null;

        return (
            <View style={{backgroundColor: 'white'}}>

                <View style={styles.menuItemContainer}>

                    {
                        !!item.get('image') &&
                        <FastImage
                            style={styles.menuImage}
                            source={{uri: StringUtil.addSizeToImageUrl(item.get('image', ''), 76, 0)}}
                            resizeMode={FastImage.resizeMode.contain}/>
                    }

                    {
                        !item.get('image') &&
                        <FastImage
                            style={styles.menuImage}
                            source={require('../../resources/images/delivery/placeholder_product.png')}
                            resizeMode={FastImage.resizeMode.contain}/>
                    }

                    {
                        !!item.get('is_discounted', false) &&
                        <ExclusiveHighlight/>
                    }

                    <View style={styles.menuItemContentLayout}>

                        <Text style={{fontWeight: 'bold'}}>
                            {item.get('title', '')}
                        </Text>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: DIMENSION_PADDING_TINY}}>
                            <Text>
                                {StringUtil.beautyNumber(item.get('original_price', 0))}
                            </Text>
                            {
                                item.get('totalQuantity', 0) > 0 &&
                                <View style={styles.menuItemQuantity}>
                                    <Text style={{color: '#22C300', fontWeight: 'bold'}}>
                                        x{item.get('totalQuantity', '')}
                                    </Text>
                                </View>
                            }
                        </View>

                    </View>

                    <TouchableOpacity
                        style={styles.menuPlusButton}
                        activeOpacity={0.9}
                        onPress={this._onPress}>
                        <View style={styles.menuPlusIcon}>
                            <JJIcon
                                color={'white'}
                                size={14}
                                name={'plus_o'}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <BottomLineListItem
                    style={{
                        marginLeft: DIMENSION_PADDING_MEDIUM,
                        marginRight: DIMENSION_PADDING_MEDIUM
                    }}/>

            </View>
        )
    }

    _onPress = () => {
        !!this.props.onPress && this.props.onPress(this.props.item);
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (!nextProps.item) return true;
        if (!this.props.item) return true;
        if (nextProps.item.get('id') !== this.props.item.get('id')) return true;
        if (nextProps.item.get('itemIndex') !== this.props.item.get('itemIndex')) return true;
        if (nextProps.item.get('totalQuantity', 0) !== this.props.item.get('totalQuantity', 0)) return true;

        return false;
    }
}

MenuListItem.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func
}