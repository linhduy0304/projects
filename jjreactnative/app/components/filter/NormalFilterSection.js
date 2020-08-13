import React from 'react'
import PropTypes from 'prop-types'
import {View} from "react-native";

import {BaseComponent} from "../common/BaseComponent";
import NormalFilterItem from "./NormalFilterItem";
import SeeMoreItem from "./SeeMoreItem";

export default class NormalFilterSection extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isExpand: false
        }
    }


    render() {

        return (
            <View>
                {
                    this.props.filter.tags
                        .filter((item, i) => this.state.isExpand ? i < 100 : i < 5)
                        .map((item, i) => <NormalFilterItem key={`normal_filter_${i}_${!!item ? item.key : this.props.filter.type}`}
                                                            onItemSelected={this.props.onPress}
                                                            item={item}/>)
                }
                {
                    this.props.filter.tags.length > 5 &&
                    <SeeMoreItem onPress={this._onExpandItemClicked} isExpand={this.state.isExpand}/>
                }
            </View>
        )
    }

    _onExpandItemClicked = () => this.setState({isExpand: !this.state.isExpand});

    shouldComponentUpdate(nextProps, nextState) {
        if (!!nextProps.filter && this.props.filter === undefined) return true;
        if (this.props.filter === undefined) return false;
        if (nextProps.filter.tags.length !== this.props.filter.tags.length) return false;
        if (nextProps.filter.selectedCount !== this.props.filter.selectedCount) return true;
        if (nextProps.filter.type !== this.props.filter.type) return true;
        if (nextState.isExpand !== this.state.isExpand) return true;

        return false;
    }
}

NormalFilterSection.propTypes = {
    filter: PropTypes.any,
    onPress: PropTypes.any
}