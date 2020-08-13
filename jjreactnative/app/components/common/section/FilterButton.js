import { Text } from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'

import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from '../../../resources/colors';
import JJIcon from '../JJIcon';
import {
    DIMENSION_TEXT_SUB,
    DIMENSION_TEXT_TINY
} from "../../../resources/dimens";
import {ConfigDb} from '../../../api/storage/ConfigDb'
import {BaseComponent} from "../BaseComponent";
import PopoverGuideView from '../view/PopoverGuideView'

class FilterButton extends BaseComponent {

    constructor() {
        super();
        this.state = {
            popoverVisible: false
        };
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    ref={this._onButtonFilterRef}
                    onPress={this.props.onPress}
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <JJIcon name={'filter_o'} size={16} color={COLOR_TEXT_INACTIVE} />
                    <Text style={{ marginLeft: 4, fontSize: DIMENSION_TEXT_SUB, color: COLOR_TEXT_INACTIVE, marginBottom: 2 }}>
                        Lọc
                    </Text>
                    {this.renderNumberFilterIfNeed()}
                </TouchableOpacity>

                {
                    !!this.state.popoverVisible &&
                    <PopoverGuideView type={'filter'}
                                      getAnchorView={this._getFilterButtonAnchorViewPopover}
                                      position={'bottom'}
                                      navigation={this.props.navigation}
                                      onShowPopover={this._onClosePopover}/>
                }
            </View>
        );
    }

    renderNumberFilterIfNeed = () => {
        if (this.props.badgeNumber <= 0) return null;
        return (
            <View style={{
                borderRadius: 8,
                height: 16,
                minWidth: 16,
                paddingLeft: 4,
                paddingRight: 4,
                backgroundColor: COLOR_PRIMARY,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 4,
                left: 0,
            }}>
                <Text style={{ color: 'white', fontSize: DIMENSION_TEXT_TINY }}>
                    {this.props.badgeNumber}
                </Text>
            </View>
        )
    }

    _onButtonFilterRef = (ref) => this.buttonFilterRef = ref;

    _getFilterButtonAnchorViewPopover = () => this.buttonFilterRef;

    _onClosePopover = () => {
        this.setState({popoverVisible: false});
        ConfigDb.filterButtonPopoverVisible();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.badgeNumber !== this.props.badgeNumber ||
            nextState.popoverVisible !== this.state.popoverVisible;
    }

    componentDidMount() {
        super.componentDidMount();
        if (!!this.props.disablePopover) return;

        if (!ConfigDb.hasVisibleFilterButtonPopover()) {
            this.setState({
                popoverVisible: true
            })
        }
    }
}

FilterButton.propTypes = {
    badgeNumber: PropTypes.any,
    disablePopover: PropTypes.any,
    onPress: PropTypes.any
}

export default FilterButton;
