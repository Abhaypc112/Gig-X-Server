import express,{ Router } from 'express';
import { adminLogin, freelancerLogin, otpGeneration, refreshToken, userLogin, userSignup } from '../controllers/authControllers';
import passport from 'passport';
const authRouter : Router = express.Router();

authRouter.post('/user/otp',otpGeneration);
authRouter.post('/user/signup',userSignup);
authRouter.post('/user/refresh-token',refreshToken);

authRouter.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/callback',passport.authenticate('google', {
      failureRedirect: '/login',
      session: true,
    }),
    (req, res) => {
      res.redirect('/dashboard'); 
    }
  );
authRouter.post('/freelancer/login',freelancerLogin);
authRouter.post('/user/login',userLogin);

export default authRouter;