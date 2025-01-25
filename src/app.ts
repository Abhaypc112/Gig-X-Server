import express,{Express,Request,Response} from 'express';
const app:Express = express();
import cors from 'cors'; 
import authRouter from './routes/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import adminRouter from './routes/adminRoutes';
import freelancerRouter from './routes/freelancerRoutes';
import userRouter from './routes/userRoutes';
import messageRouter from './routes/messageRoutes';
import { Server } from 'socket.io';
import http from "http";

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
  }));

app.use('/api',authRouter);
app.use('/api',adminRouter);
app.use('/api',freelancerRouter);
app.use('/api',userRouter);
app.use('/api',messageRouter);

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Frontend URL
//     methods: ["GET", "POST"],
//   },
// });

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