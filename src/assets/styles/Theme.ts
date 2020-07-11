import Colors from "./Colors";

export enum THEME_NAME {
    BLUE = "BLUE",
    BLACK = "BLACK",
};

export const THEMES = {
    [THEME_NAME.BLUE]: {
        MAIN: Colors.DARK_BLUE,
        TEXT: Colors.WHITE,
        LABEL: Colors.LIGHT_BLACK,
        ACTIVE: Colors.WHITE,
        DEFAULT: Colors.LIGHT_GREY,
        SCREEN: Colors.MILK,
        BACKGROUND: Colors.DARK_BLUE,
        BORDER: Colors.DARK_BLUE,
        LINE: Colors.BLUE,
        BACKGROUND_2: Colors.BLUE,
        OVERFLOW: Colors.TRANSPARENT_BLACK
    },
    [THEME_NAME.BLACK]: {
        MAIN: Colors.BLACK,
        TEXT: Colors.WHITE,
        LABEL: Colors.WHITE,
        ACTIVE: Colors.ORANGE,
        DEFAULT: Colors.LIGHT_GREY,
        SCREEN: Colors.LIGHT_BLACK,
        BACKGROUND: Colors.ORANGE,
        BORDER: Colors.ORANGE,
        LINE: Colors.ORANGE,
        BACKGROUND_2: Colors.TRANSPARENT_BLACK,
        OVERFLOW: Colors.TRANSPARENT_BLACK
    }
};

export type ThemeType = {
    MAIN: Colors,
    TEXT: Colors,
    LABEL: Colors,
    ACTIVE: Colors,
    DEFAULT: Colors
    SCREEN: Colors,
    BACKGROUND: Colors,
    BORDER: Colors,
    LINE: Colors,
    BACKGROUND_2: Colors,
    OVERFLOW: Colors
};

export const getActiveTheme = (theme: THEME_NAME): ThemeType => THEMES[theme];
