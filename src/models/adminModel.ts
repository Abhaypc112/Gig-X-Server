import mongoose, { Schema, Document } from 'mongoose';
import { IAdmin } from '../interface/adminInterface';

const AdminSchema : Schema = new Schema(
  {
    name: { type: String,},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String},
    isBlock: { type: Boolean, default:false},
    googleId: { type: String },
    role: { type: String, required: true, default: 'admin' },
  },
  { timestamps: true }
);

const Admin = mongoose.model <IAdmin> ('Admin', AdminSchema);
export default Admin;
