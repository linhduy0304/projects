import { Subject } from 'rxjs';

const locationSubject = new Subject();

export const LocationSubject = {

    dispatch(action, data) {
        locationSubject.next({
            action,
            data
        });
    },

    subscribe(callback) {
        return locationSubject.subscribe(callback);
    }
};