
import moment from 'moment/min/moment-with-locales';
import { round } from './Utils';
import Moment from "moment/moment";
moment.locale('vi')

export function getDayOfWeekAsViString(date) {
    if (date.isSame(moment(), 'day')) return 'Hôm nay';
    let day = date.isoWeekday();
    day += 1;
    if (day < 1) return '';
    if (day >= 8) return 'Chủ nhật';
    return 'Thứ ' + day;
}

export function formatCalendarDate(date) {
    return moment(date).calendar(null, {
        sameDay: '[Hôm nay]',
        nextDay: '[Ngày mai] DD/MM/YYYY',
        nextWeek: 'dddd DD/MM/YYYY',
        lastDay: 'dddd DD/MM/YYYY',
        lastWeek: 'dddd DD/MM/YYYY',
        sameElse: 'dddd DD/MM/YYYY'
    }).replace(/^\w/, function (chr) {
        return chr.toUpperCase();
    });
}

export function formatCalendarDateWithTime(date) {
    return moment.utc(date).local().calendar(null, {
        sameDay: '[Hôm nay lúc] HH:mm',
        nextDay: '[Ngày mai lúc] HH:mm',
        nextWeek: 'DD/MM/YYYY [lúc] HH:mm',
        lastDay: 'DD/MM/YYYY [lúc] HH:mm',
        lastWeek: 'DD/MM/YYYY [lúc] HH:mm',
        sameElse: 'DD/MM/YYYY [lúc] HH:mm'
    }).replace(/^\w/, function (chr) {
        return chr.toUpperCase();
    });
}

export function parsePassiveTime(time) {
    if (time === undefined || time === null) return '';
    let now = moment();
    let duration = moment.duration(now.diff(time));
    let durationAsMinute = duration.asMinutes().toFixed(0);
    if (durationAsMinute <= 1) {
        return 'Mới đây'
    } else if (durationAsMinute < 60) {
        return durationAsMinute + ' phút trước'
    } else if (durationAsMinute < 24 * 60) {
        return (durationAsMinute / 60).toFixed(0) + ' giờ trước';
    } else if (duration.asDays() < 2) {
        return 'Hôm qua lúc ' + time.format('HH:mm') + ' giờ'
    }
    return time.format('DD/MM/YYYY');
}

export function parseFromUnixTime(unix) {
    if (!unix) return '';
    return moment(unix).calendar(null, {
        sameDay: '[Hôm nay], DD/MM/YYYY',
        nextDay: '[Ngày mai], DD/MM/YYYY',
        nextWeek: 'dddd DD/MM/YYYY',
        lastDay: 'dddd DD/MM/YYYY',
        lastWeek: 'dddd DD/MM/YYYY',
        sameElse: 'dddd DD/MM/YYYY'
    }).replace(/^\w/, function (chr) {
        return chr.toUpperCase();
    });
}