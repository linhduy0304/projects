
function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;
    const earthRadius = 3959;
    const alpha = deltaLat / 2;
    const beta = deltaLon / 2;
    const a = Math.sin(deg2rad(alpha)) * Math.sin(deg2rad(alpha)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(deg2rad(beta)) * Math.sin(deg2rad(beta));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance.toFixed(1);
}

function parserCityNameToParamsName(city) {
    switch (city) {
        case 'Hà Nội':
            return 'ha-noi'
        case 'Hồ Chí Minh':
        case 'Tp.Hồ Chí Minh':
            return 'tp-hcm'
        case 'Đà Nẵng':
            return 'da-nang'
        default:
            return 'ha-noi'
    }
}

function isSupportCity(city) {
    switch (city) {
        case 'Hà Nội':
            return true
        case 'Hồ Chí Minh':
        case 'Tp.Hồ Chí Minh':
            return true
        case 'Đà Nẵng':
            return true
        default:
            return false
    }
}

const LocationUtil = {
    calculateDistance,
    parserCityNameToParamsName,
    isSupportCity
};

exports.LocationUtil = LocationUtil;