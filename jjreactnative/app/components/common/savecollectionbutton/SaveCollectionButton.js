import { connect } from "react-redux";
import { Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types'

import { COLOR_PRIMARY } from '../../../resources/colors';
import JJIcon from '../JJIcon';
import { saveCollection } from "../../collection/data/action";
import {BaseComponent} from "../BaseComponent";
import {DIMENSION_PADDING_SMALL} from "../../../resources/dimens";

class SaveCollectionButton extends BaseComponent {

    render() {
        const { iconSize, item } = this.props;
        return (
            <TouchableOpacity
                onPress={this.saveCollection}
                style={[{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: DIMENSION_PADDING_SMALL
                }, this.props.style]}>
                <JJIcon
                    name={'bookmark_o'}
                    style={{ marginTop: 2, marginRight: 2 }}
                    size={iconSize !== undefined ? iconSize : 14}
                    color={!!item.is_save ? COLOR_PRIMARY : 'white'}
                />
                <Text style={{ fontSize: 14, color: !!item.is_save ? COLOR_PRIMARY : 'white'}}>
                    {item.save_count}
                </Text>
            </TouchableOpacity >
        );
    }

    saveCollection = () => {
        if (!this.props.isLoginned) {
            this.props.navigation.navigate(
                'Login',
                {
                    from: {
                        action_location: 'save_col_button',
                        action_name: 'click_save_col',
                    },
                    action: {
                        name: 'click_save_col',
                        category: 'login'
                    }
                });
            return;
        }

        const item = this.props.item;
        this.props.dispatch(saveCollection(item.slug, item.is_save, item.save_count));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.item && this.props.item === undefined) return true;
        if (nextProps.item === undefined || nextProps.item === null) return false;
        if (this.props.item === undefined || this.props.item === null) return false;
        if (nextProps.item.id !== this.props.item.id) return true;
        if (nextProps.item.is_save !== this.props.item.is_save) return true;
        return false;
    }
}

SaveCollectionButton.propTypes = {
    item: PropTypes.any,
    iconSize: PropTypes.any,
    style: PropTypes.any,
    navigation: PropTypes.any
}

const mapStateToProps = (state, props) => {
    return {
        isLoginned: state.loginReducer.isLoginned,
    }
};

export default connect(mapStateToProps)(SaveCollectionButton);
