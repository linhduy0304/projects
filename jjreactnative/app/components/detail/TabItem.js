import React from 'react'
import {Text} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import {DIMENSION_TEXT_CONTENT, DIMENSION_TEXT_TINY} from "../../resources/dimens";
import {DEAL_TYPE_EXCLUSIVE, DEAL_TYPE_LAST_MIN, DEAL_TYPE_MOVIE} from "../../const";
import {COLOR_BLACK, COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from "../../resources/colors";
import {BaseComponent} from "../common/BaseComponent";

export default class TabItem extends BaseComponent {

    render() {
        const highlightColor = this.props.active ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE;
        const exclusiveColor = this.props.active ? COLOR_PRIMARY : COLOR_BLACK;
        const fontWeight = this.props.active ? 'bold' : 'normal';
        const highlight = this.props.name.split(":")[0];
        const deal_type = this.props.name.split(":")[1];
        const willShowExclusiveTag = (deal_type === DEAL_TYPE_EXCLUSIVE || deal_type === DEAL_TYPE_LAST_MIN || deal_type === DEAL_TYPE_MOVIE);

        return (
            <TouchableOpacity
                key={`${this.props.name}_${this.props.page}`}
                onPress={() => this.props.onPressHandler(this.props.page)}
                onLayout={this.props.onLayoutHandler}
                style={{backgroundColor: 'white'}}
            >
                <View style={{
                    height: 49,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: 'white'
                }}>
                    {willShowExclusiveTag ? <Text style={{color: exclusiveColor, fontSize: DIMENSION_TEXT_TINY, fontWeight: 'bold'}}>Độc quyền</Text> : null}
                    <Text style={{color: highlightColor, fontWeight, fontSize: DIMENSION_TEXT_CONTENT}}>
                        {highlight}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

TabItem.propTypes = {
    name: PropTypes.string,
    page: PropTypes.number,
    active: PropTypes.bool,
    onPressHandler: PropTypes.func,
    onLayoutHandler: PropTypes.func,
}
