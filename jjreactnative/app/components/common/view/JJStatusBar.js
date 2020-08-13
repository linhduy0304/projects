import React from 'react'
import {StatusBar, View, Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import {BaseComponent} from "../../../common/base/BaseComponent";

const { width } = Dimensions.get("window");
const height = StatusBar.currentHeight;

export default class JJStatusBar extends BaseComponent {

    render() {
        return (
            <View style={{width, height}}>
                <StatusBar backgroundColor={!!this.props.removeSetBackgroundColor ? undefined : !!this.props.bgColor ? this.props.bgColor : 'transparent'}
                           barStyle={this.props.styleColor === 'light' ? 'light-content' : 'dark-content' }
                           translucent={true}
                           animated={true}/>
            </View>
        )
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if (nextProps.bgColor !== this.props.bgColor) return true;
        if (nextProps.styleColor !== this.props.styleColor) return true;
        if (nextProps.removeSetBackgroundColor !== this.props.removeSetBackgroundColor) return true;
        return false;
    }

    componentDidMount() {
        super.componentDidMount();
        StatusBar.setBarStyle(this.props.styleColor === 'light' ? 'light-content' : 'dark-content', true);
    }
}

JJStatusBar.propTypes = {
    styleColor: PropTypes.any,
    bgColor: PropTypes.any,
    removeSetBackgroundColor: PropTypes.any
}