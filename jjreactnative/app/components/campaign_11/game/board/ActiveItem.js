import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import FastImage from 'react-native-fast-image'

import {BasePureComponent} from "../../../common/BasePureComponent";

export default class ActiveItem extends BasePureComponent {

    render() {
        return (
            <View style={[this.props.style, {justifyContent: 'center', alignItems: 'center'}]}>
                <FastImage
                    style={{position: 'absolute', width: '100%', height: '100%'}}
                    source={require('../../../../resources/game/gift_in_box_item_active.png')}
                    resizeMode={FastImage.resizeMode.contain}/>

                <FastImage
                    style={{width: this.props.imageSize, height: this.props.imageSize}}
                    source={this.props.image}
                    resizeMode={FastImage.resizeMode.contain}/>
            </View>
        )
    }
}

ActiveItem.propTypes = {
    style: PropTypes.any,
    image: PropTypes.any,
    imageSize: PropTypes.any
}