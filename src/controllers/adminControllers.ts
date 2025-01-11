import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as adminServices from '../services/adminServices';

export const getAllUsers = catchAsync(async(req:Request,res:Response) => {
    const users = await adminServices.getAllUsers();
    res.send(users)
});
export const updateUser = catchAsync(async(req:Request,res:Response) => {
    const {userId} = req.body;
    const users = await adminServices.updateUser(userId);
    res.send(users)
});