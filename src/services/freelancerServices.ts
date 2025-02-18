import { IFreelancer } from "../interface/freelancerInterface";
import { IGig } from "../interface/gigInterface";
import { IUser } from "../interface/userInterface";
import Category from "../models/categoryModel";
import Freelancer from "../models/freelancerModel";
import Gig from "../models/gigModel";
import Order from "../models/orderModel";
import CustomError from "../utils/customError";

export const freelancerCreateGig = async (gigData : IGig): Promise <object> =>  {
    const gig = await Gig.create(gigData);
    console.log(gig)
    return gig
}
export const freelancerGetAllGigs = async (userId : IUser): Promise <object> =>  {
    const gig = await Gig.find({gigOwner:userId})
    .populate({
            path: 'gigCategory',
            model:'Category',
    });
    return gig
}
export const freelancerUpdateGigStataus = async (gigId : string): Promise <object> =>  {
    const gig = await Gig.findById(gigId);
    if(!gig) throw new CustomError("Gig not fount !",400);
    gig.isActive = (!gig.isActive)
    return await gig.save();
}
export const freelancerEditGig = async (gigId : string, updatedData : IGig): Promise <object> =>  {
    const updatedGig = await Gig.findByIdAndUpdate(gigId,updatedData);
    if(!updatedGig) throw new CustomError("Gig Updated !",400);
    const gig = await Gig.findById(updatedGig._id);
    if(!gig) throw new CustomError("Gig not fount !",400);
    return gig
}
export const freelancerDeleteGig = async (gigId : string): Promise <object> =>  {
    const gig = await Gig.findByIdAndDelete(gigId);
    if(!gig) throw new CustomError("Gig not fount !",400);
    return gig
}
export const freelancerGetAllCaregory = async (): Promise <object> =>  {
    const category = await Category.find();
    if(!category) throw new CustomError("Category not fount !",400);
    return category
}
export const freelancerGetOrdersById = async (userId : string): Promise <object> =>  {
    const order = await Order.find({gigOwner:userId}).populate([{
        path: 'gigId',
        model:'Gig',
        select: `gigName _id gigImages gigDescription gigOwner userId`,
    },
    {
        path: 'userId',
        model:'User',
        select: `name email `,
    }]).exec()
    return order;
}
export const freelancerGetById = async (userId : string): Promise <object> =>  {
    const freelancer = await Freelancer.findById(userId);
    if(!freelancer) throw new CustomError("Freelancer not fount !",400);
    return freelancer;
}
export const freelancerEditById = async (userId : string , userData : IFreelancer): Promise <object> =>  {
    const freelancer = await Freelancer.findByIdAndUpdate(userId,userData);
    if(!freelancer) throw new CustomError("Freelancer not updated !",400);
    const updatedFreelancer = await Freelancer.findById(userId);
    if(!updatedFreelancer) throw new CustomError("Freelancer not found !",400);
    return updatedFreelancer;
}
