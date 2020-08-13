import { AsyncStorage } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import {STORAGE} from "../const";

//Save merchant
async function setCurrentMerchant(user) {
    try {
        await AsyncStorage.setItem(`${STORAGE}:current_merchant`, JSON.stringify(user));
    } catch (error) {
        console.log(error)
    }
}

async function getCurrentMerchant() {
    try {
        const value = await AsyncStorage.getItem(`${STORAGE}:current_merchant`);
        return JSON.parse(value);
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function removeCurrentMerchant() {
    try {
        LoginManager.logOut();
        await AsyncStorage.removeItem(`${STORAGE}:current_merchant`);
    } catch (error) {
        console.log(error)
    }
}

export const User = {
    //Merchant
    setCurrentMerchant,
    getCurrentMerchant,
    removeCurrentMerchant,
};
