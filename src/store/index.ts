import { AppStore, AppStoreType } from "./app";
import { UserStore, UserStoreType } from "./user";

class RootStore {
    appStore: AppStoreType;
    userStore: UserStoreType;

    constructor() {
        this.appStore = new AppStore();
        this.userStore = new UserStore();
    };
};

export type RootStoreType = {
    appStore: AppStoreType
    userStore: UserStoreType
};

export type StoreType = {
    rootStore: RootStoreType
};

export const rootStore = new RootStore();
