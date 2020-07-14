import AsyncStorage from "@react-native-community/async-storage";
import { StorageKeys } from "./constants";


export const getShortenedString = (string: string) => {
    if(string.length > 30) {
        return string.substring(0, 45) + "...";
    };

    return string;
};

export const setAuthInAsyncStorage = async () => {
    await AsyncStorage.setItem(StorageKeys.IS_AUTH, JSON.stringify(true));
};
