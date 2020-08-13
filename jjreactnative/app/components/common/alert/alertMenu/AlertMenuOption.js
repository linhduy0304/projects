import React from 'react'
import PropTypes from 'prop-types'
import {Modal, View, TouchableOpacity} from 'react-native'

import {BaseComponent} from "../../BaseComponent";
import {DIMENSION_PADDING_LARGE, DIMENSION_RADIUS_MEDIUM} from "../../../../resources/dimens";
import MenuOptionItem from './MenuOptionItem'

export default class AlertMenuOption extends BaseComponent {

    render() {
        return (
            <Modal animationType="fade"
                   visible={this.props.visible}
                   transparent={true}
                   onRequestClose={this._onItemSelected}
                   onDismiss={this._onItemSelected}>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: DIMENSION_PADDING_LARGE
                    }}
                    onPress={this._onItemSelected}>
                    <View style={{width: '100%', backgroundColor: 'white', borderRadius: DIMENSION_RADIUS_MEDIUM}}>
                        {
                            !!this.props.options &&
                            this.props.options.map((option, index) => {
                                return (
                                    <MenuOptionItem key={`menu_option_${index}_${option.id}`}
                                                    onItemSelected={this._onItemSelected}
                                                    item={option}
                                                    showBottomLine={index < this.props.options.length - 1}/>
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>

            </Modal>
        )
    }

    _onItemSelected = (item) => {
        if (!!this.props.onItemSelected) this.props.onItemSelected(!!item ? item : {id: 'cancel'});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.options) return false;
        if (nextProps.options !== undefined && this.props.options === undefined) return true;
        if (!this.props.options) return false;
        if (nextProps.visible !== this.props.visible) return true;
        return false;
    }
}

AlertMenuOption.propTypes = {
    options: PropTypes.any,
    onItemSelected: PropTypes.any,
    visible: PropTypes.any
}