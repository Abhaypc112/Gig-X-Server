import express from "express";
import CustomError from "./customError";
import {OAuth2Client} from "google-auth-library";
import dotenv from 'dotenv';
dotenv.config();
const app = express();


const googleAuth = () => {
  
app.post("/api/auth/google", async (req, res) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const body = req.body;

    if (!body) {
      throw new CustomError("No google credentials provided!", 400);
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: body.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket)

    // Get payload from verified token
    const payload = ticket.getPayload() as any;

    // Now we can trust this data as it's verified by Google
    const { email } = payload;

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      data: email,
    });
  } catch (error : any) {
    res.status(200).json({
      status: false,
      message: "Error occured!",
      errorMessage: error.message
    });
  }
});

}
export default googleAuth;