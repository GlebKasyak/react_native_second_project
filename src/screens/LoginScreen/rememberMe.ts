import AsyncStorage from "@react-native-community/async-storage";

export type RememberMeDataType = {
    password: string,
    email: string
};

export const setLoginDataToAsyncStorage = async (isRememberMe: boolean, data: RememberMeDataType) => {
    if(isRememberMe) {
        await AsyncStorage.setItem("rememberMe", JSON.stringify(data));
    } else {
        await AsyncStorage.removeItem("rememberMe");
    }
};
