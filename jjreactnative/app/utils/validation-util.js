

export function validateEmail(email) {
    try {
        if (email === undefined || email === null || email === '') return false;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    } catch (e) {
        console.log(e);
        return true;
    }
}

export function validatePhoneNumber(phone) {
    try {
        if (phone === undefined || phone === null || phone === '') return false;
        phone = phone.trim();
        return phone.length > 8 && phone.length < 13;
    } catch (e) {
        console.log(e);
        return true;
    }
}