import * as userTypes from "../types/userTypes";
import { User, GeolocationType } from "../../interfaces/user";

export const userActions = {
    signUpUser: (payload: User) => ({ type: userTypes.SIGN_UP_USER, payload } as const),
    signInUser: (payload: User) => ({ type: userTypes.SIGN_IN_USER, payload } as const),
    logoutUser: () => ({ type: userTypes.LOGOUT_USER } as const),
    setUserGeolocation: (payload: GeolocationType) => ({ type: userTypes.SET_USER_GEOLOCATION, payload } as const),

    setAuthRequest: () => ({ type: userTypes.AUTHORIZED_USER_REQUEST } as const),
    setAuthSuccess: () => ({ type: userTypes.AUTHORIZED_USER_SUCCESS } as const)
};
