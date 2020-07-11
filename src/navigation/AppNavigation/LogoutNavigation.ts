import { createStackNavigator } from "react-navigation-stack";

import { LogoutScreen } from "../../screens";
import { setDefaultStackNavigationOptions } from "../navigationConfig";

export default createStackNavigator({
    Logout: LogoutScreen,
}, setDefaultStackNavigationOptions("Logout"));

