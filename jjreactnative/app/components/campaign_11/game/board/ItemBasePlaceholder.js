import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import FastImage from 'react-native-fast-image'

import {BasePureComponent} from "../../../common/BasePureComponent";

const styles = {};

export default class ItemBasePlaceholder extends BasePureComponent {

    constructor(props) {
        super(props);

        styles.bg = {
            width: '100%',
            height: '100%'
        };
    }

    render() {
        return (
            <View style={this.props.style}>

                <FastImage
                    style={styles.bg}
                    source={require('../../../../resources/game/gift_in_box_item.png')}
                    resizeMode={FastImage.resizeMode.contain}/>

                <FastImage
                    style={{
                        position: 'absolute',
                        width: '60%',
                        height: '60%',
                        opacity: 0.3
                    }}
                    source={this.props.image}
                    resizeMode={FastImage.resizeMode.contain}/>
            </View>
        )
    }
}

ItemBasePlaceholder.propTypes = {
    scalable: PropTypes.any,
    style: PropTypes.any,
    image: PropTypes.any
}