import {AppConfig} from './index'

export const KEY = {
    UPDATE: !!AppConfig.ios ? 'ios_update_configuration' : 'android_update_configuration',
    MAIN_TAB_CONFIG: 'main_tab_config'
};

export const PARAMS = {
    VERSION_NAME: 'latest_version_name',
    VERSION_CODE: 'latest_version_code',
    FORCE_UPDATE: 'force_update',
    UPDATE_MESSAGE: 'update_message',
    AUTO_ACTIVE_TAB: 'auto_active_tab'
};

export const FIREBASE_CONFIGS = [
    KEY.UPDATE,
    KEY.MAIN_TAB_CONFIG
];