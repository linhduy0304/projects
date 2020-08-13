import {fetcher} from './fetcher'
import {StringUtil} from '../utils/string-util'

const bhdApi = {
    bookingTicket(selectedSeats) {
        return {data: selectedSeats};
    },
};

exports.bhdApi = bhdApi;