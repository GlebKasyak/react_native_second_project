import React, { FC, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector } from "react-redux";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { AppStateType } from "../store/reducers";
import { UserSelectors } from "../store/selectors";
import NavigationUrls from "../navigation/navigationUrls";
import { StorageKeys } from "../shared/constants";

const WithDoNotAuthRedirect = <P extends NavigationStackScreenProps>(Component: FC<P>) => {
    const RedirectComponent: FC<P> = props => {
        const isAuthFromStore = useSelector((state: AppStateType) => UserSelectors.getIsAuth(state));

        useEffect(() => {
            const checkAuth = async () => {
                const isAuth = await AsyncStorage.getItem(StorageKeys.IS_AUTH);

                if(!isAuth || !JSON.parse(isAuth)) {
                    props.navigation.navigate(NavigationUrls.AUTH);
                }
            };

            checkAuth();
        }, [props.navigation, isAuthFromStore]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = "WithDoNotAuthRedirect";
    return RedirectComponent;
};

export default WithDoNotAuthRedirect;
