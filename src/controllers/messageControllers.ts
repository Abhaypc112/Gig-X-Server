import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as messageService from '../services/messageServices';

export const getAllMessages = catchAsync(async(req:Request,res:Response) => {
    const {sender,receiver} = req.params;
    const messages = await messageService.getAllMessages(sender,receiver);
    res.status(200).json(messages)
});
export const postMessage = catchAsync(async(req:Request,res:Response) => {
    const {sender,receiver,content} = req.body;
    console.log(req.body)
    const message = await messageService.postMessage(sender,receiver,content);
    res.status(200).json(message)
});
export const getAllMessagesById = catchAsync(async(req:Request,res:Response) => {
    const {sender,receiver} = req.params;
    const messages = await messageService.getAllMessages(sender,receiver);
    res.status(200).json(messages)
});
