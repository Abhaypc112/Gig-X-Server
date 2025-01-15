import dotenv from 'dotenv';
dotenv.config();

// Config veriables
export const config = {
    SERVER_PORT : process.env.SERVER_PORT,
    MONGO_URI : process.env.MONGO_URI,
    EMAIL : process.env.EMAIL,
    APP_NAME : process.env.APP_NAME,
    APP_PASSWORD : process.env.APP_PASSWORD,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,

} 