import express,{ Router } from "express";
import { freelancerAuth } from "../middlewares/freelancerAuth";
import { freelancerCreateGig, freelancerEditGig, freelancerGetAllGigs, freelancerUpdateGigStataus } from "../controllers/freelancerControllers";
import upload from "../utils/cloudinary";

const freelancerRouter : Router = express.Router();

freelancerRouter.post('/freelancer/create-gig',freelancerAuth,upload.array('gigImages'),freelancerCreateGig);
freelancerRouter.post('/freelancer/edit-gig',freelancerAuth,upload.array('gigImages'),freelancerEditGig);
freelancerRouter.get('/freelancer/get-all-gigs',freelancerAuth,freelancerGetAllGigs);
freelancerRouter.patch('/freelancer/update-gig-status',freelancerAuth,freelancerUpdateGigStataus);

export default freelancerRouter;