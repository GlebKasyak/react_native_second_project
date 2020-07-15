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

export const sortMarketsByDistance = (data: Array<MarketType>,location: GeolocationType) => {
    const markets = data.map(({ lon, lat, ...rest }) => ({
        ...rest,
        distance: getDistance(location, { lon, lat })
    }));

    return markets.sort(((a, b) => a.distance - b.distance));
};
