import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interface/orderInterface";

const gigPlanScheema : Schema = new Schema({
    plan:{type:String, required:true},
    price:{type:Number, requied:true},
    time:{type:String, required:true}
})

const orederScheema : Schema = new Schema({
        gigId:{type:mongoose.Schema.Types.ObjectId, required:true},
        userId:{type:mongoose.Schema.Types.ObjectId, required:true},
        gigPlan:{type:gigPlanScheema, required:true},
        paymentStatus:{type:Boolean,default:false},
        orderStatus:{type:Boolean,default:false},
   },
   { timestamps: true }
)

const Order = mongoose.model <IOrder> ('Order',orederScheema);
export default Order;