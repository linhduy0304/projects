import React from 'react'
import {Platform, View, TouchableOpacity, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'

import JJHeader from '../JJHeader';
import {getQRCodeUrl} from "../../../utils/Utils";
import JJIcon from '../JJIcon'
import {AnalyticsUtil} from '../../common/analytics/analytics'
import {buildImageSource, IMAGE_INTERNET} from "../../../utils/image-util";

const dimensions = Dimensions.get('window');
const imageSize = dimensions.width - 60;

export default class QRCodePreview extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            qrCode: ''
        }
    }

    componentDidMount() {
        this.setState({qrCode: this.props.navigation.state.params.qrCode})
        AnalyticsUtil.logCurrentScreen(
            'qr_code_preview',
            {
                qr: this.props.navigation.state.params.qrCode
            }
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column'}}>
                <JJHeader
                    navigation={this.props.navigation}
                    showSearchBar={false}
                    title={this.state.qrCode}
                    leftItem={this._renderCloseButton}
                />

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 60
                }}>
                    {
                        this.state.qrCode !== undefined && this.state.qrCode.length > 1 &&
                        <FastImage
                            source={buildImageSource(IMAGE_INTERNET, getQRCodeUrl(this.state.qrCode, 400))}
                            style={{height: imageSize, width: imageSize}}
                            resizeMode={FastImage.resizeMode.contain}/>
                    }
                </View>

            </View>
        )
    }

    _renderCloseButton = () => {
        return (
            <TouchableOpacity
                style={{
                    height: 56,
                    width: 56,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => {
                    AnalyticsUtil.logNormalEvent(
                        'close_qr_preview',
                        {
                            action_location: 'qr_code_preview',
                            action_name: 'click_back_button',
                            qr: this.props.navigation.state.params.qrCode
                        },
                        'common'
                    )
                    this.props.navigation.goBack();
                }}>
                <JJIcon
                    style={{ marginBottom: Platform.OS === 'ios' ? 4 : 0 }}
                    name={'x_o'}
                    color={'#0F0A0A'}
                    size={16} />
            </TouchableOpacity>
        )
    }
}