import bcrypt from 'bcrypt';
import CustomError from "../utils/customError";
import { IUser } from '../interface/userInterface';
import User from '../models/userModel';
import { generateAccessToken, generateRefreshToken, sentRefreshToken, verifyRefreshToken } from '../utils/jsonwebtoken';
import Freelancer from '../models/freelancerModel';
import Admin from '../models/adminModel';
import { Response } from 'express';
import { IFreelancer } from '../interface/freelancerInterface';

export const doSignupUser = async (res:Response, userData : IUser | IFreelancer) : Promise <object> => {
    const {email,name, password, role} = userData;
    console.log(userData);
    
    let existUser,user;
    if(role === "user") existUser = await User.findOne({email});
    if(role === "freelancer") existUser = await Freelancer.findOne({email});
    if(existUser) throw new CustomError("User alredy exist, Please Login !",404);
    const hashPassword = await bcrypt.hash(password,10);
    if(role === "user") user = await User.create({email,name,password:hashPassword});
    if(role === "freelancer") user = await Freelancer.create({email,name,password:hashPassword});
    console.log(user);
    
    if(!user) throw new CustomError("Signup faild !",400);
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id,user.role);
    sentRefreshToken(res,refreshToken);
    return {
        user:{
            name:user.name,
            email:user.email,
            role:user.role,
        },accessToken}
}
export const doLogin = async (res:Response, userData:IUser) : Promise <object> => {
    const {email,password} = userData;
    let user = await User.findOne({email});
    if(!user) user = await Freelancer.findOne({email});
    if(!user) user = await Admin.findOne({email});
    if(!user) throw new CustomError("Invalid email or password !",401);
    const verifyPassword = await bcrypt.compare(password,user.password);
    if(!verifyPassword) throw new CustomError("Incorrect password !",401);
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id,user.role);
    sentRefreshToken(res,refreshToken);
    return {
        user:{
            name:user.name,
            email:user.email,
            role:user.role,
        },accessToken}
}
export const tokenGenerator = async (refToken:string) : Promise <object> => {
    const payload =  verifyRefreshToken(refToken);
    if(!payload.userId || !payload.role ) throw new CustomError("Unauthorized !",401);
    const newAccessToken = generateAccessToken(payload.userId,payload.role);
    return {accessToken:newAccessToken}
}