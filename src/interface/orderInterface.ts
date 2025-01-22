import { ObjectId } from "mongoose";

export interface IGigPlan {
    plan : string;
    price : number;
    time : string;
}

export interface IOrder {
    _id:ObjectId;
    userId : Object;
    gigId : Object;
    gigPlan : IGigPlan;
    paymentStatus : boolean;
    orderStatus : boolean;
}