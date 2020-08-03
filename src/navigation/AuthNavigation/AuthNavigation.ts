import { createStackNavigator } from "react-navigation-stack";

import LoginNavigation from "./LoginNavigation";
import RegisterNavigation from "./RegisterNavigation";
import { setDefaultStackNavigationOptions } from "../navigationConfig";
import LoaderNavigation from "../LoaderNavigation";

export default createStackNavigator({
    Login: LoginNavigation,
    Register: RegisterNavigation,
    Loader: LoaderNavigation
}, {
    ...setDefaultStackNavigationOptions()
});
