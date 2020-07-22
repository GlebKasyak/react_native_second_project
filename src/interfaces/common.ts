import { ComponentType, Dispatch, SetStateAction } from "react";
import { NavigationStackOptions, NavigationStackScreenProps } from "react-navigation-stack";

import { ThemeType, THEME_NAMES } from "../assets/styles/Theme";


export type DefaultNavigationOptionsType<Props> = Omit<Props, "screenProps"> & {
    screenProps: {
        theme: ThemeType,
        themeName: THEME_NAMES
    } | any
};

export type NavigationStackProps = DefaultNavigationOptionsType<NavigationStackScreenProps>;

export type NavigationStackComponentProps<P> = ComponentType<P & NavigationStackProps> & { navigationOptions?: NavigationStackOptions | ((props: NavigationStackProps) => NavigationStackOptions) };

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
