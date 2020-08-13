export const UPDATE_CAMPAIGN_SOURCE = "UPDATE_CAMPAIGN_SOURCE";
export const UPDATE_CAMPAIGN_SOURCE_FROM_NOF_DATA = "UPDATE_CAMPAIGN_SOURCE_FROM_NOF_DATA";
export const UPDATE_FIRST_CAMPAIGN_SOURCE = "UPDATE_FIRST_CAMPAIGN_SOURCE";

export const updateCampaignSource = (url_query) => {
    return {
        type: UPDATE_CAMPAIGN_SOURCE,
        url_query
    }
}

export const updateCampaignSourceFromNofData = (data) => {
    return {
        type: UPDATE_CAMPAIGN_SOURCE_FROM_NOF_DATA,
        data
    }
}

export const updateFirstCampaignSource = () => {
    return {
        type: UPDATE_FIRST_CAMPAIGN_SOURCE
    }
}