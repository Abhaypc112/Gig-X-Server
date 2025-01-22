import bcrypt from 'bcrypt';
import CustomError from "../utils/customError";
import { IUser } from '../interface/userInterface';
import User from '../models/userModel';
import { clearRefreshToken, generateAccessToken, generateRefreshToken, sentRefreshToken, verifyRefreshToken } from '../utils/jsonwebtoken';
import Freelancer from '../models/freelancerModel';
import Admin from '../models/adminModel';
import { Request, Response } from 'express';
import { IFreelancer } from '../interface/freelancerInterface';
import { OAuth2Client } from 'google-auth-library';

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
export const googleSignUp = async (res:Response, credentialResponse : any, userData : IUser | IFreelancer) : Promise <any> => {
    const role = userData.role;
    console.log(userData)
          try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            if (!credentialResponse) {
              throw new CustomError("No google credentials provided!", 400);
            }
        
            // Verify Google token
            const ticket = await client.verifyIdToken({
              idToken: credentialResponse.credential,
              audience: process.env.GOOGLE_CLIENT_ID,
            });
            // Get payload from verified token
            const payload = ticket.getPayload() as any;
        
            // Now we can trust this data as it's verified by Google
            const { email,name } = payload;
            let existUser,user;
            let accessToken,refreshToken;
            if(role === "user") existUser = await User.findOne({email});
            if(role === "freelancer") existUser = await Freelancer.findOne({email});
            if(existUser) {
                accessToken = generateAccessToken(existUser._id, existUser.role);
                refreshToken = generateRefreshToken(existUser._id,existUser.role);
                sentRefreshToken(res,refreshToken);
            }
            if(role === "user") user = await User.create({email,name});
            if(role === "freelancer") user = await Freelancer.create({email,name});
            if(!user) throw new CustomError("Signup faild !",400);
            accessToken = generateAccessToken(user._id, user.role);
            refreshToken = generateRefreshToken(user._id,user.role);
            sentRefreshToken(res,refreshToken);
            return {
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
            },accessToken}
            
          } catch (error : any) {
            res.status(200).json({
              status: false,
              message: "Error occured!",
              errorMessage: error.message
            });
          }  
}
export const doLogin = async (res:Response, userData:IUser) : Promise <object> => {
    const {email,password} = userData;
    let user = await User.findOne({email});
    if(!user) user = await Freelancer.findOne({email});
    if(!user) user = await Admin.findOne({email});
    if(!user) throw new CustomError("Invalid email or password !",401);
    const verifyPassword = await bcrypt.compare(password,user.password);
    if(!verifyPassword) throw new CustomError("Incorrect password !",401);
    if(user.isBlock) throw new CustomError("Blocked Contact Admin !",401);
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
export const userLogOut = async (req:Request ,res:Response) => {
    return clearRefreshToken(req,res)
}

