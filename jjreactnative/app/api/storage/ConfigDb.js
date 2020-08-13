import {RealmDbHelper} from './RealmDbHelper'
import {StringUtil} from '../../utils/string-util'

function get(count) {
    try {
        const configs = RealmDbHelper.getRealm().objects('Config');
        return configs[0];
    }
    catch (e) {
        console.log('ConfigDb:get:error', e);
        if (count >= 1) {
            return undefined;
        }
        return get(1);
    }
}

function set(config, callback) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    config.config_key = 1;
                    const result = realm.create('Config', config, true);
                    console.log('ConfigDb:set:result', result);
                    !!callback && callback(result);
                });
            })
            .catch(error => {
                console.log(error);
                !!callback && callback(RealmDbHelper.defaultConfig);
            });
    }
    catch (e) {
        console.log('ConfigDb:set:error', e);
        !!callback && callback(RealmDbHelper.defaultConfig);
    }
}

function remove() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const result = realm.objects('Config');
                    realm.delete(result);
                    console.log('ConfigDb:remove:result', result);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('ConfigDb:remove:error', e);
    }
}

function updateSelectedProvince(province) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].selected_province = province;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function getSelectedProvince() {
    try {
        const config = get();
        return RealmDbHelper.copyObjectFromRealm(config.selected_province);
    }
    catch (e) {
        console.log(e);
        return {name: 'Hà Nội', id: 'ha-noi'};
    }
}

function filterButtonPopoverVisible() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].filter_button_popover_visible = true;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function hasVisibleFilterButtonPopover() {
    try {
        const config = get();
        return config.filter_button_popover_visible;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function saveDealPopoverVisible() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].show_save_deal_popover = true;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function hasVisibleSaveDealPopover() {
    try {
        const config = get();
        return config.show_save_deal_popover;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function tabDiscoveryPopoverVisible() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].tab_discovery_button_popover_visible = true;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function hasVisibleTabDiscoveryPopover() {
    try {
        const config = get();
        return config.tab_discovery_button_popover_visible;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function tabBookingPopoverVisible() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].tab_booking_button_popover_visible = true;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function hasVisibleTabBookingPopover() {
    try {
        const config = get();
        return config.tab_booking_button_popover_visible;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function bookingDatePickerPopoverVisible() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].booking_change_date_button_popover_visible = true;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function hasVisibleBookingDatePickerPopover() {
    try {
        const config = get();
        return config.booking_change_date_button_popover_visible;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function getTrackingConfig() {
    try {
        const config = RealmDbHelper.getRealm().objects('Config')[0];
        return config.tracking;
    }
    catch (e) {
        console.log('ConfigDb:getTrackingConfig:error', e);
        return {};
    }
}

function updateTrackingConfig(tracking) {
    try {
        if (StringUtil.isEmpty(tracking)) return;

        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].tracking = tracking;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function updateTrackingSource(firstSource, lastSource) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        if (StringUtil.isEmpty(configs[0].tracking)) {
                            configs[0].tracking = {};
                        }
                        if (!StringUtil.isEmpty(firstSource)) configs[0].tracking.first_campaign = firstSource;
                        if (!StringUtil.isEmpty(lastSource)) configs[0].tracking.last_campaign = lastSource;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function getOneSignalPlayer() {
    try {
        const configs = RealmDbHelper.getRealm().objects('Config');
        if (!!configs && configs.length > 0) return configs[0].one_signal;
        return {};
    }
    catch (e) {
        console.log('ConfigDb:getTrackingConfig:error', e);
        return {};
    }
}

function updateOneSignalPlayer(player) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].one_signal = player;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function isEnableSound() {
    try {
        const config = RealmDbHelper.getRealm().objects('Config')[0];
        if (config.sound_open === undefined || config.sound_open === null) return true;
        return config.sound_open;
    }
    catch (e) {
        console.log('ConfigDb:getTrackingConfig:error', e);
        return true;
    }
}

function enableSound(value) {
    try {
        if (StringUtil.isEmpty(value)) return;

        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        configs[0].sound_open = value;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

function canShowBanner(bannerId) {
    try {
        const config = RealmDbHelper.getRealm().objects('Config')[0];
        if (config.banner_logs === undefined || config.banner_logs === null || config.banner_logs.length < 1) return true;
        const banner = config.banner_logs.filtered(`id = "${bannerId}"`)[0];
        if (StringUtil.isEmpty(banner)) return true;
        console.log('canShowBanner:visible_count', banner.visible_count);
        return banner.visible_count < 1;
    }
    catch (e) {
        console.log('ConfigDb:getTrackingConfig:error', e);
        return true;
    }
}

function bannerVisible(bannerId) {
    try {
        if (StringUtil.isEmpty(bannerId)) return;

        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const configs = realm.objects('Config');
                    if (!!configs && !!configs[0]) {
                        const config = configs[0];
                        if (config.banner_logs === undefined || config.banner_logs === null || config.banner_logs.length < 1) {
                            config.banner_logs.push({
                               id: bannerId,
                               visible_count: 1
                            });
                            return;
                        }
                        const banner = config.banner_logs.filtered(`id = "${bannerId}"`)[0];
                        if (StringUtil.isEmpty(banner)) {
                            config.banner_logs.push({
                                id: bannerId,
                                visible_count: 1
                            });
                            return;
                        }
                        banner.visible_count = banner.visible_count + 1;
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log(e);
    }
}

exports.ConfigDb = {
    set,
    get,
    remove,
    getSelectedProvince,
    updateSelectedProvince,
    filterButtonPopoverVisible,
    hasVisibleFilterButtonPopover,
    saveDealPopoverVisible,
    hasVisibleSaveDealPopover,
    tabDiscoveryPopoverVisible,
    hasVisibleTabDiscoveryPopover,
    tabBookingPopoverVisible,
    hasVisibleTabBookingPopover,
    bookingDatePickerPopoverVisible,
    hasVisibleBookingDatePickerPopover,
    getTrackingConfig,
    updateTrackingConfig,
    updateTrackingSource,
    getOneSignalPlayer,
    updateOneSignalPlayer,
    isEnableSound,
    enableSound,
    canShowBanner,
    bannerVisible
}