import mongoose, { Schema, Document } from 'mongoose';
import { IFreelancer } from '../interface/freelancerInterface';



const FreelancerSchema : Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    password: { type: String, },
    profileImg: { type: String},
    isBlock: { type: Boolean, default:false},
    googleId: { type: String },
    skills: { type: [String] },
    experience: { type: String },
    role: {type: String, required: true, default:"freelancer"},
  },
  { timestamps: true }
);

const Freelancer = mongoose.model <IFreelancer> ('Freelancer', FreelancerSchema);
export default Freelancer;
