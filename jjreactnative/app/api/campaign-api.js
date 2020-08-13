import {fetcher} from './fetcher'

const campaignApi = {
    initGameInfo() {
        return fetcher.get(`v4/blackfridayuseractivity/`, undefined, true).then(response => response.objects[0]);
    },

    getGift() {
        return fetcher.post(`v4/takegift/`, undefined, undefined, true).then(response => response.objects[0]);
    },

    getMoreTurn(post_id) {
        const url = `v4/blackfridayuseractivity/`;
        const data = {
            action: 'share',
            share_id: post_id
        };
        return fetcher.post(url, data, undefined, true);
    },

    shareReceived(playerId) {
        const data = {
            action: 'accept_invite',
            invite_user_game_id: playerId
        };
        return fetcher.post('v4/yespartygameuserinvite/', data, undefined, true);
    }
};

exports.campaignApi = campaignApi;