import React from 'react'
import {Alert as RNAlert} from 'react-native'

function alert(title, message, buttons, options) {

    if (!title) title = 'Thông báo';
    if (!!title && typeof title !== 'string') title = 'Thông báo';

    if (!message) message = 'JAMJA';
    if (!!message && typeof message !== 'string') message = 'JAMJA';

    RNAlert.alert(
        title,
        message,
        buttons,
        options
    )
}

const Alert = {
    alert
};

exports.Alert = Alert;