import {AsyncStorage} from "react-native";
import {STORAGE} from "../../const";
import {StringUtil} from '../../utils/string-util'

export const fetchHistory = async() => {
    try {
        const value = await AsyncStorage.getItem(`${STORAGE}:search_deal_keyword_history`);
        if (StringUtil.isEmpty(value)) return undefined;
        return JSON.parse(value)
    } catch (error) {
        console.log('fetchHistory:error', error)
        return null;
    }
}

export const addKeyword = async(keyword) => {
    try {
        const value = await fetchHistory();
        let keywords;
        if (value !== undefined && value !== null && Array.isArray(value) && value.length > 0) {
            keywords = value
            for (let i = 0; i < keywords.length; i++) {
                if (keyword === keywords[i].keyword) {
                    keywords.splice(i, 1)
                    break
                }
            }
            if (keywords.length >= 10) {
                keywords.splice(keywords.length - 1, 1)
            }
            keywords.unshift({keyword: keyword})
        } else {
            keywords = [{keyword: keyword}];
        }
        await AsyncStorage.setItem(`${STORAGE}:search_deal_keyword_history`, JSON.stringify(keywords));
        return keywords
    } catch (error) {
        console.log(error)
    }
}

export const removeKeyword = async(keyword, deleteAll) => {
    try {
        if (deleteAll) {
            await AsyncStorage.removeItem(`${STORAGE}:search_deal_keyword_history`);
            return []
        }
        const value = await fetchHistory();
        let keywords = [];
        if (value !== undefined && value !== null && Array.isArray(value) && value.length > 0) {
            keywords = value
            for (let i = 0; i < keywords.length; i++) {
                if (keyword === keywords[i].keyword) {
                    keywords.splice(i, 1)
                    break
                }
            }
            await AsyncStorage.setItem(`${STORAGE}:search_deal_keyword_history`, JSON.stringify(keywords));
        }
        return keywords
    } catch (error) {
        console.log(error)
        return null;
    }
}