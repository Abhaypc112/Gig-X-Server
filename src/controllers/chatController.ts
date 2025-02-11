import { Request, Response } from "express";
import { getChatHistory } from "../services/chatServices";
import catchAsync from "../utils/catchAsync";
import *as chatService from '../services/chatServices';

export const fetchChatHistory = catchAsync(async(req: Request, res: Response) => {
      const { user1, user2 } = req.params;
      const chats = await getChatHistory(user1, user2);
      res.json(chats);
  })
export const saveMessage = catchAsync(async(req: Request, res: Response) => {
      const chats = await chatService.saveMessage(req.body);
      res.json(chats); 
  })