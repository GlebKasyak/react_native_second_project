import { observable, decorate, action } from "mobx";

import { User, GeolocationType } from "../../interfaces/user";

const initialUserState =  {
    firstName: "Gleb",
    secondName: "Kasyak",
    email: "sonyck94@gmail.com",
    password: "12345",
};

const initialGeolocationState = {
    latitude: 0,
    longitude: 0
};

export class UserStore {
    user = initialUserState;
    geolocation = initialGeolocationState;
    isAuth = false;

    login = (data: User) => {
        this.user = data;
        this.isAuth = true;
    };

    logout = () => {
        this.user = initialUserState;
        this.geolocation = initialGeolocationState;
        this.isAuth = false;
    };

    setAuth = () => {
        this.isAuth = true;
    };

    setUserGeolocation = (data: GeolocationType) => {
       this.geolocation =  data;
    };
};

decorate(UserStore, {
    user: observable,
    geolocation: observable,
    isAuth: observable,

    login: action,
    logout: action,
    setAuth: action,
    setUserGeolocation: action,
});

export type UserStoreType = {
    user: typeof initialUserState,
    geolocation: typeof initialGeolocationState,
    isAuth: boolean,

    login: (data: User) => void,
    logout: () => void,
    setAuth: () => void,
    setUserGeolocation: (data: GeolocationType) => void,
}
