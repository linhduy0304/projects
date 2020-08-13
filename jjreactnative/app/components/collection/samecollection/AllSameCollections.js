import { Container } from 'native-base';
import { View, ScrollView } from 'react-native';
import React, { Component } from 'react';

import CollectionItem from '../../common/CollectionItem';
import JJHeader from '../../common/JJHeader';

export default class AllSameCollections extends Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <Container>
                {/* Header */}
                <JJHeader
                    navigation={this.props.navigation}
                    title={'CÙNG BỘ SƯU TẬP KHUYẾN MÃI'}
                />
                {/* Content */}
                <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>

                    <ScrollView>
                        {
                            this.props.navigation.state.params.collections.map((collection, i) => {
                                return <CollectionItem
                                    key={collection.id}
                                    path={'dd_more_col'}
                                    collection={collection}
                                    navigation={this.props.navigation} />;
                            })
                        }
                    </ScrollView>

                </View>
            </Container>
        )
    }

}

