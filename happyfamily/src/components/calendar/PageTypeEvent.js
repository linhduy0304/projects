

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');
import {Actions} from 'react-native-router-flux'
import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import css from '../../Css'
const types = [
    {
        icon: require('../../images/icons/ic_baby.png'),
        title: 'Dấu mốc đầu đời',
        type: 1
    },
    {
        icon: require('../../images/icons/ic_adults.png'),
        title: 'Dấu mốc trưởng thành',
        type: 2
    },
    {
        icon: require('../../images/icons/ic_event_family.png'),
        title: 'Sự kiện trong gia đình',
        type: 3
    },
    {
        icon: require('../../images/icons/ic_event_individual.png'),
        title: 'Sự kiện cá nhân',
        type: 4
    },
];
class PageTypeEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    selectType(item) {
        this.props.close();
        Actions.addEvent({date: this.props.date, lunar: this.props.lunar, lunarValue: this.props.lunarValue, event_type: item, individual: this.props.individual});
    }
    
    getTypes() {
        result = types.map((item, index) => {
            return (
                <TouchableOpacity onPress={() => this.selectType(item)} style={[styles.boxType, { borderRightWidth: index % 2 === 0 ? 1 : 0, borderRightColor: index % 2 === 0 ? '#EAF0FC' : '#FFFFFF'}]} key={index}>
                    <Image source={item.icon} style={styles.image} />
                    <Text style={styles.txtTitle}>{item.title}</Text>
                </TouchableOpacity>
            );
        });
        return result;
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={{height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#C6247D'}}></View>
            <NavBar style={{navBar: css.navBar, statusBar: css.statusBar}} statusBar={{barStyle: 'light-content', backgroundColor: '#C6247D'}} >
                    <NavButton/>
                    <NavTitle style={css.navTitle}>
                        <Text style={css.txtTitle}>Tạo sự kiện mới</Text>
                    </NavTitle>
                    <NavButton/>
                    <TouchableOpacity onPress={() => this.props.close()} style={{position: 'absolute', left: 0, padding: 15}}>
                        <Image source={require('../../images/icons/ic_back.png')} />
                    </TouchableOpacity>
                </NavBar>
            <View style={styles.content}>
                <Text style={styles.txtType}>CHỌN LOẠI SỰ KIỆN</Text>
                <View style={styles.boxListType}>
                    {
                        this.getTypes()
                    }
                </View>
            </View>
        
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,
        backgroundColor: '#EAF0FC'
    },
    txtType: {
        padding: 15,
        paddingTop: 20,
        color: '#767980',
        fontWeight: '600',
        fontSize: 16
    },
    boxListType: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        flex: 1,
    },
    boxType: {
        width: (window.width) /2,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFFFFF',
        marginBottom: 1,
    },
    image: {
        marginRight: 5
    },
    txtTitle: {
        fontSize: 14,
        color: '#373737',
        width: (window.width) /2 - 80
    }
});

export default PageTypeEvent;