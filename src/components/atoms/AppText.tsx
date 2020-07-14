import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Text, StyleSheet, TextStyle } from "react-native";

import Fonts from "../../assets/fonts";
import { AppStateType } from "../../store/reducers";
import { AppSelectors } from "../../store/selectors";

type Props = {
    style?: TextStyle
};

const AppText: FC<Props> = ({ children, style }) => {
    const { theme } = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

    return  (
        <Text style={{ ...styles.default, color: theme.TEXT, ...style }} >
            { children }
        </Text>
    )
}

const styles = StyleSheet.create({
    default: {
        fontFamily: Fonts.OPEN_SANS_REGULAR
    }
});

export default AppText;
