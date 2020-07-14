import React from "react";
import { createStackNavigator, NavigationStackScreenProps } from "react-navigation-stack";

import { RegisterScreen } from "../../screens";
import { DefaultNavigationOptionsType } from "../../interfaces/common";

export default createStackNavigator({
    Register: RegisterScreen,
}, {
    navigationOptions: ({ screenProps }: DefaultNavigationOptionsType<NavigationStackScreenProps>) => ({
        headerTitleStyle: {
            left: -22
        },
        headerPressColorAndroid: screenProps.theme.ACTIVE
    }),
    defaultNavigationOptions: {
        title: "Register",
    }
});

