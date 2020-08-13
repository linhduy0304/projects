import React from 'react';

export default class BaseScreen extends React.Component {

    // canRender = true;
    needReRender = false;
    mounted = false;

    _safeUpdate() {
        if (this.mounted) this.forceUpdate();
    }

    onFocus = payload => {
        //TODO: the screen is visible
        console.debug(`${this.TAG}:didFocus`, payload, this.state, this.canRender, this.needReRender);
        if (this.needReRender) {
            this.needReRender = false;
            this._safeUpdate();
        }
    }

    // onUnFocus = payload => {
    //     //TODO: the screen is invisible
    //     // console.debug(`${this.TAG}:willBlur`, payload);
    //     this.canRender = false;
    // }

    componentWillMount(): void {
        console.debug(`${this.TAG}:Base:componentWillMount`);
        // this.willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
        //     this.onUnFocus(payload)
        // });
    }

    componentDidMount(): void {
        console.debug(`${this.TAG}:Base:componentDidMount`);
        this.mounted = true;
        this.didFocusSubscription = this.props.navigation.addListener('didFocus', payload => {
            this.onFocus(payload)
        });
    }

    componentWillUnmount(): void {
        // console.log(`${this.TAG}:componentWillUnmount`);
        this.mounted = false;
        // !!this.willBlurSubscription && this.willBlurSubscription.remove();
        !!this.didFocusSubscription && this.didFocusSubscription.remove();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.debug(`${this.TAG}:Base:componentDidUpdate`);
        this.needReRender = false;
    }
    //
    // componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    //     console.log(`${this.TAG}:componentWillReceiveProps`);
    // }
    //
    // componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    //     console.log(`${this.TAG}:componentDidCatch`);
    // }
    //
    // componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
    //     console.log(`${this.TAG}:componentWillUpdate`);
    // }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        console.debug(`${this.TAG}:Base:shouldComponentUpdate:`, nextState, this.state, this.needReRender);
        return this.needReRender && !!this.props.navigation && !!this.props.navigation.isFocused();
    }
}