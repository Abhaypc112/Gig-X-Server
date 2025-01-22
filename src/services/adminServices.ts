import Freelancer from "../models/freelancerModel";
import User from "../models/userModel"
import CustomError from "../utils/customError";
import { IUser } from "../interface/userInterface";
import Gig from "../models/gigModel";
import { ICategory } from "../interface/categoryInerface";
import Category from "../models/categoryModel";
import Order from "../models/orderModel";

export const getAllUsers = async () : Promise <object> => {
    const users = await User.find({}," name email role profileImg isBlock").lean();
    const freelancers = await Freelancer.find({}," name email role skills experience profileImg isBlock").lean();
    if(!users || !freelancers) throw new CustomError("User not fount !",400);
    return [...users,...freelancers]
}
export const blockUser = async (userId : IUser) : Promise <object> => {
    let user = await User.findById(userId);
    if(!user)user = await Freelancer.findById(userId);
    if(!user) throw new CustomError("User not fount !",400);
    user.isBlock = (!user.isBlock)
    return await user.save();
}
export const getAllgigs = async (): Promise <object> =>  {
    const gig = await Gig.find().populate({
        path: 'gigOwner',
        model:'Freelancer',
        select: `name _id role`
    })
    return gig
}
export const blockGig = async (gigId : IUser): Promise <object> =>  {
    const gig = await Gig.findById(gigId).populate({
        path: 'gigOwner',
        model:'Freelancer',
        select: `name _id role`
    });
    if(!gig) throw new CustomError("Gig not fount !",400);
    gig.isBlock = (!gig.isBlock)
    return await gig.save();
}
export const addCategory = async (categoryData : ICategory): Promise <object> =>  {
    const category = await Category.create(categoryData);
    if(!category) throw new CustomError("Category not Created !",400);
    return await category.save();
}
export const adminGetAllOrders = async (): Promise<object> => {
    const orders = await Order.find()
      .populate([
        {
          path: "gigId",
          model: "Gig",
          select: "gigName _id gigImages gigDescription",
          populate: [
            {
              path: "gigOwner",
              model: "Freelancer",
              select: "_id name email",
            },
          ],
        },
        {
          path: "userId",
          model: "User",
          select: "_id name email phone address",
        },
      ]).exec();
  
    if (!orders) throw new CustomError("Orders not Created!", 400);
  
    return orders;
  };
  