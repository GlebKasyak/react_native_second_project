import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { View, StyleSheet, Switch } from "react-native";

import { Container, AppTextBold, AppText } from "../../components/atoms";

import { appActions } from "../../store/actions/app.action";
import { NavigationStackProps } from "../../interfaces/common";
import { TextSize } from "../../assets/styles";
import { THEME_NAMES, DEFAULT_THEME } from "../../assets/styles/Theme";
import { StorageKeys } from "../../shared/constants";


const SettingScreen: NavigationStackProps<{}> = ({ screenProps }) => {
    const dispatch = useDispatch();

    const [isEnabled, setIsEnabled] = useState(screenProps.themeName !== DEFAULT_THEME);
    const color = screenProps.theme.TEXT_2;

    const toggleHandler = async () => {
        setIsEnabled(prevValue => !prevValue);

        const newTheme = isEnabled ? THEME_NAMES.BLUE : THEME_NAMES.BLACK;
        await AsyncStorage.setItem(StorageKeys.APP_THEME, newTheme);
        dispatch(appActions.setAppThemeSuccess(newTheme));
    };

    return (
        <Container>
            <AppTextBold style={{ ...styles.header, color }} >
                Application settings
            </AppTextBold>
            <View style={ styles.toggleWrapper } >
                <AppText style={{ color }} >Change application theme:</AppText>
                <Switch
                    value={ isEnabled }
                    onValueChange={ toggleHandler }
                    trackColor={{ false: screenProps.theme.DEFAULT, true: screenProps.theme.DEFAULT }}
                    thumbColor={ isEnabled ? screenProps.theme.ACTIVE : screenProps.theme.DEFAULT }
                    style={ styles.toggle }
                />
            </View>
        </Container>
    )
};

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontSize: TextSize.LARGE_TEXT
    },
    toggleWrapper: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    toggle: {
        transform: [{ scale: 1.25 }],
    }
})

export default SettingScreen;
