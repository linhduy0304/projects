import { Subject } from 'rxjs';

const dealSubject = new Subject();

export const DealSubject = {

    dispatch(action, data) {
        dealSubject.next({
            action,
            data
        });
    },

    subscribe(callback) {
        return dealSubject.subscribe(callback);
    }
};