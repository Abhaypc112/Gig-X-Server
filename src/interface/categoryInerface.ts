import { Document } from "mongoose";

export interface ICategory extends Document {
    gigCategory?:string;
    image:string;
    isActive : boolean;
  }