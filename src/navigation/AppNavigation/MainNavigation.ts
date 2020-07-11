import { createStackNavigator } from "react-navigation-stack";

import { MainScreen } from "../../screens";
import { setDefaultStackNavigationOptions } from "../navigationConfig";

export default createStackNavigator({
    Main: MainScreen,
}, setDefaultStackNavigationOptions("All markets"));

