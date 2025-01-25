import express,{Router} from 'express';
import { addCategory, adminGetAllOrders, blockGig, blockUser, deleteCategory, editCategory, getAllCategory, getAllGigs, getAllUsers } from '../controllers/adminControllers';
import { adminAuth } from '../middlewares/adminAuth';
import upload from '../utils/cloudinary';

const adminRouter : Router = express.Router();

adminRouter.get('/admin/get-all-users',adminAuth,getAllUsers);
adminRouter.patch('/admin/block-user',adminAuth,blockUser);
adminRouter.get('/admin/get-all-gigs',adminAuth,getAllGigs);
adminRouter.patch('/admin/block-gig',adminAuth,blockGig);
adminRouter.post('/admin/add-category',adminAuth,upload.single('image'),addCategory);
adminRouter.get('/admin/get-all-category',adminAuth,getAllCategory);
adminRouter.patch('/admin/edit-category',adminAuth,upload.single('image'),editCategory);
adminRouter.delete('/admin/delete-category/:categoryId',adminAuth,deleteCategory);
adminRouter.get('/admin/get-all-orders',adminAuth,adminGetAllOrders);

export default adminRouter; 