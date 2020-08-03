import { Schema, model } from "mongoose";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUserDocument, IUserModel } from "../interfaces/user.interface";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
    },
    secondName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }
}, {
    timestamps: true
});

userSchema.pre<IUserDocument>("save", async function(next) {
    const user = this;

    if(user.isModified("password")) {
      user.password = await hash(user.password, 15);
    };

    next();
});

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error("User does not exist!");
    };

    const isMatch = await compare(password, user.password);
    if(!isMatch) {
        throw new Error("Password is incorrect, please try again!");
    };

    return user;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this as IUserDocument;
    const token = sign({ userId: user._id }, "rn-maps");

    return { token };
};

const User = model<IUserDocument, IUserModel>("User", userSchema);
export default User;
