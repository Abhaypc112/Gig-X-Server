import experss,{Router} from 'express';
import { userAuth } from '../middlewares/userAuth';
import { addGigRating, createOrder, editUser, getGigReviewById, getOrdersByUserId, getUser, razorpayCreateOrder, razorpayVerification, userGetAllCategorys, userGetAllGigs } from '../controllers/userController';
import upload from '../utils/cloudinary';

const userRouter : Router = experss.Router();

userRouter.get('/user/get-all-category',userAuth,userGetAllCategorys);
userRouter.get('/user/get-all-gigs',userAuth,userGetAllGigs);
userRouter.post('/user/create-order',userAuth,createOrder);
userRouter.get('/user/get-orders-by-userId',userAuth,getOrdersByUserId);

userRouter.post('/payment/create-order',userAuth,razorpayCreateOrder);
userRouter.post('/payment/verify',userAuth,razorpayVerification);
userRouter.post('/user/create-review',userAuth,addGigRating);
userRouter.get('/user/get-review-by/:gigId',userAuth,getGigReviewById);
userRouter.patch('/user/edit-user',userAuth,upload.single('profileImg'),editUser);
userRouter.get('/user/get-data',userAuth,getUser);

export default userRouter;