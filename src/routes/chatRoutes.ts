import express,{ Router } from "express";
import { fetchChatHistory, saveMessage } from "../controllers/chatController";

const chatRouter : Router = express.Router();

chatRouter.get("/chat/:user1/:user2", fetchChatHistory); 
chatRouter.post("/chat/save-message", saveMessage); 

export default chatRouter;