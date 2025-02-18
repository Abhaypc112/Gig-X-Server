import express,{ Request, Response, Router } from 'express';
import { freelancerLogin, otpGeneration, refreshToken, userLogin, userSignup , userLogOut, googleAuth } from '../controllers/authControllers';

const authRouter : Router = express.Router();

authRouter.post('/user/otp',otpGeneration);
authRouter.post('/user/signup',userSignup);
authRouter.post('/user/refresh-token',refreshToken);
authRouter.post('/user/log-out',userLogOut);
authRouter.post('/auth/google',googleAuth);
authRouter.post('/freelancer/login',freelancerLogin);
authRouter.post('/user/login',userLogin);

export default authRouter;