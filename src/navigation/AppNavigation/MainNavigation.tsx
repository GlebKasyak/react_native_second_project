import React from "react";
import { createStackNavigator, NavigationStackScreenProps } from "react-navigation-stack";
import { View, Text } from "react-native";

import { MainScreen, MarketScreen } from "../../screens";
import { setDefaultStackNavigationOptions } from "../navigationConfig";

import { DefaultNavigationOptionsType } from "../../interfaces/common";

export default createStackNavigator({
    Main: MainScreen,
    Market: {
        screen: MarketScreen,
        navigationOptions: ({ navigation, screenProps }: DefaultNavigationOptionsType<NavigationStackScreenProps>) => {
            const { id, title } = navigation.getParam("market");

            return {
                headerTitle: `Market  ${ title } ${ id }`,
                headerTitleStyle: {
                    left: -22
                },
                headerPressColorAndroid: screenProps.theme.ACTIVE
            }
        }
    }
}, setDefaultStackNavigationOptions("All markets"));

