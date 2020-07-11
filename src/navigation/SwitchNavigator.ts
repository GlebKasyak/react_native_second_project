import { createSwitchNavigator, createAppContainer } from "react-navigation";

import AppNavigation from "./AppNavigation/AppNavigation";
import AuthNavigation from "./AuthNavigation/AuthNavigation";

const SwitchNavigator = createSwitchNavigator({
    Auth: AuthNavigation,
    App: AppNavigation
});

export default createAppContainer(SwitchNavigator);
