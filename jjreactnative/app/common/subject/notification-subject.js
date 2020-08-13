import { Subject } from 'rxjs';

const subject = new Subject();

export const NotificationSubject = {

    dispatch(action, data) {
        subject.next({
            action,
            data
        });
    },

    subscribe(callback) {
        return subject.subscribe(callback);
    }
};