import React, { useEffect, FC } from "react";
import { Provider, observer, inject } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";
import AsyncStorage from "@react-native-community/async-storage"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import { ErrorMessage } from "./src/components/moleculs";

import SwitchNavigator from "./src/navigation/SwitchNavigator";
import { GeolocationType } from "./src/interfaces/user";
import { StorageKeys } from "./src/shared/constants";
import { useGeolocation } from "./src/hooks";

import { rootStore, StoreType } from "./src/store";
import { AppThemeType } from "./src/store/app";
import setApiInstance  from "./src/apiServices/instance";

setApiInstance();

type Props = {
    theme: AppThemeType,
    setAppThemeFromStorage: () => void,
    setUserGeolocation: (data: GeolocationType) => void,
    getSelfData: (token: string) => void,
    isAuth: boolean,
};

const App: FC<Props> = ({ theme, setAppThemeFromStorage, setUserGeolocation, getSelfData, isAuth }) => {
    const [getGeolocation, errorMessage] = useGeolocation(setUserGeolocation, isAuth);

    useEffect(() => {
        const checkAuth = async () => {
            const authData = await AsyncStorage.getItem(StorageKeys.TOKEN);
            if(!!authData) {
                getSelfData(authData);
            }
        };

        checkAuth();
    }, [getSelfData]);

    useEffect(() => {
        setAppThemeFromStorage();
    }, [setAppThemeFromStorage]);

    if(errorMessage) {
        return <ErrorMessage
            message={ errorMessage } onFetch={ getGeolocation }
        />
    };

    return (
        <SafeAreaProvider>
            <SwitchNavigator screenProps={ theme }/>
        </SafeAreaProvider>
    )
};

const AppWithMobXStore = inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    theme: rootStore.appStore.appTheme,
    setAppThemeFromStorage: rootStore.appStore.setAppThemeFromStorage,
    setUserGeolocation: rootStore.userStore.setUserGeolocation,
    getSelfData: rootStore.userStore.getSelfData,
    isAuth: rootStore.userStore.isAuth,
}))(observer(App) as unknown as FC);

export default () => (
    <Provider rootStore={ rootStore } >
        <StatusBar barStyle="dark-content" />
        <AppWithMobXStore />
    </Provider>
);
