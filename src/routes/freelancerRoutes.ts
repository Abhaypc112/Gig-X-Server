import express,{ Router } from "express";
import { freelancerAuth } from "../middlewares/freelancerAuth";
import { freelancerCreateGig, freelancerDeleteGig, freelancerEditById, freelancerEditGig, freelancerGetAllCaregory, freelancerGetAllGigs, freelancerGetById, freelancerGetOrdersById, freelancerUpdateGigStataus } from "../controllers/freelancerControllers";
import upload from "../utils/cloudinary";

const freelancerRouter : Router = express.Router();

freelancerRouter.post('/freelancer/create-gig',freelancerAuth,upload.array('gigImages'),freelancerCreateGig);
freelancerRouter.post('/freelancer/edit-gig',freelancerAuth,upload.array('gigImages'),freelancerEditGig);
freelancerRouter.get('/freelancer/get-all-gigs',freelancerAuth,freelancerGetAllGigs);
freelancerRouter.patch('/freelancer/update-gig-status',freelancerAuth,freelancerUpdateGigStataus);
freelancerRouter.patch('/freelancer/delete-gig',freelancerAuth,freelancerDeleteGig);
freelancerRouter.get('/freelancer/get-all-category',freelancerAuth,freelancerGetAllCaregory);
freelancerRouter.get('/freelancer/get-all-orders',freelancerAuth,freelancerGetOrdersById);
freelancerRouter.get('/freelancer/get-by-id',freelancerAuth,freelancerGetById);
freelancerRouter.patch('/freelancer/edit-by-id',freelancerAuth,upload.single('profileImg'),freelancerEditById);

export default freelancerRouter;