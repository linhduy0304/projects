import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'

import RowPlaceholder from './RowPlaceholder'
import {BasePureComponent} from "../../../common/BasePureComponent";

const styles = {};

export default class GridGameBoardPlaceholder extends BasePureComponent {

    constructor(props) {
        super(props);

        styles.row = {
            width: '100%',
            height: '28%',
            flexDirection: 'row'
        };
    }

    render() {
        return (
            <View style={this.props.style}>

                <RowPlaceholder
                    scalable={this.props.scalable}
                    image1={this.props.giftList[0]}
                    image2={this.props.giftList[1]}
                    image3={this.props.giftList[2]}
                    style={styles.row}/>

                <RowPlaceholder
                    scalable={this.props.scalable}
                    image1={this.props.giftList[3]}
                    image2={this.props.giftList[4]}
                    image3={this.props.giftList[5]}
                    style={styles.row}/>

                <RowPlaceholder
                    scalable={this.props.scalable}
                    image1={this.props.giftList[6]}
                    image2={this.props.giftList[7]}
                    image3={this.props.giftList[8]}
                    style={styles.row}/>

            </View>
        )
    }
}

GridGameBoardPlaceholder.propTypes = {
    scalable: PropTypes.any,
    style: PropTypes.any,
    giftList: PropTypes.any
}