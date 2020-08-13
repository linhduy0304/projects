import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import FastImage from 'react-native-fast-image'

import FadeView from '../../../common/view/FadeView'
import ActiveItem from './ActiveItem'
import {StringUtil} from '../../../../utils/string-util'
import {BasePureComponent} from "../../../common/BasePureComponent";

const styles = {};

export default class ItemBase extends BasePureComponent {

    constructor(props) {
        super(props);

        styles.bg = {
            width: '100%',
            height: '100%'
        };

        styles.imageBg = {
            position: 'absolute',
            width: '100%',
            height: '100%',
        };

        styles.imageActiveBg = {
            width: '100%',
            height: '100%',
        };

        styles.image = {
            width: props.scalable * 44,
            height: props.scalable * 44,
        }
    }

    render() {
        console.log('ItemBase:render', this.props);
        return (
            <View style={this.props.style}>

                <FastImage
                    style={styles.bg}
                    source={require('../../../../resources/game/gift_in_box_item.png')}
                    resizeMode={FastImage.resizeMode.contain}/>

                <FadeView style={styles.imageBg}
                          visible={!StringUtil.isEmpty(this.props.image)}>
                    <ActiveItem style={styles.imageActiveBg}
                                image={this.props.image}
                                imageSize={'60%'}/>
                </FadeView>
            </View>
        )
    }
}

ItemBase.propTypes = {
    scalable: PropTypes.any,
    style: PropTypes.any,
    image: PropTypes.any
}