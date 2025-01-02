import { Document } from "mongoose";

export interface IFreelancer extends Document {
    email: string;
    password: string;
    profileImg: string;
    googleId?: string;
    skills: string[];
    experience: string;
    role:string,
  }