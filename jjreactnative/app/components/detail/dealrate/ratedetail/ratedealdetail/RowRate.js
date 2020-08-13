import React from 'react';
import StarRating from 'react-native-star-rating';
import * as Progress from 'react-native-progress';
import { View, StyleSheet, Text } from 'react-native';
import {COLOR_LINE, COLOR_TEXT_INACTIVE} from '../../../../../resources/colors';
import {DIMENSION_PADDING_MEDIUM} from "../../../../../resources/dimens";
import {StringUtil} from '../../../../../utils/string-util'

const RowRate = (props) => (
    <View style={styles.rowRate}>

        <StarRating
            disabled={true}
            containerStyle={{ justifyContent: 'flex-start' }}
            buttonStyle={{ paddingRight: 2 }}
            maxStars={5}
            starSize={14}
            reversed={true}
            fullStarColor={COLOR_TEXT_INACTIVE}
            emptyStarColor={COLOR_TEXT_INACTIVE}
            rating={props.item._id}
        />
        <Progress.Bar
            progress={props.item.total_count / props.total}
            width={null}
            height={4}
            color={COLOR_TEXT_INACTIVE}
            unfilledColor={COLOR_LINE}
            borderWidth={0}
            style={{ flex: 1, height: 4, marginLeft: DIMENSION_PADDING_MEDIUM }} />

        <Text style={{ color: COLOR_TEXT_INACTIVE, alignSelf: 'flex-end', width: 50, textAlign: 'right' }}>
            {StringUtil.numberFormat(props.item.total_count)}
        </Text>

    </View>
)

const styles = StyleSheet.create({
    rowRate: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default RowRate;