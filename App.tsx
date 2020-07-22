import React, { useEffect, FC } from "react";
import { Provider, observer, inject } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";
import AsyncStorage from "@react-native-community/async-storage";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import { Container, AppLoader } from "./src/components/atoms";
import { ErrorMessage } from "./src/components/moleculs";

import SwitchNavigator from "./src/navigation/SwitchNavigator";
import { StorageKeys } from "./src/shared/constants";
import { GeolocationType } from "./src/interfaces/user";
import { useGeolocation } from "./src/hooks";

import { rootStore, StoreType } from "./src/store";
import { AppThemeType } from "./src/store/app";

type Props = {
    theme: AppThemeType,
    isLoading: boolean,
    setAppThemeFromStorage: () => void,
    setUserGeolocation: (data: GeolocationType) => void
    setAuth: () => void
};

const App: FC<Props> = (
    {
        theme,
        isLoading,
        setAppThemeFromStorage,
        setUserGeolocation,
        setAuth
    }) => {
    const [getGeolocation, errorMessage] = useGeolocation(setUserGeolocation);

    useEffect(() => {
        const checkAuth = async () => {
            const authData = await AsyncStorage.getItem(StorageKeys.IS_AUTH);
            if(!!authData && JSON.parse(authData)) {
                setAuth();
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        setAppThemeFromStorage();
    }, [])

    if(isLoading) {
        return (
            <Container >
                <AppLoader />
            </Container>
        )
    };

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
    isLoading: rootStore.appStore.isLoading,
    setAppThemeFromStorage: rootStore.appStore.setAppThemeFromStorage,
    setUserGeolocation: rootStore.userStore.setUserGeolocation,
    setAuth: rootStore.userStore.setAuth,
}))(observer(App) as unknown as FC<{}>);

export default () => (
    <Provider rootStore={ rootStore } >
        <StatusBar barStyle="dark-content" />
        <AppWithMobXStore />
    </Provider>
);
