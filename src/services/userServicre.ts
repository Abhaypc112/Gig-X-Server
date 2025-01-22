import { IOrder } from "../interface/orderInterface"
import Category from "../models/categoryModel"
import Gig from "../models/gigModel"
import Order from "../models/orderModel"
import CustomError from "../utils/customError"

export const getAllgigs = async (): Promise <object> =>  {
    const gig = await Gig.find({isBlock:false}).populate({
        path: 'gigOwner',
        model:'Freelancer',
        select: `name _id role`
    })
    return gig
}
export const getAllCategorys = async (): Promise <object> =>  {
    const category = await Category.find()
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
            select: `_id name email`
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
            select: `_id name email`
        }
    }).exec()
    return order;
}
export const handlePaymentStatus = async (orderDetails : IOrder): Promise <object> =>  {
    console.log(orderDetails._id)
    let order = await Order.findById(orderDetails._id);
    if(!order) throw new CustomError("Order not fount !",401);
    order.paymentStatus = true;
    return await order.save();
}