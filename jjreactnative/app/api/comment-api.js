import {fetcher} from './fetcher'

const commentApi = {
    getCommentList(dealId, parentId, offset, limit) {
        let url = `v3/comment/?${dealId ? 'did' : 'parent_id'}=${dealId ? dealId : parentId}&offset=${offset}&limit=${limit}`;
        return fetcher.get(url);
    },

    sendComment(dealId, parentId, content) {
        let url = 'v3/comment/';
        const body = {
            did: dealId,
            content: content
        };
        if (parentId) {
            body.parent_id = parentId;
        }
        return fetcher.post(url, body);
    },

    deleteComment(commentId) {
        let url = `v3/comment/${commentId}/`;
        return fetcher.delete(url, 'origin');
    },

    editComment(commentId, content) {
        let url = `v3/comment/${commentId}/`;
        return fetcher.put(url, {content: content})
    },

    getComment(commentId) {
        let url = `v3/comment/${commentId}/`;
        return fetcher.get(url);
    }
};

exports.commentApi = commentApi;