import { View, TouchableOpacity, SafeAreaView} from 'react-native';
import React  from 'react';
import PropTypes from 'prop-types'

import {BasePureComponent} from "../../base/BasePureComponent";
import JJStatusBar from './JJStatusBar';
import {headerStyles} from './styles';
import JJIcon from '../icon/JJIcon';
import {COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../resources/colors";
import {AppConfig} from '../../config';
import Text from '../text/JJText';
import {getPaddingTopBar} from "../../../utils/common-utils";

const paddingTopBar = getPaddingTopBar();
export default class ScreenTitleHeader extends BasePureComponent {

    render() {
        return (
            <View style={{width: '100%'}}>

                <JJStatusBar/>

                <View style={[headerStyles.container, {paddingTop: paddingTopBar}]}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={headerStyles.buttonBack}
                        onPress={this.props.onGoBackPress}>

                        <JJIcon
                            size={20}
                            name={this.props.backIcon}
                            color={this.props.backIconColor}/>

                    </TouchableOpacity>

                    <View style={headerStyles.titleLayout}>

                        {
                            !!this.props.subTitle &&
                            <Text style={headerStyles.textSubTitle}>
                                {this.props.subTitle}
                            </Text>
                        }

                        <Text style={[headerStyles.textTitle, {color: this.props.titleColor}]}>
                            {this.props.title}
                        </Text>

                    </View>

                    <View style={{width: AppConfig.headerHeight}}/>


                </View>
            </View>
        );
    }
}

ScreenTitleHeader.defaultProps = {
    title: '',
    titleColor: COLOR_TEXT_BLACK_1,
    backIcon: 'chevron_left_o',
    backIconColor: COLOR_TEXT_INACTIVE
};

ScreenTitleHeader.propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.any,
    subTitle: PropTypes.string,
    backIcon: PropTypes.string,
    backIconColor: PropTypes.any,
    onGoBackPress: PropTypes.func
};
