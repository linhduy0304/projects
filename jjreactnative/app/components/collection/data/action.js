export const SAVE_COLLECTION = "SAVE_COLLECTION";
export const SAVE_COLLECTION_STATUS = "SAVE_COLLECTION_STATUS";

export const saveCollection = (slug, is_save, save_count) => {
    return {
        type: SAVE_COLLECTION,
        slug,
        is_save,
        save_count
    }
}

export const updateSaveCollectionStatus = (slug, is_save, save_count) => {
    return {
        type: SAVE_COLLECTION_STATUS,
        slug,
        is_save,
        save_count
    }
}