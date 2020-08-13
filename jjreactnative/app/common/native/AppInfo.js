import React from 'react';
import {NativeModules} from 'react-native';

import {ObjectUtil} from '../../utils/object-utils';

export const AppInfo = {
    ONE_SIGNAL_KEY: ObjectUtil.getValue(NativeModules, '79d889ff-f51c-447b-8d9c-ad61e21ad2bf', ['AppInfo','ONE_SIGNAL_KEY']),
    CODEPUSH_KEY: ObjectUtil.getValue(NativeModules, 'RyfSHanjMyTIZ7od8CZPKCg6dlzXHJ34QHC8V', ['AppInfo','CODEPUSH_KEY']),
    UUID: ObjectUtil.getValue(NativeModules, 'RyfSHanjMyTIZ7od8CZPKCg6dlzXHJ34QHC8V', ['AppInfo','UUID']),
    VersionCode: ObjectUtil.getValue(NativeModules, 'RyfSHanjMyTIZ7od8CZPKCg6dlzXHJ34QHC8V', ['AppInfo','VersionCode']),
    INSIDER_PARTNER: ObjectUtil.getValue(NativeModules, 'jamjatest', ['AppInfo','INSIDER_PARTNER']),
    FCM_SENDER_ID: ObjectUtil.getValue(NativeModules, '1095577327775', ['AppInfo','FCM_SENDER_ID']),
    GA_ID: ObjectUtil.getValue(NativeModules, 'UA-64551878-15', ['AppInfo','GA_ID'])
};