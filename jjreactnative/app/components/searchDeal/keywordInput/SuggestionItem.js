import React from 'react'
import PropTypes from 'prop-types'
import {BasePureComponent} from "../../common/BasePureComponent";
import {TouchableOpacity, View} from "react-native";
import {Text} from "native-base";

export default class SuggestionItem extends BasePureComponent {

    render() {

        return (
            <TouchableOpacity style={{
                width: '100%',
                backgroundColor: 'white'
            }}
                              onPress={this._onPress}>
                <View style={{padding: 16}}>
                    <Text style={{color: '#454545', fontSize: 14}}>
                        {this.props.item.text}
                    </Text>
                </View>
                <View style={{height: 0.5, backgroundColor: '#ededed', marginLeft: 16}}/>
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        if (!!this.props.onPress) this.props.onPress(this.props.item.text)
    }
}

SuggestionItem.propTypes = {
    onPress: PropTypes.any,
    item: PropTypes.any
}