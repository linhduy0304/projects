export const ALERT_TITLE_NORMAL = 'Thông báo';
export const ALERT_TITLE_WARNING = 'Lưu ý';
export const ALERT_TITLE_ERROR = 'Lỗi';
export const ALERT_TITLE_CONFIRM = 'Xác nhận';

export const BHD_ERROR_TIMEOUT = 'Phiên của bạn đã hết hiệu lực\nVui lòng đặt lại chỗ';
export const BHD_NOTICE_CANCEL_ORDER = 'Ghế bạn vừa chọn có thể mất\nBạn chắc chắn muốn huỷ đặt chỗ?';
export const BHD_NOTICE_NOT_ALLOW_RATING = 'Phim bạn đặt có giới hạn độ tuổi. Vui lòng chọn xác nhận độ tuổi trước khi thanh toán.';

export const ERROR_EMAIL = 'Địa chỉ email không hợp lệ. Vui lòng nhập thông tin hợp lệ';
export const ERROR_PHONE = 'Số điện thoại không hợp lệ. Vui lòng nhập thông tin hợp lệ';

export const ERROR_AUTH_MESSAGE = 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn! Vui lòng đăng nhập.';
export const ERROR_NORMAL = 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!';

export function getErrorMessage(error, defaultMessage) {
    try {
        if (error === undefined || error === null || error === '') return !!defaultMessage ? defaultMessage : ERROR_NORMAL;

        let message = !!defaultMessage ? defaultMessage : ERROR_NORMAL;

        if (typeof error === 'object') {
            if (!!error.error) {
                message = error.error;
            }
            else if (!!error.message && error.message.indexOf('SyntaxError') < 0) {
                message = error.message;
            }
            else if (!!error.error_message) {
                message = error.error_message;
            }

            if (!message) {
                message = !!defaultMessage ? defaultMessage : ERROR_NORMAL;
            }

            if (message.toLocaleLowerCase().indexOf('network request failed') >= 0) {
                message = 'Vui lòng kiểm tra kết nối mạng và thử lại!';
            }

            return  message;
        }
        if (typeof error === 'string' && error.indexOf('JSON') >= 0) {
            return  !!defaultMessage ? defaultMessage : ERROR_NORMAL;
        }
        return error;
    } catch (e) {
        console.log(e);
    }
    return  !!defaultMessage ? defaultMessage : ERROR_NORMAL;
}

export function firebaseAuthErrorParse(error) {
    try {
        if (!error) return ERROR_NORMAL;
        if (typeof error === 'string') {
            return error;
        }
        const code = error.code;
        if (!code) return error.message;

        if (code.indexOf('invalid-phone-number') >= 0) {
            return 'Số điện thoại không đúng. Vui lòng nhập chính xác số điện thoại!';
        }
        if (code.indexOf('invalid-verification-code') >= 0) {
            return 'Mã xác thực không đúng. Vui lòng kiểm tra lại!';
        }
        if (code.indexOf('session-expired') >= 0) {
            return 'Mã xác thực hết hiệu lực. Vui lòng thử lại!';
        }
    }
    catch (e) {
        console.log(e);
    }
    return ERROR_NORMAL;
}
