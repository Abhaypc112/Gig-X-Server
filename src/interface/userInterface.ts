import { ObjectId } from "mongoose";

export interface IUser extends Document {
    _id?:ObjectId,
    email: string,
    name:string,
    password: string,
    profileImg?: string,
    otp?: string,
    googleId?: string,
    role:string,
}