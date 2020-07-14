import Colors from "./Colors";

export const DEFAULT_THEME = "BLUE";

export enum THEME_NAMES {
    BLUE = "BLUE",
    BLACK = "BLACK",
};

export const THEMES = {
    [THEME_NAMES.BLUE]: {
        MAIN: Colors.DARK_BLUE,
        HEADERS: Colors.WHITE,
        TEXT: Colors.WHITE,
        TEXT_2: Colors.LIGHT_BLACK,
        TEXT_3: Colors.DARK_BLUE,
        ACTIVE: Colors.WHITE,
        DEFAULT: Colors.LIGHT_GREY,
        SCREEN: Colors.MILK,
        BACKGROUND: Colors.DARK_BLUE,
        BORDER: Colors.DARK_BLUE,
        LINE: Colors.BLUE,
        BACKGROUND_2: Colors.BLUE,
        OVERFLOW: Colors.TRANSPARENT_BLACK
    },
    [THEME_NAMES.BLACK]: {
        MAIN: Colors.BLACK,
        HEADERS: Colors.WHITE,
        TEXT: Colors.WHITE,
        TEXT_2: Colors.WHITE,
        TEXT_3: Colors.ORANGE,
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
    HEADERS: Colors,
    TEXT: Colors,
    TEXT_2: Colors,
    TEXT_3: Colors,
    ACTIVE: Colors,
    DEFAULT: Colors
    SCREEN: Colors,
    BACKGROUND: Colors,
    BORDER: Colors,
    LINE: Colors,
    BACKGROUND_2: Colors,
    OVERFLOW: Colors
};

export const getActiveTheme = (theme: THEME_NAMES): ThemeType => THEMES[theme];
