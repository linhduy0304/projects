export const FETCH_COLLECTION = "FETCH_COLLECTION";
export const FETCH_COLLECTION_SUCCESS = "FETCH_COLLECTION_SUCCESS";
export const FETCH_COLLECTION_FAIL = "FETCH_COLLECTION_FAIL";


export const fetchCollection = (user, dslug) => {
    return {
        type: FETCH_COLLECTION,
        user,
        dslug
    }
}

export const fetchCollectionSuccess = (dslug, collections) => {
    return {
        type: FETCH_COLLECTION_SUCCESS,
        dslug,
        collections,
    }
}

export const fetchCollectionError = (error, dslug) => {
    return {
        type: FETCH_COLLECTION_FAIL,
        error,
        dslug,
    }
}