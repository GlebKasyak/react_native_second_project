import { createStackNavigator } from "react-navigation-stack";

import LoginNavigation from "./LoginNavigation";
import RegisterNavigation from "./RegisterNavigation";
import { setDefaultStackNavigationOptions } from "../navigationConfig";

export default createStackNavigator({
    Login: LoginNavigation,
    Register: RegisterNavigation
}, {
    ...setDefaultStackNavigationOptions()
});
