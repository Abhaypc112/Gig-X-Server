import { IOrder } from "../interface/orderInterface"
import { IReview } from "../interface/ratingInterface"
import Category from "../models/categoryModel"
import Gig from "../models/gigModel"
import Order from "../models/orderModel"
import Review from "../models/ratingModel"
import CustomError from "../utils/customError"

export const getAllgigs = async (): Promise <object> =>  {
    const gig = await Gig.find({isBlock:false}).populate([{
        path: 'gigOwner',
        model:'Freelancer',
        select: `name _id role profileImg`
    },
        {
            path: 'gigCategory',
            model:'Category',
    }])
    return gig
}
export const getAllCategorys = async (): Promise <object> =>  {
    const category = await Category.find({isActive:true})
    return category;
}
export const createOrder = async (orderData : IOrder): Promise <any> =>  {
    const {gigId,userId} = orderData;
    const orderExist = await Order.find({userId,gigId})
    const pendingOrder = orderExist.find((order)=>order.paymentStatus === false || order.orderStatus === false);
    if(pendingOrder) throw new CustomError("Order already exist !",401);
    const order = await (await Order.create(orderData)).populate({
        path: 'gigId',
        model:'Gig',
        select: `gigName _id gigImages gigDescription userId`,
        populate:{
            path: 'gigOwner',
            model:'Freelancer',
            select: `_id name email profileImg`
        },
    })
    return order;
}
export const getOrdersByUserId = async (userId : string): Promise <object> =>  {
    const order = await Order.find({userId}).populate({
        path: 'gigId',
        model:'Gig',
        select: `gigName _id gigImages gigDescription gigOwner`,
        populate:{
            path: 'gigOwner',
            model:'Freelancer',
            select: `_id name email profileImg`
        }
    }).exec()
    return order;
}
export const handlePaymentStatus = async (orderDetails : IOrder): Promise <object> =>  {
    console.log(orderDetails._id)
    let order = await Order.findById(orderDetails._id);
    if(!order) throw new CustomError("Order not fount !",400);
    order.paymentStatus = true;
    return await order.save();
}
export const addGigRating = async (reviewDetails : IReview): Promise <object> =>  {
    const review = await Review.create(reviewDetails);
    if(!review) throw new CustomError("Review not created !",400);
    return review; 
}
export const getGigReviewById = async (gidId:string): Promise <object> =>  {
    const review = await Review.find({gigId:gidId}).populate({
        path:"userId",
        model:"User",
        select:"name email profileImg"
    });
    if(!review) throw new CustomError("Review not Found !",400);
    return review; 
}