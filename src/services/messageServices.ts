import mongoose from "mongoose";
import { IMessage } from "../interface/messageInterface";
import Message from "../models/messageInterface";
import CustomError from "../utils/customError";

export const getAllMessages = async (sender : string, receiver : string): Promise <IMessage[]> =>  {
    const messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      }).sort({ timestamp: 1 });
      if(!messages) throw new CustomError("Messages Not Fount !",400);
      return messages
}
export const postMessage = async (sender: string, receiver: string, content: string): Promise<IMessage> => {
    const message = new Message({ sender, receiver, content });
    return await message.save();
  };
export const getMessageUser = async (): Promise<any> => {
    const userId = "6788e1770cd2e8868ca44637"
    const users = await Message.aggregate([
        {
            $match: {
              $or: [
                { sender: new mongoose.Types.ObjectId(userId) }, // Check if the user is a sender
                { receiver:new mongoose.Types.ObjectId(userId) } // Check if the user is a receiver
              ]
            }
        },
            {
                $project:{
                    senderId:"$sender",
                    receiverId:"$receiver"
                }
            },
            {
                $group:{
                    _id:"$receiverId" 
                }
            }
      ]);
      console.log(users)
      return users
  };
