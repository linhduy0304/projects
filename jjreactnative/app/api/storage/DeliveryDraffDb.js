import { RealmDbHelper } from './RealmDbHelper';
import { StringUtil } from '../../utils/string-util';
import { ObjectUtil } from '../../utils/object-utils';

function get(id) {
    console.debug('------GETTTTTTTTT-----', id);
    try {
        if (!id) return;
        const draffs = [];
        if (id === 'all') {
            draffs = RealmDbHelper.getRealm().objects('DeliveryDraff');
        } else {
            draffs = RealmDbHelper.getRealm()
                .objects('DeliveryDraff')
                .filtered(`coupon_id = "${id}"`);
        }
        console.debug(copyObject(ObjectUtil.copyArrayByAssign(draffs)));
        return copyObject(ObjectUtil.copyArrayByAssign(draffs));
    } catch (e) {
        console.debug('DeliveryDraff:get:error', e);
        return [];
    }
}

function add(product) {
    console.debug('-------ADD----', product);
    try {
        if (StringUtil.isEmpty(product)) return;

        const exist = RealmDbHelper.getRealm()
            .objects('DeliveryDraff')
            .filtered(`coupon_id = "${product.coupon_id}"`);
        
        RealmDbHelper.getRealmOpen()
        .then(realm => {
            realm.write(() => {
                if (!!exist && exist.length > 0) {
                    if (!!product.totalQuantity && product.totalQuantity > 0) {
                        exist[0].products = product.products;
                        exist[0].totalQuantity = product.totalQuantity;
                    } else {
                        realm.delete(exist[0]);
                    }
                } else {
                    const result = realm.create('DeliveryDraff', product, true);
                    console.debug('DeliveryDraff:add:result', result);
                }
            });
            
        })
        .catch(error => {
            console.debug(error);
        });
    } catch (e) {
        console.debug('DeliveryDraff:add:error', e);
    }
}

function remove(id) {
    console.debug('------REMOVE-----', id);
    try {
        if (!id) return;

        const draffs = RealmDbHelper.getRealm()
            .objects('DeliveryDraff')
            .filtered(`coupon_id = "${id}"`);
        if (!!draffs && draffs.length > 0) {
            RealmDbHelper.getRealmOpen()
                .then(realm => {
                    realm.write(() => {
                        realm.delete(draffs[0]);
                    });
                })
                .catch(error => {
                    console.debug(error);
                });
        }
    } catch (e) {
        console.debug('DeliveryDraff:remove:error', e);
    }
}

function removeAll() {
    console.debug('------REMOVE ALL-----');
    try {
        const draffs = RealmDbHelper.getRealm().objects('DeliveryDraff');
        if (!!draffs && draffs.length > 0) {
            RealmDbHelper.getRealmOpen()
                .then(realm => {
                    realm.write(() => {
                        realm.delete(draffs);
                    });
                })
                .catch(error => {
                    console.debug(error);
                });
        }
    } catch (e) {
        console.debug('DeliveryDraff:remove:error', e);
    }
}

function copyObject(obj) {
    try {
        // console.log('copy-obj', typeof obj, Array.isArray(obj), obj.type, obj);
        if (StringUtil.isEmpty(obj)) return obj;
        if (typeof obj !== 'object') return obj;

        if (Array.isArray(obj)) {
            let results = [];
            for (let i = 0; i < obj.length; i++) {
                results.push(copyObject(obj[i]));
            }
            return results;
        }
        const keys = Object.keys(obj);
        let result = {};
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key === 'products' || key === 'customizations' || key === 'options') {
                result[key] = copyObject(ObjectUtil.copyArrayByAssign(obj[key]));
            } else {
                result[key] = copyObject(obj[key]);
            }
        }
        return result;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

exports.DeliveryDraffDb = {
    add,
    get,
    remove,
    removeAll
};
