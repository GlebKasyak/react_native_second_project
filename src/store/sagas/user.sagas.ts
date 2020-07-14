import { put, takeEvery  } from "redux-saga/effects";

import { appActions } from "../actions/app.action";
import { userActions } from "../actions/user.action";
import * as userTypes from "../types/userTypes";

function* setAuth() {
    try {
        yield put(userActions.setAuthSuccess());
    } catch (e) {
        console.log(e)
    }
};

export default [
    takeEvery(userTypes.AUTHORIZED_USER_REQUEST, setAuth)
];
