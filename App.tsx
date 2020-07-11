import React, { useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Provider, useSelector, useDispatch } from "react-redux";
import { StatusBar } from "react-native";

import SwitchNavigator from "./src/navigation/SwitchNavigator";
import { StorageKeys } from "./src/shared/constants";

import store from "./src/store";
import { AppStateType } from "./src/store/reducers";
import { userActions } from "./src/store/actions/user.action";
import { AppSelectors } from "./src/store/selectors";

const App = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

    useEffect(() => {
        const checkAuth = async () => {
            const authData = await AsyncStorage.getItem(StorageKeys.IS_AUTH);

            if(!!authData && JSON.parse(authData)) {
                dispatch(userActions.setAuth());
            }
        };

        checkAuth();
    }, []);

    return <SwitchNavigator screenProps={ theme }  />
};

const AppWithStore = () => (
    <Provider store={ store } >
        <StatusBar barStyle="dark-content" />
        <App />
    </Provider>
);

export default AppWithStore;
