import { ObjectId } from "mongoose";

export interface IReview extends Document {
    rating:number;
    userId:ObjectId;
    gigId:ObjectId;
    comment:string;
}