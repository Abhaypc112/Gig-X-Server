import { IChat } from "../interface/chatInterface";
import Chat from "../models/chat";
import CustomError from "../utils/customError";


export const saveMessage = async (chatData : IChat) => {
  const chat = new Chat(chatData);
  await chat.save();
  return chat;
};

export const getChatHistory = async (user1: string, user2: string) => {
  const chat = await Chat.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 },
    ],
  }).sort({ timestamp: 1 });
  if(!chat) throw new CustomError("Messages not fount",400);
  return chat;
};
