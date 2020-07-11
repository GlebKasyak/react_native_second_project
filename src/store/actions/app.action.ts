import * as appTypes from "../types/appTypes";
import { THEME_NAME } from "../../assets/styles/Theme";

export const appActions = {
    setAppTheme: (payload: THEME_NAME) => ({ type: appTypes.SET_APP_THEME, payload } as const),
};
