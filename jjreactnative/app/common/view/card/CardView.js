import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {BasePureComponent} from "../../base/BasePureComponent";
import SectionHeader from '../header/SectionHeader';
import {DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM} from "../../../resources/dimens";

export default class CardView extends BasePureComponent {

    render() {

        return (
            <View style={[this.props.style, styles.container]}>
                <SectionHeader
                    style={styles.header}
                    title={this.props.title}
                    rightTitle={this.props.rightTitle}
                    onTitlePressed={this.props.onTitlePressed}
                    onRightTitlePressed={this.props.onRightTitlePressed}/>
                {this.props.children}
            </View>
        )
    }
}

CardView.propTypes = {
    style: PropTypes.any,
    children: PropTypes.any,
    title: PropTypes.string,
    rightTitle: PropTypes.string,
    onTitlePressed: PropTypes.func,
    onRightTitlePressed: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: DIMENSION_RADIUS_MEDIUM
    },
    header: {
        paddingTop: DIMENSION_PADDING_MEDIUM,
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM
    }
});