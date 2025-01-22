import mongoose, { Schema } from "mongoose";
import { IGig } from "../interface/gigInterface";

const gigPricingSchema : Schema = new Schema({
    basic: {
      price: { type: Number, required: true },
      time: { type: String, required: true },
    },
    standerd: {
      price: { type: Number, required: true },
      time: { type: String, required: true },
    },
    premium: {
      price: { type: Number, required: true },
      time: { type: String, required: true },
    },
  });

const gigScheema : Schema = new Schema (
    {
        gigName:{type: String, required:true},
        gigOwner:{type:mongoose.Schema.Types.ObjectId, required:true},
        gigCategory:{type: String, required:true},
        gigDescription:{type: String, required:true},
        gigImages:{type: [String], required:true},
        gigPricing:{type : gigPricingSchema, required:true},
        gigSearchTags:{type: String, required:true},
        isBlock:{type: Boolean, default:false},
        isActive:{type:Boolean, default:true},
    },
    { timestamps: true }
)

const Gig = mongoose.model <IGig> ("Gig",gigScheema);
export default Gig;