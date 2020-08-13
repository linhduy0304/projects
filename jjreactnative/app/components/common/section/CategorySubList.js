import { View } from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'

import Section from "../Section";
import {DIMENSION_PADDING_SMALL} from "../../../resources/dimens";
import {BaseComponent} from "../BaseComponent";
import SubListPlaceholder from './SubListPlaceholder'
import SubList from "../../category/subCategory/SubList";

export default class CategorySubList extends BaseComponent {

    render() {
        if (this.props.sublist === undefined || this.props.sublist === null) return <SubListPlaceholder/>;
        return (
            <View>
                <Section title={'BẠN CẦN KHUYẾN MÃI GÌ?'}/>
                <SubList sublist={this.props.sublist}
                         screenType={this.props.screenType}
                         navigation={this.props.navigation}
                         marginTop={DIMENSION_PADDING_SMALL}/>
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.sublist && !nextProps.sublist.equals(this.props.sublist)) return true;
        return false;
    }
}

CategorySubList.propTypes = {
    sublist: PropTypes.any,
    screenType: PropTypes.any,
    navigation: PropTypes.any,
};