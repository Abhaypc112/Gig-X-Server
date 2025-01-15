import express,{ Request, Response, Router } from 'express';
import { freelancerLogin, otpGeneration, refreshToken, userLogin, userSignup ,googleCallback, userLogOut } from '../controllers/authControllers';
import passport from 'passport';

const authRouter : Router = express.Router();

authRouter.post('/user/otp',otpGeneration);
authRouter.post('/user/signup',userSignup);
authRouter.post('/user/refresh-token',refreshToken);
authRouter.post('/user/log-out',userLogOut);

authRouter.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback as any
);
authRouter.post('/freelancer/login',freelancerLogin);
authRouter.post('/user/login',userLogin);

export default authRouter;