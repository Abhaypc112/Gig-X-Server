import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/userInterface";

const UserSchema : Schema = new Schema (
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImg: { type: String},
        otp: { type: String},
        googleId: { type: String },
        role: {type: String, required: true, default:"user"},
    },
    { timestamps: true }
)

const User = mongoose.model <IUser> ('User',UserSchema);
export default User;