import React, { PureComponent } from "react";
import { ViewPropTypes, NativeModules } from "react-native";
import PropTypes from "prop-types";


const { ToastManager } = NativeModules;

class ToastIOS extends PureComponent {
    static propTypes = {
        ...ViewPropTypes,

        title: PropTypes.string,
    };

    static defaultProps = {
        title: "",
    };

    static Duration = {
        Short: 0,
        Long: 1
    };

    static Show(props) {
        if (!props) props = {};
        if (props.title === undefined) props.title = ToastIOS.defaultProps.title;

        if (!!ToastManager) ToastManager.Show(props);
    }

    constructor(props) {
        super(props);
        console.log('ToastManager:constructor');
    }


    componentDidMount() {
        console.log('ToastManager:componentDidMount');
    }

    componentDidUpdate() {
        console.log('ToastManager:componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('ToastManager:componentWillUnmount');
    }

    show() {}

    render() {
        console.log('ToastManager:render');
        return null;
    }
}

export { ToastIOS };
