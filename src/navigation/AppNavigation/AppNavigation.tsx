import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { serTabsNavigationOptions } from "../navigationConfig";

import MainNavigation from "./MainNavigation"
import SettingNavigation from "./SettingNavigation"
import MapNavigation from "./MapNavigation"
import LogoutNavigation from "./LogoutNavigation"

export default createBottomTabNavigator({
    Main: {
        screen: MainNavigation,
        ...serTabsNavigationOptions("All markets", "albums")
    },
    Map: {
        screen: MapNavigation,
        ...serTabsNavigationOptions("Map", "globe-outline")
    },
    Setting: {
        screen: SettingNavigation,
        ...serTabsNavigationOptions("Setting", "ios-settings")
    },
    Logout: {
        screen: LogoutNavigation,
        ...serTabsNavigationOptions("Logout", "ios-close-circle")
    },
});

