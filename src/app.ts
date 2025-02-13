import express,{Express,Request,Response} from 'express';
const app:Express = express();
import cors from 'cors'; 
import authRouter from './routes/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/adminRoutes';
import freelancerRouter from './routes/freelancerRoutes';
import userRouter from './routes/userRoutes';
import messageRouter from './routes/messageRoutes';
import { Server } from 'socket.io';
import chatRouter from './routes/chatRoutes';
import http from "http";
import { saveMessage } from './services/chatServices';
import { IChat } from './interface/chatInterface';

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin:"https://gig-x.netlify.app/",
    credentials:true
  }));

app.use('/api',authRouter);
app.use('/api',adminRouter);
app.use('/api',freelancerRouter);
app.use('/api',userRouter);
app.use('/api',messageRouter);
app.use('/api',chatRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    const chatData = {senderId, receiverId, message} as IChat
    console.log(chatData,"set")
    const savedMessage = await saveMessage(chatData);
    io.emit("receiveMessage", savedMessage); // Broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("joinRoom", ({ room }) => {
//     socket.join(room);
//     console.log(`User joined room: ${room}`);
//   });

//   socket.on("chatMessage", (message) => {
//     const { room, sender, receiver, content } = message;
//     io.to(room).emit("message", { sender, receiver, content });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });


app.use(errorHandler);

export default app;