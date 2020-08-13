import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { BasePureComponent } from '../../base/BasePureComponent';
import { COLOR_PRIMARY, COLOR_TEXT_INACTIVE } from '../../../resources/colors';
import { Spinner, Text } from 'native-base';
import { DIMENSION_PADDING_MEDIUM, DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT } from '../../../resources/dimens';
import FadeInView from '../FadeInView';
import {AnalyticsHelper} from '../../analytics';

export default class LoadingViewPopup extends BasePureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: !!props.visible
        };
    }

    render() {
        let visible = this.state.visible;

        if (!visible) return null;

        const backgroundColor = !!this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor } : undefined;

        return (
            <FadeInView style={[styles.container, backgroundColor, this.props.style]} duration={350}>
                <View style={styles.content}>
                    <Spinner color={COLOR_PRIMARY} />
                    <Text style={styles.text}>Đang xử lý...</Text>
                </View>
            </FadeInView>
        );
    }

    componentDidMount() {
        super.componentDidMount();

        if (!!this.state.visible) {
            AnalyticsHelper.trackItemImpression(
                this.props.situation,
                'show_popup_loading'
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevState.visible !== this.state.visible) {
            AnalyticsHelper.trackItemImpression(
                this.props.situation,
                (!!this.state.visible ? 'show' : 'hide') + '_popup_loading'
            )
        }
    }

    componentWillUnmount() {
        if (!this.state.visible) {
            AnalyticsHelper.trackItemImpression(
                this.props.situation,
                'hide_popup_loading'
            )
        }
        this.setState({ visible: false });
        super.componentWillUnmount();
    }
}

LoadingViewPopup.propTypes = {
    situation: PropTypes.object,
    visible: PropTypes.any,
    backgroundColor: PropTypes.any,
    style: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        borderRadius: DIMENSION_RADIUS_MEDIUM,
        borderWidth: 1,
        borderColor: 'white',
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        elevation: 2,
        shadowColor: 'white',
        shadowOpacity: 0.5,
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 2,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: DIMENSION_PADDING_MEDIUM
    },
    text: {
        paddingLeft: DIMENSION_PADDING_MEDIUM,
        paddingRight: DIMENSION_PADDING_MEDIUM,
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_CONTENT,
        textAlignVertical: 'center',
        textAlign: 'center'
    }
});
