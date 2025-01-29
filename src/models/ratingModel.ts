import mongoose, { model, Schema } from "mongoose";
import { IReview } from "../interface/ratingInterface";

const reviewScheema:Schema = new Schema({
    rating:{type:Number, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    gigId:{type:mongoose.Schema.Types.ObjectId, required:true},
    comment:{type:String, required:true}
},
{ timestamps: true }
);

const Review = mongoose.model <IReview> ('Review',reviewScheema);
export default Review;