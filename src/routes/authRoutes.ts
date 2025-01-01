import express,{ Router } from 'express';
import { adminLogin, freelancerLogin, otpGeneration, userLogin, userSignup } from '../controllers/authControllers';
const authRouter : Router = express.Router();

authRouter.post('/user/otp',otpGeneration);
authRouter.post('/user/signup',userSignup);

authRouter.post('/admin/login',adminLogin);
authRouter.post('/freelancer/login',freelancerLogin);
authRouter.post('/user/login',userLogin);

export default authRouter;