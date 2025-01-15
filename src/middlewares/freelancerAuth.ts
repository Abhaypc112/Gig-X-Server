import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import CustomError from "../utils/customError";

export const freelancerAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) throw new CustomError("Access denied, token missing!",400);
  const JWT_SECRET_KEY = config.JWT_SECRET_KEY;
  if(!JWT_SECRET_KEY) throw new CustomError("Key missing !",400)
  try{
      const verified = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
      if (verified.role === "freelancer") {
        req.user = verified;
        next();
      } else {
        throw new CustomError("User not authorized!", 401);
      }
  }catch(error){
      res.status(401).json({ message: 'Invalid token' });
  }
}
