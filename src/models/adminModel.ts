import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
  profileImg: string;
  googleId?: string;
  role: string;
}

const AdminSchema : Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String},
    googleId: { type: String },
    role: { type: String, required: true, default: 'admin' },
  },
  { timestamps: true }
);

const Admin = mongoose.model <IAdmin> ('Admin', AdminSchema);
export default Admin;
