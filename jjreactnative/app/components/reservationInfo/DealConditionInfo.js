import React from 'react';
import {Text} from 'native-base';
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CIcon from '../common/CIcon';
import {BasePureComponent} from "../common/BasePureComponent";
import JJTextViewHtml from '../common/view/JJTextViewHtml';
import {DIMENSION_PADDING_MEDIUM, DIMENSION_TEXT_CONTENT} from "../../resources/dimens";
import {COLOR_TEXT_BLACK_1} from "../../resources/colors";

export default class DealConditionInfo extends BasePureComponent {

    constructor() {
        super();
        this.state = {showConditionInfo: true}
    }

    render() {
        let {showConditionInfo} = this.state;
        let {condition} = this.props;
        return (
            <View>
                <TouchableOpacity style={styles.conditionHeader}
                                  onPress={this._showConditionInfo}>
                    <Text style={{flex: 1, color: '#666666', fontWeight: 'bold', fontSize: 14}}
                          uppercase={true}>
                        ĐIỀU KIỆN SỬ DỤNG
                    </Text>
                    <CIcon name={showConditionInfo ? 'angle-up' : 'angle-down'}
                           family={'FontAwesome'}
                           style={{color: '#666666'}}/>
                </TouchableOpacity>
                {
                    !!showConditionInfo &&
                    <JJTextViewHtml
                        text={condition}
                        fontColor={COLOR_TEXT_BLACK_1}
                        fontSize={DIMENSION_TEXT_CONTENT}
                        padding={DIMENSION_PADDING_MEDIUM}/>
                }
            </View>
        )
    }

    _showConditionInfo = () => {
        this.setState(prevState => {
                return {showConditionInfo: !prevState.showConditionInfo};
            }
        )
    }
}

DealConditionInfo.propTypes = {
    condition: PropTypes.string
}

const styles = StyleSheet.create({
    conditionHeader: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: '#ededed',
        flexDirection: 'row',
        alignItems: 'center'
    },
});