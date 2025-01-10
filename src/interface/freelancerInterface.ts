import { ObjectId } from "mongoose";

export interface IFreelancer extends Document {
    _id?:ObjectId;
    email: string;
    name:string;
    password: string;
    profileImg: string;
    googleId?: string;
    skills: string[];
    experience: string;
    role:string,
  }