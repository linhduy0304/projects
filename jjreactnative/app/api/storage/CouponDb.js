import {RealmDbHelper} from './RealmDbHelper'
import {StringUtil} from '../../utils/string-util'

function get(copy) {
    try {
        const coupons =  RealmDbHelper.getRealm().objects('Coupon').filtered('status = 1');
        if (!copy) return coupons;

        console.log('CouponDb:get:', coupons.length);
        return copyObject(copyArray(coupons));
    }
    catch (e) {
        console.log('CouponDb:get:error', e);
        return [];
    }
}

function add(coupon) {
    try {
        if (StringUtil.isEmpty(coupon) || StringUtil.isEmpty(coupon.id)) return;

        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const result = realm.create('Coupon', coupon, true);
                    console.log('CouponDb:add:result', result);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('CouponDb:add:error', e);
    }
}

function addList(coupons) {
    try {
        if (StringUtil.isEmpty(coupons) || coupons.length < 1) return;

        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    for (let i = 0; i < coupons.length; i++) {
                        try {
                            realm.create('Coupon', coupons[i], true);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('CouponDb:addList:error', e);
    }
}

function remove(id) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                const result = realm.objectForPrimaryKey(id);
                if (!!result) {
                    realm.write(() => {
                        try {
                            realm.delete(result);
                        } catch (e) {
                            console.log(e);
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('CouponDb:remove:error', e);
    }
}

function removeAll() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                try {
                    realm.write(() => {
                        const result = realm.objects('Coupon');
                        realm.delete(result);
                        console.log('CouponDb:removeAll:result', result);
                    });
                } catch (e) {
                    console.log(e);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('CouponDb:remove:error', e);
    }
}

function removeUnAvailable() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                try {
                    realm.write(() => {
                        const coupons =  realm.objects('Coupon').filtered('status != 1 AND status != 7');

                        if (!!coupons && coupons.length > 0) {
                            realm.write(() => {
                                try {
                                    realm.delete(coupons);
                                } catch (e) {
                                    console.log(e);
                                }
                            })
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('CouponDb:removeUnAvailable:error', e);
    }
}

function copyArray(array) {
    try {
        return Object.assign([], array);
    }
    catch (e) {
        console.log(e);
        return [];
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
            if (key === 'images' || key === 'stores') {
                result[key] = copyObject(copyArray(obj[key]));
            }
            else {
                result[key] = copyObject(obj[key]);
            }
        }
        return result;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

exports.CouponDb = {
    add,
    addList,
    get,
    remove,
    removeAll,
    removeUnAvailable
}