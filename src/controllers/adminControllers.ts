import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as adminServices from '../services/adminServices';
import { ICategory } from "../interface/categoryInerface";

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
    const image = req.file?.path;
    const categoryData = {...req.body,image}
    const category = await adminServices.addCategory(categoryData);
    res.json({message:"Success",category})
});
export const getAllCategory = catchAsync(async(req:Request,res:Response) => {
    const category = await adminServices.getAllCategory();
    res.json({message:"Success",category})
});
export const editCategory = catchAsync(async(req:Request,res:Response) => {
    const image = req.file?.path;
    const categoryId = req.body._id;
    const updatedData = {...req.body,image}
    const category = await adminServices.editCategory(categoryId,updatedData);
    res.json({message:"Success",category})
});
export const deleteCategory = catchAsync(async(req:Request,res:Response) => {
    const {categoryId} = req.params;
    const category = await adminServices.deleteCategory(categoryId);
    res.json({message:"Success",category})
});
export const adminGetAllOrders = catchAsync(async(req:Request,res:Response) => {
    const orders = await adminServices.adminGetAllOrders();
    res.json({message:"Success",orders})
});

