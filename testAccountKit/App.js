/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import RNAccountKit, {Color} from 'react-native-facebook-account-kit'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
import { ShareDialog, LoginButton } from 'react-native-fbsdk';
export default class App extends Component<Props> {

  componentWillMount = () => {
    // RNAccountKit.loginWithPhone()
    // .then((token) => {
    //   if (!token) {
    //     console.log('Login cancelled')
    //   } else {
    //     RNAccountKit.getCurrentAccount().then(account => {
    //       if(account) {
    //         Actions.registerMobile({account: account})
    //       }
    //     })
    //   }
    // })

    const options = {
      contentType: 'link',
      contentUrl: 'https://www.youtube.com/watch?v=HkLb-PJ1toI',
      commonParameters: {
      hashtag: "#dddd"
      }
  };
    ShareDialog.canShow(options).then(canShow => {
            alert(canShow)
        if (canShow) {
            return ShareDialog.show(options);
        }
        }).then(
        (result) => {
            if (result.isCancelled) {
            // tslint:disable-next-line:no-console
            console.log('Share cancelled');
            } else {
            // tslint:disable-next-line:no-console
            console.log('Share success with postId: ');
            }
        },
        error => {
            // tslint:disable-next-line:no-console
            console.log('Share fail with error: ' + error);
        }
        );
  };
  
  render() {
    return (
      <View>
      <LoginButton
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  console.log(data.accessToken.toString())
                }
              )
            }
          }
        }
        onLogoutFinished={() => console.log("logout.")}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
