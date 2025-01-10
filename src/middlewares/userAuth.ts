import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { config } from "../config/config";
import CustomError from "../utils/customError";

export const userAuth = catchAsync((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied, token missing!" });
    const JWT_SECRET_KEY = config.JWT_SECRET_KEY;
    if(!JWT_SECRET_KEY) throw new CustomError("Key missing !",401)
    try {
      const verified = jwt.verify(token,JWT_SECRET_KEY) as JwtPayload;
      if (verified.role === "user") {
        req.user = verified;
        next();
      } else {
        throw new CustomError("User not authorized!", 401);
      }
    } catch (error) {
      throw new CustomError("Invalid token!", 401);
    }
  }
);
