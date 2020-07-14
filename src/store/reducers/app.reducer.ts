import { Reducer } from "redux";

import * as appTypes from "../types/appTypes";
import { appActions } from "../actions/app.action";
import { THEMES, DEFAULT_THEME, getActiveTheme } from "../../assets/styles/Theme";
import { InferActionsTypes } from "./index";

const initialState = {
    appTheme: {
        themeName: DEFAULT_THEME,
        theme: THEMES[DEFAULT_THEME],
    },
    isLoading: true
};

type StateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof appActions>;

const reducer: Reducer<StateType, ActionTypes> = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case appTypes.SET_APP_THEME_SUCCESS:
            return {
                ...state,
                appTheme: {
                    themeName: action.payload,
                    theme: getActiveTheme(action.payload)
                }
            };
        case appTypes.APP_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
