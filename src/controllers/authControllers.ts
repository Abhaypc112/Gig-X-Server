import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { generateOtp, sendOtpEmail } from "../utils/otpGenerator";
import { doLogin, doSignupUser, tokenGenerator } from "../services/authSevices";

export const otpGeneration = catchAsync(async (req:Request,res:Response) => {
    const {email,password} = req.body;
    const otp = generateOtp();
    await sendOtpEmail(email,otp);
    res.json({message:"Success",data:{email,password,otp}})
});
export const userSignup = catchAsync(async (req:Request,res:Response) => {
    const userData = await doSignupUser(res,req.body);
    res.status(200).json({message:"Success",data:userData});
});
export const userLogin = catchAsync(async (req:Request,res:Response) => {
    const userData = await doLogin(res,req.body);
    res.status(200).json({message:"Success",userData});
});
export const refreshToken = catchAsync(async (req:Request,res:Response) => {
    const refreshToken = req.cookies.refreshToken;
    const token = await tokenGenerator(refreshToken);
    res.status(200).json({message:"Success",token});
});
export const adminLogin = catchAsync(async (req:Request,res:Response) => {

});
export const freelancerLogin = catchAsync(async (req:Request,res:Response) => {

});
