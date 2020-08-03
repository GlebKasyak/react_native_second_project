import AsyncStorage from "@react-native-community/async-storage";
import { getDistance } from "geolib";

import { StorageKeys } from "./constants";
import { GeolocationType } from "../interfaces/user";
import { MarketType } from "../interfaces/market";

export const getShortenedString = (string: string) => {
    if(string.length > 30) {
        return string.substring(0, 45) + "...";
    };

    return string;
};

export const setAuthInAsyncStorage = async () => {
    await AsyncStorage.setItem(StorageKeys.IS_AUTH, JSON.stringify(true));
};

export const setTokenToStorage = async (data: string) => await AsyncStorage.setItem(StorageKeys.TOKEN, data);
export const getTokenFromStorage = async () => await AsyncStorage.getItem(StorageKeys.TOKEN);

export const addDistanceToMarkets = (data: Array<MarketType>, location: GeolocationType) => (
    data.map(market => ({
        ...market,
        distance: getDistance(location, { lon: market.lon, lat: market.lat })
    }))
);

export const getCurrentTime = () => {
    const today = new Date();
    return `${ today.getHours() }:${ today.getMinutes() }`
};
