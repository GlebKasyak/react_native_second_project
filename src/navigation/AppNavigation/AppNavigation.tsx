import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { serTabsNavigationOptions } from "../navigationConfig";

import MainNavigation from "./MainNavigation"
import MarketNavigation from "./MarketNavigation"
import MapNavigation from "./MapNavigation"
import LogoutNavigation from "./LogoutNavigation"

export default createBottomTabNavigator({
    Main: {
        screen: MainNavigation,
        ...serTabsNavigationOptions("All markets", "albums")
    },
    Market: {
        screen: MarketNavigation,
        ...serTabsNavigationOptions("Market", "cart")
    },
    Map: {
        screen: MapNavigation,
        ...serTabsNavigationOptions("Map", "globe-outline")
    },
    Logout: {
        screen: LogoutNavigation,
        ...serTabsNavigationOptions("Logout", "ios-close-circle")
    }
});

