import { observable, decorate, action } from "mobx";
import AsyncStorage from "@react-native-community/async-storage";

import { StorageKeys } from "../../shared/constants";
import { THEME_NAMES } from "../../assets/styles/Theme";
import { DEFAULT_THEME, THEMES, getActiveTheme, ThemeType } from "../../assets/styles/Theme";

export type AppThemeType = {
    themeName: THEME_NAMES,
    theme: ThemeType
};

export class AppStore {
    appTheme = {
        themeName: DEFAULT_THEME,
        theme: THEMES[DEFAULT_THEME]
    } as AppThemeType;
    isLoading = true;

    setAppTheme = (themeName: THEME_NAMES) => {
        this.appTheme = {
            themeName: themeName,
            theme: getActiveTheme(themeName)
        };
    };

    setAppThemeFromStorage = async () => {
        this.isLoading = true;
        const theme = await AsyncStorage.getItem(StorageKeys.APP_THEME) as THEME_NAMES;

        theme && this.setAppTheme(theme);
        this.isLoading = false;
    };

    setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
};

decorate(AppStore, {
    appTheme: observable,
    isLoading: observable,

    setAppTheme: action,
    setAppThemeFromStorage: action,
    setLoading: action
});

export type AppStoreType = {
    appTheme: AppThemeType,
    isLoading: boolean,

    setAppTheme: (themeName: THEME_NAMES) => void,
    setAppThemeFromStorage: () => Promise<void>,
    setLoading: (isLoading: boolean) => void
};


