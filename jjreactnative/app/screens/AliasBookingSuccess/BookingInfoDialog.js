import React from 'react';
import {Easing, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ModalBox from 'react-native-modalbox';

import {styles} from './styles';
import {BaseComponent} from "../../common/base/BaseComponent";

import BookingInfoContent from './BookingInfoContent';

export default class BookingInfoDialog extends BaseComponent {

    dialogState = 0;
    didInit = false;

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        };
    }

    render() {

        return (
            <ModalBox
                ref={this._onRef}
                style={styles.bookingDetailDialog}
                animationDuration={200}
                backButtonClose={true}
                swipeArea={56}
                position={'bottom'}
                backdropPressToClose={true}
                backdrop={true}
                backdropContent={<TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={this._close}/>}
                backdropOpacity={0.3}
                keyboardTopOffset={48}
                easing={Easing.linear}
                useNativeDriver={true}
                onOpened={this._onOpened}
                onClosed={this._onCloseModal}>

                {
                    !!this.state.isOpened &&
                    <BookingInfoContent item={this.props.item} screen={this.props.screen}/>
                }

            </ModalBox>
        )
    }

    _onRef = ref => {
        this.ref = ref;
        !!this.props.onRef && this.props.onRef(ref);
    }

    _onOpened = () => {
        this.dialogState += 1;
        if (!!this.didInit && this.dialogState > 0) {
            this.setState({
                isOpened: true
            });
        }
    }

    _onCloseModal = () => {
        this.dialogState = 0;
        !!this.props.onClosed && this.props.onClosed();
        this.setState({
            isOpened: false
        });
    }

    _close = () => {
        !!this.ref && this.ref.close();
    }

    componentDidMount() {
        super.componentDidMount();
        this.didInit = true;
    }
}

BookingInfoDialog.propTypes = {
    onRef: PropTypes.func,
    item: PropTypes.object,
    screen: PropTypes.string,
    onClosed: PropTypes.func
}