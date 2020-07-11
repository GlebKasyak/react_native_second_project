import { Reducer } from "redux";

import * as appTypes from "../types/appTypes";
import { appActions } from "../actions/app.action";
import { THEME_NAME, THEMES, getActiveTheme } from "../../assets/styles/Theme";
import { InferActionsTypes } from "./index";

const initialState = {
    themeName: THEME_NAME.BLUE as THEME_NAME,
    theme: THEMES[THEME_NAME.BLUE]
};

type StateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof appActions>;

const reducer: Reducer<StateType, ActionTypes> = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case appTypes.SET_APP_THEME:
            return {
                ...state,
                themeName: action.payload,
                theme: getActiveTheme(action.payload)
            };
        default:
            return state;
    }
};

export default reducer;
