import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as freelancerServices from '../services/freelancerServices';

export const freelancerCreateGig = catchAsync(async(req:Request,res:Response) => {
    const {userId} = req.user as any;
    const data = JSON.parse(req.body.data);
    if(!req.files) res.status(400).json({ message: 'No file uploaded' });
    const uploadedFile = req.files as any
    const gigImages = await uploadedFile.map((image : any) => image.path)
    const gigData = {...data,gigImages,gigOwner:userId}
    const gig = await freelancerServices.freelancerCreateGig(gigData)
    res.status(200).json(gig);
});
export const freelancerGetAllGigs = catchAsync(async(req:Request,res:Response) => {
    const {userId} = req.user as any
    const gig = await freelancerServices.freelancerGetAllGigs(userId)
    res.status(200).json(gig);
});
export const freelancerUpdateGigStataus = catchAsync(async(req:Request,res:Response) => {
    const {gigId} = req.body as any
    const gig = await freelancerServices.freelancerUpdateGigStataus(gigId)
    res.status(200).json(gig);
});
export const freelancerEditGig = catchAsync(async(req:Request,res:Response) => {
    const data = JSON.parse(req.body.data);
    const gigId = data.gigId;
    let updatedData ;
    if(req.files?.length || 0 > 0){
        const uploadedFile = req.files as any
        const images = await uploadedFile.map((image : any) => image.path)
        updatedData = {...data,gigImages:images}
    }else{
        updatedData = data
    }
    const gig = await freelancerServices.freelancerEditGig(gigId,updatedData)
    res.status(200).json(gig);
});
export const  freelancerDeleteGig = catchAsync(async(req:Request,res:Response) => {
    const {gigId} = req.body as any
    const gig = await freelancerServices.freelancerDeleteGig(gigId)
    res.status(200).json(gig);
});
export const  freelancerGetAllCaregory = catchAsync(async(req:Request,res:Response) => {
    const category = await freelancerServices.freelancerGetAllCaregory()
    res.status(200).json(category);
});
// export const  freelancerGetOrdersById = catchAsync(async(req:Request,res:Response) => {
//     const {userId} = req.user as any
//     const category = await freelancerServices.freelancerGetOrdersById(userId)
//     res.status(200).json(category);
// });
