import { observable, decorate, action } from "mobx";

import { UserAPI } from "../../apiServices";
import { User, GeolocationType, LoginType } from "../../interfaces/user";
import { setTokenToStorage, setAuthInAsyncStorage } from "../../shared/helpers";
import { RootStoreType } from "../index";

const initialUserState =  {
    _id: "",
    firstName: "",
    secondName: "",
    email: ""
};

const initialGeolocationState = {
    latitude: 0,
    longitude: 0
};

export class UserStore {
    rootStore: RootStoreType;
    user = initialUserState;
    geolocation = initialGeolocationState;
    isAuth = false;

    constructor(rootStore: RootStoreType) {
        this.rootStore = rootStore;
    };

    login = async (loginData: LoginType) => {
        try {
            this.rootStore.appStore.setLoading(true);

            const { data: { login: { token } } } = await UserAPI.login(loginData);
            token && await this.getSelfData(token);

            this.rootStore.appStore.setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    register = async (data: User) => {
      try {
          this.rootStore.appStore.setLoading(true);

          const { data: { register: { token } } } = await UserAPI.register(data);
          token && await this.getSelfData(token);

          this.rootStore.appStore.setLoading(false);
      } catch(err) {
          console.log(err);
      }
    };

    getSelfData = async (token: string) => {
        try {
            await setTokenToStorage(token);

            const { data: { auth } } = await UserAPI.getSelfData();
            this.user = auth;
            this.isAuth = true;

            await setAuthInAsyncStorage();
        } catch (err) {
            console.log(err)
        }
    };

    logout = () => {
        this.user = initialUserState;
        this.geolocation = initialGeolocationState;
        this.isAuth = false;
    };

    setUserGeolocation = (data: GeolocationType) => {
       this.geolocation = data;
    };
};

decorate(UserStore, {
    user: observable,
    geolocation: observable,
    isAuth: observable,

    login: action,
    register: action,
    getSelfData: action,
    logout: action,
    setUserGeolocation: action,
});

export type UserStoreType = {
    user: typeof initialUserState,
    geolocation: typeof initialGeolocationState,
    isAuth: boolean,

    login: (data: LoginType) => Promise<void>,
    register: (data: User) => Promise<void>,
    getSelfData: (token: string) => Promise<void>,
    logout: () => void,
    setUserGeolocation: (data: GeolocationType) => void,
}
