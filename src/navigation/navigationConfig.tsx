import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationTabScreenProps } from "react-navigation-tabs";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { DefaultNavigationOptionsType } from "../interfaces/common";
import Fonts from "../assets/fonts";
import { TextSize } from "../assets/styles";

export const setDefaultStackNavigationOptions = (title?: string) => ({
    defaultNavigationOptions: ({ screenProps }: DefaultNavigationOptionsType<NavigationStackScreenProps>) => ({
        title,
        headerTitleStyle: {
            fontFamily: Fonts.OPEN_SANS_BOLD,
        },
        headerStyle: {
            backgroundColor: screenProps.MAIN,
            height: 50,
            borderBottomWidth: 2,
            borderBottomColor: screenProps.LINE
        },
        headerTintColor: screenProps.TEXT,
    })
});

type TabBarIconProps = {
    focused: boolean;
    tintColor?: string;
    horizontal?: boolean;
};

export const serTabsNavigationOptions = (title: string, iconName: string) => ({
    navigationOptions: ({ screenProps }: DefaultNavigationOptionsType<NavigationTabScreenProps>) => ({
        title,
        tabBarIcon: ({ tintColor }: TabBarIconProps) =>
            <Icon name={ iconName } size={25} color={ tintColor } />,
        tabBarOptions: {
            inactiveTintColor: screenProps.DEFAULT,
            activeTintColor: screenProps.ACTIVE,
            labelStyle: {
                fontSize: TextSize.MEDIUM_TEXT,
                paddingBottom: 7
            },
            tabStyle: {
                paddingTop: 7
            },
            style: {
                height: 70,
                backgroundColor: screenProps.MAIN,
                borderTopWidth: 2,
                borderTopColor: screenProps.LINE
            }
        }
    })
})
