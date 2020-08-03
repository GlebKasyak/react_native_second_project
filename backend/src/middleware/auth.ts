import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

import { User } from "../models";
import { DecodedDataType } from "../interfaces";

const auth: RequestHandler = async (req, res, next) => {
    if(req.method === "OPTIONS") {
        return next();
    };

    try {
        const header = req.header("Authorization");
        if(!header) {
            req.isAuth = false;
            return next();
        };

        const token = header.replace("Bearer ", "");
        if(!token) {
            req.isAuth = false;
            return next();
        };

        const decoded = await verify(token, "rn-maps") as DecodedDataType;
        const user = await User.findById(decoded.userId);

        if(!user) {
            req.isAuth = false;
            return next();
        };

        req.user = user;
        req.token = token;
        req.isAuth = true;
        next();
    } catch (err) {
        console.log("Error", err.message)
    }
};

export default auth;
