import React from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Grid, Row, Text} from 'native-base';
import FastImage from 'react-native-fast-image';

import {BasePureComponent} from "../../../../common/BasePureComponent";
import SeatRowView from './SeatRowView';
import MovieSeatRole from "./MovieSeatRole";
import {COLOR_TEXT_INACTIVE} from "../../../../../resources/colors";
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_TEXT_TINY,
    DIMENSION_TEXT_UNDER_TINY
} from "../../../../../resources/dimens";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const roomHeight = windowHeight * 0.5;

let sizeStyle = {
    roomWidth: windowWidth, //width equals screen width
    roomHeight: roomHeight, //height is 40% of screen height

    screenViewHeight: roomHeight * 0.15,
    boxWidth: windowWidth,
    boxHeight: roomHeight * 0.7,
    seatRoleHeight: roomHeight * 0.15,
};

export const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default class RoomView extends BasePureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View
                style={{
                    width: sizeStyle.roomWidth,
                    height: sizeStyle.roomHeight,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                <View
                    style={{
                        width: sizeStyle.boxWidth,
                        height: 24,
                        alignItems: 'center'
                    }}>

                    <FastImage
                        style={{
                            width: '58%',
                            height: 24,
                        }}
                        source={require('../../../../../resources/bhd/movie_screen.png')}
                        resizeMode={FastImage.resizeMode.contain}/>

                    <Text
                        style={{
                            color: 'white',
                            fontSize: DIMENSION_TEXT_TINY,
                            position: 'absolute',
                            top: 4
                        }}>
                        Màn chiếu
                    </Text>

                </View>

                <View
                    style={{
                        width: '100%',
                        flex: 1,
                        marginTop: DIMENSION_PADDING_MEDIUM,
                        flexDirection: 'row'
                    }}>

                    <View
                        style={{
                            height: '100%',
                            paddingTop: 8,
                            paddingLeft: 2,
                            paddingRight: 2,
                            paddingBottom: 8,
                            marginLeft: 4,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: 8
                        }}>

                        {
                            !!this.props.room &&
                            rows.filter((r,i) => i < this.props.room.get('rowCount', 0)).map(r => {
                                return (
                                    <Text
                                        style={styles.ruleRowText}
                                        key={`row_${r}`}>
                                        {r}
                                    </Text>
                                )
                            })
                        }

                    </View>

                    <Grid
                        style={{
                            flex: 1,
                            marginRight: 8
                        }}>
                        {
                            !!this.props.room &&
                            this.props.room.get('rowMap').map(r => {
                                return (
                                    <Row key={`movie_row_${r.get('rowInMapIndex', 0)}_${r.get('rowIndex', 0)}`}>

                                        <SeatRowView
                                            onSeatPressed={this.props.onSeatPressed}
                                            seats={r.get('seats')}/>
                                    </Row>
                                )
                            })
                        }
                    </Grid>

                </View>

                <MovieSeatRole />

            </View>
        );
    }
}

RoomView.propTypes = {
    room: PropTypes.any,
    onSeatPressed: PropTypes.any
}

const styles = StyleSheet.create({
    ruleColText: {
        color: COLOR_TEXT_INACTIVE,
        fontSize: DIMENSION_TEXT_UNDER_TINY,
        textAlign: 'center',
        paddingLeft: 2
    },
    ruleRowText: {
        color: 'white',
        fontSize: DIMENSION_TEXT_UNDER_TINY,
        textAlign: 'center'
    }
})