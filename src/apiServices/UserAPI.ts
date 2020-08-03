import axios from "axios";

import { LoginType, User } from "../interfaces/user";

class UserAPI {
    static login = (data: LoginType) => {
        const requestBody = {
          query: `
            query {
                login(email: "${ data.email }", password: "${ data.password }") {
                    token
                }
            }
          `
        };

        return axios.post("/graphql", JSON.stringify(requestBody));
    };

    static getSelfData = () => {
        const requestBody = {
            query: `
                query {
                    auth {
                        _id
                        firstName
                        secondName
                        email
                    }
                }
            `
        };

        return axios.post("/graphql", JSON.stringify(requestBody));
    };

    static register = (data: User) => {
        const requestBody = {
            query: `
                mutation {
                  register(registerInput: { 
                    email: "${ data.email }", 
                    password: "${ data.password }", 
                    firstName: "${ data.firstName }",
                    secondName: "${ data.secondName }"
                  }) {
                     token
                  }
                }
            `
        };

        return axios.post("/graphql", JSON.stringify(requestBody));
    }
}

export default UserAPI;