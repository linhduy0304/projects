import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'

import ItemBasePlaceholder from './ItemBasePlaceholder'
import {BasePureComponent} from "../../../common/BasePureComponent";

const styles = {};

export default class RowPlaceholder extends BasePureComponent {

    constructor(props) {
        super(props);

        styles.itemBase = {
            width: '33.33%',
            height: '100%',
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    render() {
        return (
            <View style={this.props.style}>

                <ItemBasePlaceholder
                    style={styles.itemBase}
                    image={this.props.image1}
                    scalable={this.props.scalable}/>

                <ItemBasePlaceholder
                    style={styles.itemBase}
                    image={this.props.image2}
                    scalable={this.props.scalable}/>

                <ItemBasePlaceholder
                    style={styles.itemBase}
                    image={this.props.image3}
                    scalable={this.props.scalable}/>

            </View>
        )
    }
}

RowPlaceholder.propTypes = {
    scalable: PropTypes.any,
    style: PropTypes.any,
    image1: PropTypes.any,
    image2: PropTypes.any,
    image3: PropTypes.any,
}