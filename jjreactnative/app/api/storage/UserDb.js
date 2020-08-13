import {RealmDbHelper} from './RealmDbHelper'

function get() {
    try {
        const users = RealmDbHelper.getRealm().objects('User');
        return users[0];
    }
    catch (e) {
        console.log('UserDb:get:error', e);
        return undefined;
    }
}

function set(user) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    user.user_key = 1;
                    const result = realm.create('User', user, true);
                    console.log('UserDb:set:result', result);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('UserDb:set:error', e);
    }
}

function remove() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const result = realm.objects('User');
                    realm.delete(result);
                    console.log('UserDb:remove:result', result);
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('UserDb:remove:error', e);
    }
}

function updateUserProfile(fullname, phone, mail) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const users = realm.objects('User');
                    if (!!users && !!users[0]) {
                        users[0].full_name = fullname;
                        users[0].phone_number = phone;
                        users[0].email = mail;
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (e) {
        console.log('UserDb:updateUser:error', e);
    }
}

function getGameUserReferralUrl() {
    try {
        const user = get();
        return user.game_user_referral_url;
    }
    catch (e) {
        console.log(e);
        return '';
    }
}

function setGameUserReferralUrl(url) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const user = realm.objects('User');
                    if (!!user && !!user[0]) {
                        user[0].game_user_referral_url = url;
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

function updateUserContactInfo(fullname, phone, mail) {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const users = realm.objects('User');
                    if (!!users && !!users[0]) {
                        users[0].contact_info_full_name = fullname;
                        users[0].contact_info_phone_number = phone;
                        users[0].contact_info_email = mail;
                    }
                })
            })
            .catch(error => {
                console.log('UserDb:updateUserContactInfo:error', error);
            });
    }
    catch (e) {
        console.log('UserDb:updateUserContactInfo:error', e);
    }
}

function hasShowedMovieHoldingPopupGuide() {
    try {
        const user = get();
        return user.movie_holding_popup_guide === 1;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

function showMovieHoldingPopupGuide() {
    try {
        RealmDbHelper.getRealmOpen()
            .then(realm => {
                realm.write(() => {
                    const user = realm.objects('User');
                    if (!!user && !!user[0]) {
                        user[0].movie_holding_popup_guide = 1;
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

exports.UserDb = {
    set,
    get,
    remove,
    updateUserProfile,
    getGameUserReferralUrl,
    setGameUserReferralUrl,
    updateUserContactInfo,
    hasShowedMovieHoldingPopupGuide,
    showMovieHoldingPopupGuide
}