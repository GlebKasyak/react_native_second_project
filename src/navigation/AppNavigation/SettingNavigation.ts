import { createStackNavigator } from "react-navigation-stack";

import { SettingScreen } from "../../screens";
import { setDefaultStackNavigationOptions } from "../navigationConfig";

export default createStackNavigator({
    Setting: SettingScreen,
}, setDefaultStackNavigationOptions("Setting"));

