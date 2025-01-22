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
import { OAuth2Client } from 'google-auth-library';
import CustomError from './utils/customError';
import { config } from './config/config';
import { userSignup } from './controllers/authControllers';


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
app.use('/api',userRouter);

 
app.post("/api/auth/google", async (req, res) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const body = req.body;
    console.log(body)

    if (!body) {
      throw new CustomError("No google credentials provided!", 400);
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: body.credential,
      audience: config.GOOGLE_CLIENT_ID,
    });

    // Get payload from verified token
    const payload = ticket.getPayload() as any;

    // Now we can trust this data as it's verified by Google
    const {name,email,picture } = payload;
    const userData ={name,email,picture} as any
    userSignup(req,res,userData)
  } catch (error : any) {
    res.status(200).json({
      status: false,
      message: "Error occured!",
      errorMessage: error.message
    });
  }
});


app.use(errorHandler);

export default app;