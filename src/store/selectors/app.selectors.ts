import { AppStateType } from "../reducers";

export class AppSelectors {
    static getAppTheme = (state: AppStateType) => state.app.appTheme;

    static getLoading = (state: AppStateType) => state.app.isLoading
};
