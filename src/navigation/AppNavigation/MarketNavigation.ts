import { createStackNavigator } from "react-navigation-stack";

import { MarketScreen } from "../../screens";
import { setDefaultStackNavigationOptions } from "../navigationConfig";

export default createStackNavigator({
    Market: MarketScreen,
}, setDefaultStackNavigationOptions("Market"));

