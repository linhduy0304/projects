import { Text } from 'native-base';
import { View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

import { COLOR_LINE, COLOR_GRAY_BG, COLOR_PRIMARY, COLOR_BLACK, COLOR_SEPARATE_LINE } from '../../resources/colors';
import PropTypes from 'prop-types'
import JJIcon from './JJIcon';

type Props = {
    selectedSortType?: PropTypes.object,
    style?: PropTypes.object,
    onSortMenuPressed?: PropTypes.func,
    onSortSelected?: PropTypes.func
}

export default class Sort extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            sorts: [
                { "sort_type": "newest", "sort_name": "Mới nhất" },
                { "sort_type": "distance", "sort_name": "Gần tôi" },
                { "sort_type": "most_view", "sort_name": "Xem nhiều" },
                { "sort_type": "discount_highest", "sort_name": "Giảm sâu nhất" }
            ],
        }
    }

    componentDidMount() {
        if (this.props.sorts) {
            this.setState({
                ...this.state,
                sorts: this.props.sorts
            })
        }
    }

    render() {
        let selectedIndex = this.state.sorts.findIndex(item => item.sort_type === this.props.selectedSortType)
        return (
            <View style={[{ backgroundColor: COLOR_GRAY_BG }, this.props.style]}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingTop: 8, paddingBottom: 8 }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.props.onSortMenuPressed !== undefined) {
                                    this.props.onSortMenuPressed()
                                }
                            }}
                            style={{ marginLeft: 16, marginRight: 16 }} >
                            <JJIcon name={'sort_2_o'} color={'gray'} size={16} />
                        </TouchableOpacity>

                        {this.state.sorts.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (this.props.onSortSelected !== undefined) {
                                            this.props.onSortSelected(item)
                                        }
                                    }}
                                    key={index}
                                    style={{
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                        paddingLeft: 16,
                                        paddingRight: 16
                                    }}>
                                    <Text style={{ color: index === selectedIndex ? COLOR_PRIMARY : '#666666' }}>{item.sort_name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                        <View style={{ marginLeft: 16 }} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

