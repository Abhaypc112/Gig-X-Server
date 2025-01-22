import { ObjectId } from "mongoose";

export interface IGigPricing extends Document {
  basic: {
    price: number;
    time: string;
  };
  standerd: {
    price: number;
    time: string;
  };
  premium: {
    price: number;
    time: string;
  };
}


export interface IGig extends Document {
    _id?:ObjectId;
    gigName?:string;
    gigDescription?:string;
    gigOwner?:ObjectId;
    gigCategory?:string;
    gigImages?:string[];
    gigPricing?:IGigPricing;
    gigSearchTags?:string;
    isBlock?:boolean;
    isActive?:boolean
  }