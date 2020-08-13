import React from 'react'
import PropTypes from 'prop-types'
import {BasePureComponent} from "../../common/BasePureComponent";
import {TouchableOpacity, View} from "react-native";
import {Text} from "native-base";
import JJIcon from "../../common/JJIcon";

export default class HistoryItem extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity style={{
                width: '100%',
                backgroundColor: 'white'
            }}
                              onPress={this._onPress}>
                <View style={{padding: 16}}>
                    <Text style={{color: '#454545', fontSize: 14, paddingRight: 24}}>
                        {this.props.item.keyword}
                    </Text>
                    <TouchableOpacity style={{padding: 8, position: 'absolute', top: 10, right: 8}}
                                      onPress={this._onDeletePress}>
                        <JJIcon name={"x_circle_o"}
                                size={16}
                                color={'rgba(69, 69, 69, 0.2)'}/>
                    </TouchableOpacity>
                </View>
                <View style={{height: 1, backgroundColor: '#ededed', marginLeft: 16}}/>
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        if (!!this.props.onPress) this.props.onPress(this.props.item.keyword)
    }

    _onDeletePress = () => {
        if (!!this.props.onDeletePress) this.props.onDeletePress(this.props.item, false);
    }
}

HistoryItem.propTypes = {
    onPress: PropTypes.any,
    onDeletePress: PropTypes.any,
    item: PropTypes.any
}