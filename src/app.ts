import express,{Express,Request,Response} from 'express';
const app:Express = express();
import cors from 'cors'; 
import authRouter from './routes/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import adminRouter from './routes/adminRoutes';
import freelancerRouter from './routes/freelancerRoutes';

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
app.use('/api',adminRouter);
app.use('/api',freelancerRouter);

app.use(errorHandler);

export default app;