import mongoose, { Schema, Document } from 'mongoose';
import { IFreelancer } from '../interface/freelancerInterface';



const FreelancerSchema : Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String},
    googleId: { type: String },
    skills: { type: [String], required: true },
    experience: { type: String, required: true },
    role: {type: String, required: true, default:"freelancer"},
  },
  { timestamps: true }
);

const Freelancer = mongoose.model <IFreelancer> ('Freelancer', FreelancerSchema);
export default Freelancer;
