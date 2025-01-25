import express, { Router } from 'express';
import { userAuth } from '../middlewares/userAuth';
import { getAllMessages, postMessage } from '../controllers/messageControllers';
const messageRouter : Router = express.Router();

messageRouter.get('/messages/:sender/:receiver',getAllMessages);
messageRouter.post('/post-message',postMessage);

export default messageRouter;