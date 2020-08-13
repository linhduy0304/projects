import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  View,
  Keyboard,
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {styles} from './styles';
import SmsListener from 'react-native-android-sms-listener';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      list: [],
    };
    this.SMSReadSubscription;
  }

  requestPermisson = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );
    } catch (err) {
      console.warn(err);
    }
  };

  componentDidMount = () => {
    this.SMSReadSubscription = SmsListener.addListener(message => {
      console.log('message');
      console.log(message);
    });

    this.requestPermisson();
    const arr1 = [
      {
        id: 1,
        name: '1',
        date: '1/2019',
      },
      {
        id: 2,
        name: '2',
        date: '2/2019',
      },
      {
        id: 3,
        name: '3',
        date: '2/2019',
      },
      {
        id: 4,
        name: '4',
        date: '4/2019',
      },
    ];

    // const groups = this.groupBy(arr1, 'date');
    // console.log(groups);
    // console.log(Object.keys(groups));
    // const arr = Object.keys(groups).map((a, i) => ({
    //   date: a,
    //   list: groups[a],
    // }));
    // console.log(arr);
  };

  componentWillUnmount() {
    //remove listener
    this.SMSReadSubscription && this.SMSReadSubscription.remove();
  }

  // groupBy = (xs, key) => {
  //   return xs.reduce((rv, x) => {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     console.log('------');
  //     console.log(rv);
  //     return rv;
  //   }, {});
  // };

  onPress = async txt => {
    try {
      if (!txt) {
        return;
      }
      // Keyboard.dismiss();
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        var filter = {
          box: '', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

          minDate: 949214655000, // timestamp (in milliseconds since UNIX epoch)
          maxDate: new Date().getTime(), // timestamp (in milliseconds since UNIX epoch)
          bodyRegex: `(?i).*${txt}.*`, // content regex to match
          // bodyRegex: `^[\p{${txt}} ._-]*$`,
          /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
          // read: 1, // 0 for unread SMS, 1 for SMS already read
          // _id: 1234, // specify the msg id
          // thread_id: 12, // specify the conversation thread_id
          /** the next 2 filters can be used for pagination **/
          indexFrom: 0, // start from index 0
          maxCount: 1000, // count of SMS to return each time
        };

        SmsAndroid.list(
          JSON.stringify(filter),
          fail => {
            console.log('Failed with this error: ' + fail);
          },
          (count, smsList) => {
            console.log('Count: ', count);
            console.log('List: ', JSON.parse(smsList));
            this.setState({
              list: JSON.parse(smsList),
            });
          },
        );
      } else {
        alert('permission denied');
      }
    } catch (err) {
      alert(err);
    }
  };

  onChangeText = txt => {
    this.setState({search: txt});
    let newText = '';
    let numbers = '[]{}()';
    for (var i = 0; i < txt.length; i++) {
      if (numbers.indexOf(txt[i]) > -1) {
        newText = `${newText}\\${txt[i]}`;
      } else {
        newText = `${newText}${txt[i]}`;
      }
    }

    this.onPress(newText);
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.ctItem}>
        <Text>
          {index + 1}. {item.body}
        </Text>
      </View>
    );
  };
  render() {
    const {search, list} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.ctHeader}>
            <TextInput
              value={search}
              style={styles.input}
              onChangeText={this.onChangeText}
              placeholder={'Search input ...'}
            />

            {/* <TouchableOpacity style={styles.btnSearch} onPress={this.onPress}>
              <Text>Submit</Text>
            </TouchableOpacity> */}
            <Text>Total: {list.length}</Text>
          </View>

          <FlatList
            contentContainerStyle={styles.list}
            data={list}
            renderItem={this._renderItem}
          />
        </View>
      </>
    );
  }
}

export default App;
