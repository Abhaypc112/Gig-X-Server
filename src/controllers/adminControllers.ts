import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as adminServices from '../services/adminServices';

export const getAllUsers = catchAsync(async(req:Request,res:Response) => {
    const users = await adminServices.getAllUsers();
    res.send(users)
});
export const blockUser = catchAsync(async(req:Request,res:Response) => {
    const {userId} = req.body;
    const users = await adminServices.blockUser(userId);
    res.send(users)
});
export const getAllGigs = catchAsync(async(req:Request,res:Response) => {
    const users = await adminServices.getAllgigs();
    res.send(users)
});
export const blockGig = catchAsync(async(req:Request,res:Response) => {
    const {gigId} = req.body;
    const gig = await adminServices.blockGig(gigId);
    res.send(gig)
});
