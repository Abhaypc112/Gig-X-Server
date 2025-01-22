import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as adminServices from '../services/adminServices';

export const getAllUsers = catchAsync(async(req:Request,res:Response) => {
    const users = await adminServices.getAllUsers();
    res.json({message:"Success",users})
});
export const blockUser = catchAsync(async(req:Request,res:Response) => {
    const {userId} = req.body;
    const user = await adminServices.blockUser(userId);
    res.json({message:"Success",user})
});
export const getAllGigs = catchAsync(async(req:Request,res:Response) => {
    const gigs = await adminServices.getAllgigs();
    res.json({message:"Success",gigs})
});
export const blockGig = catchAsync(async(req:Request,res:Response) => {
    const {gigId} = req.body;
    const gig = await adminServices.blockGig(gigId);
    console.log(gig)
    res.json({message:"Success",gig})
});
export const addCategory = catchAsync(async(req:Request,res:Response) => {
    const category = await adminServices.addCategory(req.body);
    res.json({message:"Success",category})
});
