import { ObjectId } from "mongoose";
import Freelancer from "../models/freelancerModel";
import User from "../models/userModel"
import CustomError from "../utils/customError";
import { IUser } from "../interface/userInterface";
import Gig from "../models/gigModel";

export const getAllUsers = async () : Promise <object> => {
    const users = await User.find({}," name email role profileImg isBlock").lean();
    const freelancers = await Freelancer.find({}," name email role skills experience profileImg isBlock").lean();
    if(!users || !freelancers) throw new CustomError("User not fount !",400);
    return {users:[...users,...freelancers]}
}
export const blockUser = async (userId : IUser) : Promise <object> => {
    let user = await User.findById(userId);
    if(!user)user = await Freelancer.findById(userId);
    if(!user) throw new CustomError("User not fount !",400);
    user.isBlock = (!user.isBlock)
    return await user.save();
}
export const getAllgigs = async (): Promise <object> =>  {
    const gig = await Gig.find();
    return gig
}
export const blockGig = async (gigId : IUser): Promise <object> =>  {
    const gig = await Gig.findById(gigId);
    if(!gig) throw new CustomError("Gig not fount !",400);
    gig.isBlock = (!gig.isBlock)
    return await gig.save();
}