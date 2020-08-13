import { connect } from "react-redux";
import { TouchableOpacity } from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'

import { COLOR_BLACK, COLOR_PRIMARY } from '../../resources/colors';
import JJIcon from './JJIcon';
import {BaseComponent} from "./BaseComponent";
import {followBrand} from "../detail/action";

class FollowButton extends BaseComponent {

    render() {
        const { iconSize, deal } = this.props;
        return (
            <TouchableOpacity
                onPress={this.followBrand}
                style={[{
                    justifyContent: 'center',
                    alignItems: 'center'
                }, this.props.style]}>
                <JJIcon
                    name={'plus_o'}
                    size={iconSize !== undefined ? iconSize : 16}
                    color={!!deal.is_following ? COLOR_PRIMARY : COLOR_BLACK}
                />
            </TouchableOpacity>
        );
    }

    followBrand = () => {
        if (!this.props.deal || !this.props.deal.brand) {
            return;
        }

        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'follow_button',
                        action_name: 'click_follow_brand',
                    },
                    action: {
                        name: 'click_follow_brand',
                        category: 'login'
                    }
                });
            return;
        }

        this.props.dispatch(
            followBrand(
                this.props.deal.brand.id,
                this.props.deal.is_following
            )
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.deal && this.props.deal === undefined) return true;
        if (nextProps.deal === undefined || nextProps.deal === null) return false;
        if (this.props.deal === undefined || this.props.deal === null) return false;
        if (nextProps.deal.id !== this.props.deal.id) return true;
        if (nextProps.deal.is_following !== this.props.deal.is_following) return true;
        return false;
    }
}

FollowButton.propTypes = {
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

export default connect(mapStateToProps)(FollowButton);
