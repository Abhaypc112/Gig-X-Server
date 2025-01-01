import express,{Express,Request,Response} from 'express';
const app:Express = express();
import cors from 'cors'; 
import authRouter from './routes/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
  }));

app.use('/api',authRouter);

app.use(errorHandler);

export default app