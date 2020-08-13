import {StyleSheet} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import React, {Component} from 'react';

import AllStore from './AllStore';
import ApplyStore from './ApplyStore';
import JJHeader from '../../common/JJHeader';
import {COLOR_GRAY_BG_2, COLOR_LINE, COLOR_TEXT_BLACK_1} from "../../../resources/colors";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_RADIUS_MEDIUM, DIMENSION_TEXT_CONTENT
} from "../../../resources/dimens";

export default class FoodyReview extends Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        const {deal} = this.props.navigation.state.params;
        return (
            <Container style={{backgroundColor: 'white'}}>
                <JJHeader
                    navigation={this.props.navigation}
                    title={'ĐÁNH GIÁ QUA FOODY'}
                />
                <Tabs initialPage={0}
                      locked={true}
                      style={{backgroundColor: 'white', marginTop: DIMENSION_PADDING_MEDIUM}}
                      tabBarUnderlineStyle={{height: 0, backgroundColor: 'white'}}
                      tabContainerStyle={{elevation: 0, borderColor: 'white'}}>

                    <Tab heading={'Cửa hàng áp dụng'}
                         textStyle={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                         activeTextStyle={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                         tabStyle={[styles.tabBarLeft, {backgroundColor: 'white'}]}
                         activeTabStyle={[styles.tabBarLeft, {backgroundColor: COLOR_GRAY_BG_2}]}>

                        <ApplyStore
                            deal={deal}
                            navigation={this.props.navigation}/>
                    </Tab>

                    <Tab heading={'Tất cả các cửa hàng'}
                         textStyle={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                         activeTextStyle={{fontSize: DIMENSION_TEXT_CONTENT, color: COLOR_TEXT_BLACK_1}}
                         tabStyle={[styles.tabBarRight, {backgroundColor: 'white'}]}
                         activeTabStyle={[styles.tabBarRight, {backgroundColor: COLOR_GRAY_BG_2}]}>

                        <AllStore
                            deal={deal}
                            navigation={this.props.navigation}/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    tabBarLeft: {
        borderWidth: 1,
        borderColor: COLOR_LINE,
        borderRightWidth: 0.5,
        height: 38,
        borderTopLeftRadius: DIMENSION_RADIUS_MEDIUM,
        borderBottomLeftRadius: DIMENSION_RADIUS_MEDIUM,
        marginLeft: DIMENSION_PADDING_MEDIUM,
    },
    tabBarRight: {
        borderWidth: 1,
        borderColor: COLOR_LINE,
        borderLeftWidth: 0.5,
        height: 38,
        borderTopRightRadius: DIMENSION_RADIUS_MEDIUM,
        borderBottomRightRadius: DIMENSION_RADIUS_MEDIUM,
        marginRight: DIMENSION_PADDING_MEDIUM,
    }
})