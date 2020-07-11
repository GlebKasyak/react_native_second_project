import React, { FC } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Classes } from "../../assets/styles";
import { AppStateType } from "../../store/reducers";
import { AppSelectors } from "../../store/selectors";

const AppLoader: FC = () => {
    const theme = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

    return (
        <View style={ styles.center } >
            <ActivityIndicator size={70} color={ theme.BACKGROUND } />
        </View>
    )
};

const styles = StyleSheet.create({
    center: Classes.CENTER
});

export default AppLoader;
