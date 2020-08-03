import { Request } from "express";

import { User } from "../models";
import { ErrorHandler } from "../shared/error";
import { IUserDocument } from "../interfaces/user.interface";

export default {
    login: async ({ email, password }: { email: string, password: string }) => {
        try {
            const user = await User.findByCredentials(email, password);
            return await user.generateAuthToken();
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    register: async ({ registerInput }: { registerInput: IUserDocument }) => {
        try {
            const user = await User.create(registerInput);
            if(!user) {
                throw new Error("User is not create");
            };

            return await user.generateAuthToken();
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    },
    auth: async (arg: null, req: Request) => {
        try {
            if(!req.isAuth) {
                throw new Error("Unauthenticated!");
            };

            return req.user;
        } catch (err) {
            throw new ErrorHandler(400, err.message);
        }
    }
};
