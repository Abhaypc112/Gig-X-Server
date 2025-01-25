import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interface/messageInterface";

const messageSchema : Schema = new Schema({
  sender: { type:mongoose.Schema.Types.ObjectId, required: true },
  receiver: { type:mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model <IMessage> ('Message',messageSchema)
export default Message;