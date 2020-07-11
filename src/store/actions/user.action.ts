import * as userTypes from "../types/userTypes";
import { User } from "../../interfaces/user";

export const userActions = {
    signUpUser: (payload: User) => ({ type: userTypes.SIGN_UP_USER, payload } as const),
    signInUser: (payload: User) => ({ type: userTypes.SIGN_IN_USER, payload } as const),
    logoutUser: () => ({ type: userTypes.LOGOUT_USER } as const),

    setAuth: () => ({ type: userTypes.AUTHORIZED_USER } as const)
};
