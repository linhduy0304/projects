import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'

import ItemBase from './ItemBase'
import {BasePureComponent} from "../../../common/BasePureComponent";

const styles = {};

export default class Row extends BasePureComponent {

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
        console.log('Row:render', this.props);
        return (
            <View style={this.props.style}>

                <ItemBase style={styles.itemBase}
                          image={this.props.pos === 1 ? this.props.image : undefined}
                          scalable={this.props.scalable}/>

                <ItemBase style={styles.itemBase}
                          image={this.props.pos === 2 ? this.props.image : undefined}
                          scalable={this.props.scalable}/>

                <ItemBase style={styles.itemBase}
                          image={this.props.pos === 3 ? this.props.image : undefined}
                          scalable={this.props.scalable}/>

            </View>
        )
    }
}

Row.propTypes = {
    scalable: PropTypes.any,
    style: PropTypes.any,
    pos: PropTypes.any,
    image: PropTypes.any
}