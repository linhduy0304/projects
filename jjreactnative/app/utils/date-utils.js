import moment from "moment/min/moment-with-locales";
moment.locale('vi');

function formatCalendarDate(date) {
    if (!date) return '';
    return moment(date).local().calendar(null, {
        sameDay: '[Hôm nay]',
        nextDay: '[Ngày mai], DD/MM/YYYY',
        nextWeek: 'dddd, DD/MM/YYYY',
        lastDay: 'dddd, DD/MM/YYYY',
        lastWeek: 'dddd, DD/MM/YYYY',
        sameElse: 'dddd, DD/MM/YYYY'
    }).replace(/^\w/, function (chr) {
        return chr.toUpperCase();
    });
}

function formatFullCalendarDate(date) {
    if (!date) return '';
    return moment(date).local().calendar(null, {
        sameDay: '[Hôm nay], DD/MM/YYYY',
        nextDay: '[Ngày mai], DD/MM/YYYY',
        nextWeek: 'dddd, DD/MM/YYYY',
        lastDay: 'dddd, DD/MM/YYYY',
        lastWeek: 'dddd, DD/MM/YYYY',
        sameElse: 'dddd, DD/MM/YYYY'
    }).replace(/^\w/, function (chr) {
        return chr.toUpperCase();
    });
}

function formatFullDateFromUnix(unix) {
    if (!unix) return '';
    return moment.unix(unix).local().calendar(null, {
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

function getDealTimeRemain(date) {
    const todayDate = moment(new Date());

    let diff = date.diff(todayDate, 'days');
    if (diff > 0) return `Còn ${diff.toFixed(0)} ngày`;

    diff = date.diff(todayDate, 'hours');
    if (diff > 0) return `Còn ${diff.toFixed(0)} giờ`;

    diff = date.diff(todayDate, 'minutes');
    if (diff > 0) return `Còn ${diff.toFixed(0)} phút`;

    return 'Đã hết hạn';
}

function isExpired(date) {
    const todayDate = moment(new Date());
    let diff = date.diff(todayDate, 'minutes');
    return diff <= 0;

}

function pad(num) {
    return ("0"+num).slice(-2);
}

function convertSecond(secs, unit) {
    try {
        let minutes = Math.floor(secs / 60);
        secs = secs%60;
        let hours = Math.floor(minutes/60)
        minutes = minutes%60;

        if (unit === 'hour') {
            return pad(hours);
        }
        else if (unit === 'minute') {
            return pad(minutes);
        }
        return pad(secs);
    }
    catch (e) {
        console.log(e);
    }
    return '';
}

function formatFullCalendarDateByUtc(time) {
    if (!time) return '';
    return moment.utc(time).local().calendar(null, {
        sameDay: '[Hôm nay], DD/MM/YYYY',
        nextDay: '[Ngày mai], DD/MM/YYYY',
        nextWeek: 'dddd, DD/MM/YYYY',
        lastDay: 'dddd, DD/MM/YYYY',
        lastWeek: 'dddd, DD/MM/YYYY',
        sameElse: 'dddd, DD/MM/YYYY'
    }).replace(/^\w/, function (chr) {
        return chr.toUpperCase();
    });
}

function formatFullTimeAndDateFromUnix(unix) {
    if (!unix) return '';
    return moment.unix(unix).local().calendar(null, {
        sameDay: 'hh:mm A, [Hôm nay], DD/MM/YYYY',
        nextDay: 'hh:mm A, [Ngày mai], DD/MM/YYYY',
        nextWeek: 'hh:mm A, dddd DD/MM/YYYY',
        lastDay: 'hh:mm A, dddd DD/MM/YYYY',
        lastWeek: 'hh:mm A, dddd DD/MM/YYYY',
        sameElse: 'hh:mm A, dddd DD/MM/YYYY'
    }).replace(/^\w/, function (chr) {
        return chr.toUpperCase();
    });
}

function parseSeconds(time) {
    try {
        let minutes = Math.floor(time/60);
        let hours = undefined;
        let seconds = 0 ;
        if (minutes >= 60) {
            hours = Math.floor(minutes/60);
            console.log(minutes);

            minutes = minutes%(60*hours);

            seconds = time - minutes*60 - hours*3600;
        }
        else {
            seconds = minutes > 0 ? time%(60*minutes) : time;
        }

        return {
            hours,
            minutes,
            seconds
        }
    }
    catch (e) {
        console.log(e);
    }
    return {
        hours: 0,
        minutes: 0,
        seconds: 0
    }
}

function getClock(time) {
    let clock = '';
    try {
        const cal = parseSeconds(time);
        if (cal.hours > 0) {
            clock = `${cal.hours < 10 ? '0' + cal.hours : cal.hours}:`;
        }
        clock += `${cal.minutes < 10 ? '0' + cal.minutes : cal.minutes}:${cal.seconds < 10 ? '0' + cal.seconds : cal.seconds}`;
    }
    catch (e) {
        console.log(e);
    }
    return clock;
}

const DateUtil = {
    formatCalendarDate,
    formatFullCalendarDate,
    formatFullDateFromUnix,
    getDealTimeRemain,
    isExpired,
    convertSecond,
    formatFullCalendarDateByUtc,
    formatFullTimeAndDateFromUnix,
    parseSeconds,
    getClock
};

exports.DateUtil = DateUtil;
