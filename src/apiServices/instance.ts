import axios from "axios";

import { Env } from "../shared/constants";
import { getTokenFromStorage } from "../shared/helpers";

export default () => {
    axios.defaults.baseURL = Env.SERVER_URL;
    axios.defaults.headers = {
        "Content-Type": "application/json"
    };

    axios.interceptors.request.use(async config => {
       const authData = await getTokenFromStorage();

       if(authData) {
           config.headers.Authorization = `Bearer ${ authData }`;
       };

       return config;
    }, error => console.log(error));

    axios.interceptors.response.use(res => res.data,
        ({ response }) => Promise.reject(response.data))
};
