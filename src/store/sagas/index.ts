import { all } from "redux-saga/effects";

import appSagas from "./app.sagas";
import userSagas from "./user.sagas";

export default function* () {
    yield all([
        ...appSagas,
        ...userSagas
    ])
};
