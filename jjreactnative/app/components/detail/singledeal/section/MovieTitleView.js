import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native';
import {Text} from 'native-base';

import {BasePureComponent} from "../../../common/BasePureComponent";
import JJIcon from '../../../common/JJIcon';
import {
    DIMENSION_PADDING_MEDIUM,
    DIMENSION_PADDING_SMALL, DIMENSION_PADDING_TINY,
    DIMENSION_RADIUS_MEDIUM,
    DIMENSION_TEXT_HEADER_X, DIMENSION_TEXT_SUB
} from "../../../../resources/dimens";
import {COLOR_LINE, COLOR_ORANGE_MOVIE, COLOR_TEXT_BLACK_1, COLOR_TEXT_INACTIVE} from "../../../../resources/colors";
import MovieRatingButton from './MovieRatingButton';

export default class MovieTitleView extends BasePureComponent {

    render() {

        return (
            <View
                style={{
                    marginLeft: DIMENSION_PADDING_SMALL,
                    marginRight: DIMENSION_PADDING_SMALL
                }}>

                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: DIMENSION_TEXT_HEADER_X,
                        color: COLOR_TEXT_BLACK_1
                    }}>
                    {this.props.title}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: DIMENSION_PADDING_TINY }}>

                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <Text style={{fontSize: DIMENSION_TEXT_SUB, color: COLOR_TEXT_INACTIVE}}>
                            {this.props.genre}
                        </Text>

                        {
                            !!this.props.imdb &&
                            <View
                                style={{
                                    marginLeft: DIMENSION_PADDING_SMALL,
                                    paddingTop: 2,
                                    paddingBottom: 2,
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    borderRadius: DIMENSION_RADIUS_MEDIUM,
                                    backgroundColor: COLOR_ORANGE_MOVIE
                                }}>
                                <Text style={{color: 'black', fontSize: 8}}>
                                    IMDb <Text style={{color: 'white', fontSize: 8}}>{this.props.imdb}</Text>
                                </Text>
                            </View>
                        }

                        {
                            !!this.props.rating &&
                            <MovieRatingButton rating={this.props.rating}/>
                        }
                    </View>

                    {
                        !!this.props.run_time &&
                        <View style={{alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                            <JJIcon name={'clock_o'}
                                    size={DIMENSION_TEXT_SUB}
                                    color={COLOR_TEXT_INACTIVE}/>
                            <Text style={{color: COLOR_TEXT_INACTIVE, fontSize: DIMENSION_TEXT_SUB, marginLeft: DIMENSION_PADDING_TINY}}>
                                {this.props.run_time} phút
                            </Text>
                        </View>
                    }
                </View>

                <View
                    style={{
                        marginTop: DIMENSION_PADDING_MEDIUM,
                        height: 1,
                        backgroundColor: COLOR_LINE,
                        flex: 1
                    }}/>

            </View>
        )
    }
}

MovieTitleView.propTypes = {
    title: PropTypes.any,
    genre: PropTypes.any,
    imdb: PropTypes.any,
    run_time: PropTypes.any,
    rating: PropTypes.any
}