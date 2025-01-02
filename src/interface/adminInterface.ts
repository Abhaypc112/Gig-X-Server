import { Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  profileImg: string;
  googleId?: string;
  role: string;
}
