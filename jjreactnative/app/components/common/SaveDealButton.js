import { Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import React from 'react';
import PropTypes from 'prop-types'

import {COLOR_PRIMARY, COLOR_TEXT_INACTIVE} from '../../resources/colors';
import JJIcon from './JJIcon';
import {BaseComponent} from "./BaseComponent";
import {DIMENSION_PADDING_TINY} from "../../resources/dimens";
import {saveDeal} from "../detail/action";

class SaveDealButton extends BaseComponent {

    render() {
        const { iconSize, deal } = this.props;
        const { is_saved, save_count } = deal;
        return (
            <TouchableOpacity
                onPress={this._onSaveDealClicked}
                style={[{
                    paddingTop: DIMENSION_PADDING_TINY,
                    paddingBottom: DIMENSION_PADDING_TINY,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }, this.props.style]}>
                <JJIcon
                    name={'bookmark_o'}
                    style={{ marginTop: 2, marginRight: 2 }}
                    size={iconSize !== undefined ? iconSize : 14}
                    color={is_saved ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE}
                />
                <Text style={{ fontSize: 14, color: is_saved ? COLOR_PRIMARY : COLOR_TEXT_INACTIVE }}>
                    {save_count}
                </Text>
            </TouchableOpacity>
        );
    }

    _onSaveDealClicked = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'save_deal_button',
                        action_name: 'click_save_deal',
                    },
                    action: {
                        name: 'click_save_deal',
                        category: 'login'
                    }
                });
            return;
        }

        this.props.dispatch(
            saveDeal(
                this.props.deal.id,
                this.props.deal.is_saved,
                this.props.deal.save_count
            )
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.deal && this.props.deal === undefined) return true;
        if (nextProps.deal === undefined || nextProps.deal === null) return false;
        if (this.props.deal === undefined || this.props.deal === null) return false;
        if (nextProps.deal.id !== this.props.deal.id) return true;
        if (nextProps.deal.is_saved !== this.props.deal.is_saved) return true;
        if (nextProps.deal.save_count !== this.props.deal.save_count) return true;
        return false;
    }
}

SaveDealButton.propTypes = {
    navigation: PropTypes.any,
    deal: PropTypes.any,
    iconSize: PropTypes.any,
    style: PropTypes.any
}

const mapStateToProps = (state, props) => {
    return {
        isLoginned: state.loginReducer.isLoginned,
    }
};

export default connect(mapStateToProps)(SaveDealButton);
