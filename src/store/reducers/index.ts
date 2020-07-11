import { combineReducers } from "redux";

import app from "./app.reducer";
import user from "./user.reducer";

const rootReducer = combineReducers({
    app,
    user
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>;

export default rootReducer;
