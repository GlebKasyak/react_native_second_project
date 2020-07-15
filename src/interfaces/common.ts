import { FC, Dispatch, SetStateAction } from "react";
import { NavigationStackOptions, NavigationStackScreenProps } from "react-navigation-stack";
import { NavigationBottomTabOptions, NavigationTabScreenProps } from "react-navigation-tabs";
import { NavigationDrawerOptions, NavigationDrawerScreenProps } from "react-navigation-drawer";

import { ThemeType, THEME_NAMES } from "../assets/styles/Theme";


export type DefaultNavigationOptionsType<Props> = Omit<Props, "screenProps"> & {
    screenProps: {
        theme: ThemeType,
        themeName: THEME_NAMES
    } | any
};

export type NavigationStackProps<P> = FC<P & DefaultNavigationOptionsType<NavigationStackScreenProps>> & { navigationOptions?: NavigationStackOptions | ((props: DefaultNavigationOptionsType<NavigationStackScreenProps>) => NavigationStackOptions) };
export type NavigationTabProps<P> = FC<P & NavigationTabScreenProps> & { navigationOptions?: NavigationBottomTabOptions | ((props: NavigationTabScreenProps) => NavigationBottomTabOptions) };
export type NavigationDrawerProps<P> = FC<P & NavigationDrawerScreenProps> & { navigationOptions?: NavigationDrawerOptions | ((props: NavigationDrawerScreenProps) => NavigationDrawerOptions) };


export type SetStateType<T> = Dispatch<SetStateAction<T>>;
