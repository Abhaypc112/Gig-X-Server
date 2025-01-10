import express,{Express,Request,Response} from 'express';
const app:Express = express();
import cors from 'cors'; 
import authRouter from './routes/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
import { config } from './config/config';
import passport from 'passport';
import session from 'express-session';

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
  }));
  app.use(passport.initialize());

app.use('/api',authRouter);

app.use(errorHandler);

export default app;