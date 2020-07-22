import React, { FC } from "react";
import { observer, inject } from "mobx-react";
import { Text, StyleSheet, TextStyle } from "react-native";

import Fonts from "../../assets/fonts";
import { ThemeType } from "../../assets/styles/Theme";
import { StoreType } from "../../store";

type OwnProps = {
    style?: TextStyle
};

type StateProps = {
    theme: ThemeType
};

type Props = StateProps & OwnProps;

const AppText: FC<Props> = ({ children, style, theme }) => (
    <Text style={{ ...styles.default, color: theme.TEXT, ...style }} >
        { children }
    </Text>
);

const styles = StyleSheet.create({
    default: {
        fontFamily: Fonts.OPEN_SANS_REGULAR
    }
});

export default inject<StoreType, {}, StateProps, {}>(({ rootStore }) => ({
    theme: rootStore.appStore.appTheme.theme
}))(observer(AppText) as unknown as FC<OwnProps>);
