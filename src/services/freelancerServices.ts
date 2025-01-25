import { IGig } from "../interface/gigInterface";
import { IUser } from "../interface/userInterface";
import Category from "../models/categoryModel";
import Gig from "../models/gigModel";
import CustomError from "../utils/customError";

export const freelancerCreateGig = async (gigData : IGig): Promise <object> =>  {
    const gig = await Gig.create(gigData);
    console.log(gig)
    return gig
}
export const freelancerGetAllGigs = async (userId : IUser): Promise <object> =>  {
    const gig = await Gig.find({gigOwner:userId});
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
// export const freelancerGetOrdersById = async (): Promise <object> =>  {
//     const category = await Category.find();
//     if(!category) throw new CustomError("Category not fount !",400);
//     return category
// }
