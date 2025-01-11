import { Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  name: string;
  password: string;
  profileImg: string;
  isBlock:boolean;
  googleId?: string;
  role: string;
}
