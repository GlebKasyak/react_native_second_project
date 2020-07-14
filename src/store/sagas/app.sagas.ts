import { call, put, takeEvery  } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";

import { appActions } from "../actions/app.action";
import * as appTypes from "../types/appTypes";
import { StorageKeys } from "../../shared/constants";

function* setAppTheme() {
    try {
        yield put(appActions.setLoading(true));

        const theme = yield call(AsyncStorage.getItem, StorageKeys.APP_THEME);

        if(!!theme) {
            yield put(appActions.setAppThemeSuccess(theme));
        }

        yield put(appActions.setLoading(false));
    } catch (err) {
        console.log(err)
    }
};

export default [
    takeEvery(appTypes.SET_APP_THEME_REQUEST, setAppTheme)
];
