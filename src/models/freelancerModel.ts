import mongoose, { Schema, Document } from 'mongoose';

export interface IFreelancer extends Document {
  email: string;
  password: string;
  profileImg: string;
  googleId?: string;
  skills: string[];
  experience: string;
}

const FreelancerSchema : Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String},
    googleId: { type: String },
    skills: { type: [String], required: true },
    experience: { type: String, required: true },
  },
  { timestamps: true }
);

const Freelancer = mongoose.model <IFreelancer> ('Freelancer', FreelancerSchema);
export default Freelancer;
