import jwt from "jsonwebtoken";
import { config } from "../config/config";
import CustomError from "./customError";
import { ObjectId } from "mongoose";

interface Itoken {
    userId:ObjectId,
    role?:string
};

export const generateAccessToken = (userId: ObjectId, role: string) : string => {
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;
    const payload = {userId,role} as Itoken;
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '15m'});
};

export const generateRefreshToken = (userId: ObjectId, role: string) : string => {
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;
    const payload = {userId,role} as Itoken;
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '7d'});
};

export const verifyAccessToken = (token: string) : Itoken => {
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;
    try{
        return jwt.verify(token, JWT_SECRET_KEY) as Itoken;
    }catch{
        throw new CustomError('Invalid or expired access token',401);
    }
};

export const verifyRefreshToken = (token: string): Itoken => {
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY as string;
    try{
        return jwt.verify(token, JWT_SECRET_KEY) as Itoken;
    }catch{
        throw new CustomError('Invalid or expired refresh token',401);
    }
};