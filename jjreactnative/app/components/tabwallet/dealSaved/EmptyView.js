import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import FastImage from 'react-native-fast-image'

import JJIcon from '../../common/JJIcon'
import {COLOR_GRAY_BG, COLOR_PRIMARY} from "../../../resources/colors";
import ButtonNonFillNormal from "../../common/button/ButtonNonFillNormal";

export default class EmptyView extends React.PureComponent {

    render() {
        let {error, onRefresh, onOpenMarketTabSelected} = this.props;
        if (error === undefined || error === null) error = false;

        return (
            <View style={[styles.container]}>
                <Text style={styles.text}>
                    {
                        'Nơi xem lại khuyến mãi đã đánh dấu;\nCó rất nhiều khuyến mãi dành cho bạn,'
                    }
                </Text>
                <Text style={styles.text}>
                    {'vui lòng chọn '}
                    <JJIcon name={'bookmark_o'}
                            color={'#454545'}
                            size={14}/>
                    {' để đánh dấu.'}
                </Text>
                <FastImage
                    source={require('../../../resources/images/image_deal_saved_holder.png')}
                    style={{height: 150, width: 150, marginTop: 16, marginBottom: 16}}
                    resizeMode={FastImage.resizeMode.contain}/>

                <ButtonNonFillNormal onPress={error ? onRefresh : onOpenMarketTabSelected}
                              text={error ? 'TẢI LẠI' : 'QUAY LẠI'}
                              color={COLOR_PRIMARY}
                              style={{width: '100%'}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLOR_GRAY_BG
    },
   text: {
       fontSize: 14,
       color: '#454545',
       textAlign: 'center'
   }
});