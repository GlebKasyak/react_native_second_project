import { createSwitchNavigator, createAppContainer } from "react-navigation";

import AppNavigation from "./AppNavigation/AppNavigation";
import AuthNavigation from "./AuthNavigation/AuthNavigation";
import LoaderNavigation from "./LoaderNavigation";

const SwitchNavigator = createSwitchNavigator({
    Auth: AuthNavigation,
    App: AppNavigation,
    Loader: LoaderNavigation,
});

export default createAppContainer(SwitchNavigator);
