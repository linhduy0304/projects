import {ObjectUtil} from './object-utils';

export const NotificationUtil = {

    getNotificationData(notification) {
        try {

            let data = ObjectUtil.getValue(notification, undefined, ['data', 'custom']);
            if (!!data) {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }
            }

            if (!!ObjectUtil.getValue(data, undefined, ['a', 'nof_data'])) {
                return ObjectUtil.getValue(data, undefined, ['a', 'nof_data']);
            }
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    }
};