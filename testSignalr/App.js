/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import * as signalR from '@aspnet/signalr';
import signalr from 'react-native-signalr';
import { Svg, Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

import AnimatedCircularProgress from 'react-native-conical-gradient-progress';
propStyle = percent => {
    const base_degrees = -135;
    const rotateBy = base_degrees + percent * 3.6;
    return {
        transform: [{ rotateZ: `${rotateBy}deg` }]
    };
};
export default class App extends Component {
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        };
    }

    circlePath(x, y, radius, startAngle, endAngle) {
        var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
        var end = this.polarToCartesian(x, y, radius, startAngle);
        var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
        var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
        return d.join(' ');
    }
    clampFill = fill => Math.min(100, Math.max(0, fill));
    componentDidMount() {
        // connection.on("ReceiveMessage", (user, ms) => {
        //     console.log(user, ms);
        // });
        const connection = new signalR.HubConnectionBuilder().withUrl('http://app.hentocdo.vn/chat',
                                                            {accessTokenFactory: () => "KK3AR1ShbF3Nzc4LvjVrF4PIAsHV%2bBAfmoEV4zr3oDNhJrejmHivyF7wq%2f%2fGKQKwBCqTrbLF%2bqNYjQiSDgj6T7BjJGYBRhGhf0Btyapn%2f7I6bY%2f5r18LteSOacQzFyW283weIgd7V64Y4DkTMBbWKlwCofN%2fHmVU5gCj5im2DrAIVu4Msc7MXEyar3ko6G%2fi%2fVd6ihH%2bX7OosH9isWHd4X8OItHYzptTJ1oKFcj2dIQsay0newjSvxh3hizkUJogR7cK%2fW2BK57VJgmOAe%2bltOlwFOM4MtOzCUSdJKehpJKelSHmHhCtav4oVEKQBa7u4kPJtuTQRXWrhFgQ1qo6FH%2fwiBWH7CurROQ1zlWDa4o%3d" // Return access token
                                                            })
                                                            .build();
        connection.start().then(() => connection.invoke("getListChat").then(data => alert('data.length')).catch(function(err) {
            return alert(err.toString());
        }))
        .catch(function(err) {
            return alert(err.toString());
        });
        // const connection = signalr.hubConnection(
        //     'http://app.hentocdo.vn/chat',
        // );
        // console.log(connection)
        // connection.logging = true;
        // const proxy = connection.createHubProxy('chatHub');
        // //receives broadcast messages from a hub function, called "helloApp"
        // proxy.on('ReceiveMessage', (user, message) => {
        //     console.log(user, message);
        //     //Here I could response by calling something else on the server...
        // });
        // // atempt connection, and handle errors
        // connection
        //     .start({ transport: ['webSockets', 'longPolling'] })
        //     .done(() => {
        //         console.log('Now connected, connection ID=' + connection.id);
        //         proxy
        //             .invoke('SendMessage', 'Hello Server, how are you?')
        //             .done(directResponse => {
        //                 console.log(
        //                     'direct-response-from-server',
        //                     directResponse
        //                 );
        //             })
        //             .fail(() => {
        //                 console.warn(
        //                     'Something went wrong when calling server, it might not be up and running?'
        //                 );
        //             });
        //     })
        //     .fail(() => {
        //     });
        // //connection-handling
        // connection.connectionSlow(() => {
        //     console.log(
        //         'We are currently experiencing difficulties with the connection.'
        //     );
        // });
        // connection.error(error => {
        //     console.log(error)
        //     const errorMessage = error.message;
        //     let detailedError = '';
        //     if (error.source && error.source._response) {
        //         detailedError = error.source._response;
        //     }
        //     if (
        //         detailedError ===
        //         'An SSL error has occurred and a secure connection to the server cannot be made.'
        //     ) {
        //         console.log(
        //             'When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14'
        //         );
        //     }
        //     console.debug('SignalR error: ' + errorMessage, detailedError);
        // });
    }

    _send = () => {
        connection.on('ReceiveMessage', (user, ms) => {
            console.log(user, ms);
        });

        connection
            .start()
            .then(() => connection.invoke('SendMessage', 'linhduy', 'ddd'))
            .catch(function(err) {
                return console.error(err.toString());
            });
    };
    render() {
        let stylesFromProps = propStyle(25);

        const size = 100;
        const arcSweepAngle = 360;
        const maxWidthCircle = 20;
        const fill = 50;

        const circlePath = this.circlePath(size / 2, size / 2, size / 2 - maxWidthCircle / 2, 0, (arcSweepAngle * this.clampFill(fill)) / 100);
        return (
            <View style={{ flex: 1 , backgroundColor: 'blue'}}>
                <View style={[styles.box,{transform: [{rotateY: '180deg'}]} ]}>
                    <Image style={{width: 107, height: 107, position: 'absolute', borderRadius: 53}} source={require('./linhduy0304.jpg')}/>
                    <AnimatedCircularProgress
                        size={107}
                        width={10}
                        fill={75}
                        prefill={100}
                        beginColor="#e73948"
                        endColor="#ef863b"
                        segments={16}
                        backgroundColor="rgba(255, 255, 255, 0.2)"
                        linecap="round"
                    >
                       
                    </AnimatedCircularProgress>
                </View>
                <View style={{ width: size, height: size, marginTop: 50 }}>
                    <Svg width={size} height={size} style={{ backgroundColor: 'transparent' }}>
                        <Defs>
                            <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
                                <Stop offset="0" stopColor="#ef863b" />
                                <Stop offset="1" stopColor="#e73948" />
                            </LinearGradient>
                        </Defs>
                        <G rotation={0} originX={size / 2} originY={size / 2}>
                            <Path d={circlePath} stroke={'url(#grad)'} strokeWidth={10} strokeLinecap={'butt'} fill="transparent" />
                        </G>
                    </Svg>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressLayer: {
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#3498db',
        borderTopColor: '#3498db',
        transform: [{ rotateZ: '-135deg' }]
    },
    offsetLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 20,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'grey',
        borderTopColor: 'grey',
        transform: [{ rotateZ: '-135deg' }]
    }
});
