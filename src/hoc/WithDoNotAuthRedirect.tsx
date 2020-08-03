import React, { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationStackScreenProps } from "react-navigation-stack";

import NavigationUrls from "../navigation/navigationUrls";
import { StorageKeys } from "../shared/constants";
import { StoreType } from "../store";

const WithDoNotAuthRedirect = <P extends NavigationStackScreenProps>(Component: FC<P>) => {
    type StoreProps = {
        isAuth: boolean
    };

    const RedirectComponent: FC<P & StoreProps> = props => {
        useEffect(() => {
            const checkAuth = async () => {
                const isAuthData = await AsyncStorage.getItem(StorageKeys.IS_AUTH);

                if(!isAuthData || !JSON.parse(isAuthData)) {
                    props.navigation.navigate(NavigationUrls.AUTH);
                }
            };

            checkAuth();
        }, [props.navigation, props.isAuth]);

        return <Component { ...props } />
    };

    RedirectComponent.displayName = "WithDoNotAuthRedirect";
    return inject<StoreType, {}, StoreProps, {}>(({ rootStore }) => ({
        isAuth: rootStore.userStore.isAuth
    }))(observer(RedirectComponent) as unknown as FC<P>);
};

export default WithDoNotAuthRedirect;
