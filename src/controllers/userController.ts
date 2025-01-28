import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as userServices from '../services/userServicre';
import razorpay from "../utils/razorpay";
import crypto from "crypto";

export const userGetAllGigs = catchAsync(async(req:Request,res:Response) => {
    const gigs = await userServices.getAllgigs();
    res.status(200).json({message:"Success",gigs})
});
export const userGetAllCategorys = catchAsync(async(req:Request,res:Response) => {
    const category = await userServices.getAllCategorys();
    res.status(200).json({message:"Success",category})
});
export const createOrder = catchAsync(async(req:Request,res:Response) => {
    const {userId} = req.user as any
    const orederData = {...req.body,userId}
    const order = await userServices.createOrder(orederData);
    res.status(200).json({message:"Success",order})
});
export const getOrdersByUserId = catchAsync(async(req:Request,res:Response) => {
    const {userId} = req.user as any
    const order = await userServices.getOrdersByUserId(userId);
    res.status(200).json({message:"Success",order})
});
export const razorpayCreateOrder = catchAsync(async(req:Request,res:Response) => {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
});
export const razorpayVerification = catchAsync(async(req:Request,res:Response) => {
    const {response,oredrDetails} = req.body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
        console.log(oredrDetails)
        const order = await userServices.handlePaymentStatus(oredrDetails)
        res.status(200).json({ success: true, order });
    } else {
        res.status(400).json({ success: false, message: "Invalid payment signature!" });
    }
});

