import * as appTypes from "../types/appTypes";
import { THEME_NAMES } from "../../assets/styles/Theme";

export const appActions = {
    setAppThemeRequest: () => ({ type: appTypes.SET_APP_THEME_REQUEST } as const),
    setAppThemeSuccess: (payload: THEME_NAMES) => ({ type: appTypes.SET_APP_THEME_SUCCESS, payload } as const),

    setLoading: (payload: boolean) => ({ type: appTypes.APP_IS_LOADING, payload } as const)
};
