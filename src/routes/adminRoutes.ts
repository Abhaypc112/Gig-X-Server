import express,{Router} from 'express';
import { blockGig, blockUser, getAllGigs, getAllUsers } from '../controllers/adminControllers';
import { adminAuth } from '../middlewares/adminAuth';

const adminRouter : Router = express.Router();

adminRouter.get('/admin/get-all-users',adminAuth,getAllUsers);
adminRouter.patch('/admin/block-user',adminAuth,blockUser);
adminRouter.get('/admin/get-all-gigs',adminAuth,getAllGigs);
adminRouter.patch('/admin/block-gig',adminAuth,blockGig);

export default adminRouter; 