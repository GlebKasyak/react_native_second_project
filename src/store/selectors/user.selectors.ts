import { AppStateType } from "../reducers";

export class UserSelectors {
    static getIsAuth = (state: AppStateType) => state.user.isAuth;

    static getUserData = (state: AppStateType) => state.user.user;
};
