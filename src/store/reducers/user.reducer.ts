import { Reducer } from "redux";

import * as userTypes from "../types/userTypes";
import { userActions } from "../actions/user.action";
import { InferActionsTypes } from "./index";

const initialState = {
    user: {
        firstName: "Gleb",
        secondName: "Kasyak",
        email: "sonyck94@gmail.com",
        password: "12345",
    },
    geolocation: {
        latitude: 0,
        longitude: 0
    },
    isAuth: false
};

type StateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof userActions>;

const reducer :Reducer<StateType, ActionTypes> = (state = initialState, action): StateType => {
    switch (action.type) {
        case userTypes.SIGN_IN_USER:
        case userTypes.SIGN_UP_USER:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            };
        case userTypes.LOGOUT_USER:
            return initialState;
        case userTypes.AUTHORIZED_USER_SUCCESS:
            return {
                ...state,
                isAuth: true
            };
        case userTypes.SET_USER_GEOLOCATION:
            return {
                ...state,
                geolocation: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
