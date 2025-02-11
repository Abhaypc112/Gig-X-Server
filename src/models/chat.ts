import mongoose, { Schema, Document } from "mongoose";
import { IChat } from "../interface/chatInterface";

const ChatSchema: Schema = new Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
