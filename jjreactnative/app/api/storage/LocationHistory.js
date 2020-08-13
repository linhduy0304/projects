import { RealmDbHelper } from './RealmDbHelper';

function get() {
  try {
    const locationHistory = RealmDbHelper.getRealm().objects(
      'DeliveryLocationHistory'
    );
    return RealmDbHelper.copyObjectFromRealm(locationHistory);
  } catch (e) {
    console.log('locationHistory:get:error', e);
    return [];
  }
}

function set(location) {
  try {
    const locationHistory = RealmDbHelper.getRealm().objects(
      'DeliveryLocationHistory'
    );
    const history = Object.values(
      RealmDbHelper.copyObjectFromRealm(locationHistory)
    );
    if (history.filter(el => el.address === location.address).length === 0) {
      RealmDbHelper.getRealmOpen()
        .then(realm => {
          realm.write(() => {
            const result = realm.create(
              'DeliveryLocationHistory',
              location,
              true
            );
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  } catch (e) {
    console.log('DeliveryLocationHistory:set:error', e);
  }
}

exports.LocationHistory = {
  set,
  get
};
