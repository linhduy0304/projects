import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

class TestFs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // this._downloadBlob();
        this._downloadBlob();
        // console.log(RNFS);
        // RNFS.readFile(`${RNFS.DocumentDirectoryPath}/test.jpg`, 'ascii').then(res => console.log(res))
        // // const DownloadFileOptions = {
        // //     fromUrl: 'https://docs.google.com/spreadsheets/d/1j-OZDbFVZTDDjM6TqjJyk52A9vrdWelkVdT2HOO5J2w/edit#gid=0',
        // //     toFile: `${RNFS.DocumentDirectoryPath}/dd.xlsx`,
        // //     progressDivider: 10,
        // //     progress: this._progress.bind(this)
        // // };

        // // RNFS.downloadFile(DownloadFileOptions)
        // //     .promise.then(res => {
        // //         console.log(res);
        // //         // if (res.statusCode == 200) {
        // //         //     this.setState({
        // //         //         pg: 'Lưu thành công'
        // //         //     });
        // //         // }
        // //         // setTimeout(function() {
        // //         //     // _this.setState({ showPp: false });
        // //         // }, 1000);
        // //     })
        // //     .catch(err => {
        // //         console.log(err);
        // //     });
    }

    _downloadFs = () => {
        const path = FileViewer.open(`${RNFS.DocumentDirectoryPath}/test.jpg`) // absolute-path-to-my-local-file.
            .then(() => {
                // success
            })
            .catch(error => {
                // error
            });
    };

    _downloadBlob = () => {
        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache: true
        })
            .fetch('GET', 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', {
                //some headers ..
            })
            .progress((received, total) => {
                console.log('progress', received / total)
            })
            .then(res => {
                // the temp file path
                // console.log('The file saved to ', res.path());
                // RNFetchBlob.android.actionViewIntent(res.path(), 'application/vnd.android.package-archive');
                const path = FileViewer.open(res.path()) // absolute-path-to-my-local-file.
                    .then(() => {
                        // success
                    })
                    .catch(error => {
                        // error
                    });
            });
    };

    _progress(res) {
        var pg = (res.bytesWritten / res.contentLength) * 100;
        pg = pg.toString().slice(0, 3);
        console.log(pg);
    }

    render() {
        return (
            <View>
                <Text> TestFs </Text>
                <Image style={{ height: 100, width: 100 }} source={{ uri: `file://${RNFS.DocumentDirectoryPath}/react-native.png` }} />
            </View>
        );
    }
}

export default TestFs;
