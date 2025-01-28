import { ObjectId } from "mongoose";

export interface IFreelancer extends Document {
    _id?:ObjectId;
    email: string;
    name:string;
    password: string;
    profileImg: string;
    description:string;
    languages:string[];
    isBlock:boolean;
    googleId?: string;
    skills: string[];
    experience: string;
    role:string;
  }