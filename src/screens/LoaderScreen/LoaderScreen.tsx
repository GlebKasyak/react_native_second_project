import React, { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";

import { Container, AppLoader } from "../../components/atoms";

import { NavigationStackComponentProps } from "../../interfaces/common";
import { StoreType } from "../../store";

type Props = {
    isLoading: boolean
};

const LoaderScreen: NavigationStackComponentProps<Props> = ({ isLoading, navigation }) => {
    useEffect(() => {
        if(!isLoading) {
            navigation.navigate(navigation.getParam("screen"));
        }
    }, [isLoading, navigation])

    return (
        <Container>
            <AppLoader />
        </Container>
    );
};

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    isLoading: rootStore.appStore.isLoading
}))(observer(LoaderScreen) as unknown as FC<{}>);