import { createStackNavigator } from "react-navigation-stack";

import { LoaderScreen } from "../screens";
import { setDefaultStackNavigationOptions } from "./navigationConfig";

export default createStackNavigator({
    Loader: {
        screen: LoaderScreen,
        navigationOptions: {
            headerShown: false
        }
    },
}, {
    ...setDefaultStackNavigationOptions(),
    navigationOptions: {
        headerShown: false
    }
});

