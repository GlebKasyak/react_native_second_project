import { createStackNavigator } from "react-navigation-stack";

import { MapScreen } from "../../screens";
import { setDefaultStackNavigationOptions } from "../navigationConfig";

export default createStackNavigator({
    Map: MapScreen,
}, setDefaultStackNavigationOptions("Map"));

