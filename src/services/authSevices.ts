import bcrypt from 'bcrypt';
import CustomError from "../utils/customError";
import { IUser } from '../interface/userInterface';
import User from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from '../utils/jsonwebtoken';

export const doSignupUser = async (userData : IUser): Promise <Object> => {
    const {email, password} = userData;
    const existUser = await User.findOne({email});
    if(existUser) throw new CustomError("User alredy exist, Please Login !",404);
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({email,password:hashPassword});
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id,user.role);
    return {user,token:{accessToken,refreshToken}}
}
export const doLoginUser = async (userData : IUser):Promise <Object> => {
    const {email,password} = userData;
    const user = await User.findOne({email});
    if(!user) throw new CustomError("Invalid email or password !",401);
    const verifyPassword = await bcrypt.compare(password,user.password);
    if(!verifyPassword) throw new CustomError("Incurrect password !",401);
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id,user.role);
    return {user,token:{accessToken,refreshToken}}
}