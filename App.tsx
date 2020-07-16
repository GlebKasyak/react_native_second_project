import React, { useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Provider, useSelector, useDispatch } from "react-redux";
import { StatusBar } from "react-native";

import { Container, AppLoader } from "./src/components/atoms";

import SwitchNavigator from "./src/navigation/SwitchNavigator";
import { StorageKeys } from "./src/shared/constants";
import { useGeolocation } from "./src/hooks";
import { THEME_NAMES } from "./src/assets/styles/Theme";

import store from "./src/store";
import { AppStateType } from "./src/store/reducers";
import { userActions } from "./src/store/actions/user.action";
import { appActions } from "./src/store/actions/app.action";
import { AppSelectors } from "./src/store/selectors";
import {ErrorMessage} from "./src/components/moleculs";

const App = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));
    const isLoading = useSelector((state: AppStateType) => AppSelectors.getLoading(state));
    const [getGeolocation, errorMessage] = useGeolocation();

    useEffect(() => {
        const checkAuth = async () => {
            const authData = await AsyncStorage.getItem(StorageKeys.IS_AUTH);

            if(!!authData && JSON.parse(authData)) {
                dispatch(userActions.setAuthRequest());
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        dispatch(appActions.setAppThemeRequest());
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

    return <SwitchNavigator screenProps={ theme }  />
};

const AppWithStore = () => (
    <Provider store={ store } >
        <StatusBar barStyle="dark-content" />
        <App />
    </Provider>
);

export default AppWithStore;
