import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

interface ExtendedParams {
    folder?: string;
    allowed_formats?: string[];
  }

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_SECRET_KEY,
  });
  
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gig-x', 
    allowed_formats: ['jpeg', 'png', 'jpg'],
  }as ExtendedParams,
});

const upload = multer({ storage });

export default upload;
