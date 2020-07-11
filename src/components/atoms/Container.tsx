import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ScrollView, ViewStyle, StyleSheet } from "react-native"

import { AppStateType } from "../../store/reducers";
import { AppSelectors } from "../../store/selectors";

type Props = {
    style?: ViewStyle
};

const Container: FC<Props> = ({ children, style }) => {
    const theme = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

    return (
        <ScrollView
            contentContainerStyle={{ ...styles.container, ...style }}
            style={{ backgroundColor: theme.SCREEN }}
        >
            { children }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
});

export default Container;
