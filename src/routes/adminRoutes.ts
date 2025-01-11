import express,{Router} from 'express';
import { getAllUsers, updateUser } from '../controllers/adminControllers';
import { adminAuth } from '../middlewares/adminAuth';

const adminRouter : Router = express.Router();

adminRouter.get('/admin/get-all-users',adminAuth,getAllUsers);
adminRouter.patch('/admin/update-user',adminAuth,updateUser);

export default adminRouter; 