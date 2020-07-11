import { AppStateType } from "../reducers";

export class AppSelectors {
    static getAppTheme = (state: AppStateType) => state.app.theme
};
