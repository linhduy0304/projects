import React from 'react';

export class BaseComponent extends React.Component {
    mounted = false;

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    // setState(newState) {
    //     if (this.mounted) {
    //         super.setState(newState);
    //     }
    // }

    async setState(newState, callback) {
        if (this.mounted) {
            super.setState(newState, callback);
        }
    }

    async safeUpdate() {
        if (this.mounted) {
            this.forceUpdate();
        }
    }
}