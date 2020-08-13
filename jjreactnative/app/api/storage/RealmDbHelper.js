import Realm from 'realm';
import { RealmSchema } from './RealmSchema';

const config = {
    schema: [
        RealmSchema.provinceSelectedSchema,
        RealmSchema.uuidSchema,
        RealmSchema.userSchema,
        RealmSchema.configSchema,
        RealmSchema.oneSignalSchema,
        RealmSchema.trackingSchema,
        RealmSchema.brandSchema,
        RealmSchema.storeSchema,
        RealmSchema.imageSchema,
        RealmSchema.promoCodeSchema,
        RealmSchema.dealSchema,
        RealmSchema.couponSchema,
        RealmSchema.bannerLogSchema,
        RealmSchema.DeliveryLocationSchema,
        RealmSchema.deliveryDraffSchema,
        RealmSchema.productSchema,
        RealmSchema.customizationSchema,
        RealmSchema.optionSchema,
    ],
    schemaVersion: 32
};

const defaultConfig = {
    selected_province: { name: 'Hà Nội', id: 'ha-noi' },
    tracking: {
        first_campaign: 'direct',
        last_source: 'direct',
        last_medium: 'direct',
        last_campaign: 'direct',
        last_term: 'not_set',
        last_content: 'not_set'
    }
};

function getRealm() {
    try {
        return new Realm(config);
    } catch (e) {
        console.log(e);
        return {
            write: () => {},
            objects: () => {}
        };
    }
}

function getRealmOpen() {
    return Realm.open(config);
}

function copyObjectFromRealm(obj) {
    try {
        return Object.assign({}, obj);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

function copyArrayFromRealm(arrays) {
    try {
        return Object.assign([], arrays);
    } catch (e) {
        console.log(e);
        return [];
    }
}

const RealmDbHelper = {
    getRealm,
    defaultConfig,
    copyObjectFromRealm,
    copyArrayFromRealm,
    config,
    getRealmOpen
};

exports.RealmDbHelper = RealmDbHelper;
