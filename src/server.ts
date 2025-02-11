import { config } from './config/config';
import app from './app';
import {connectDB} from './config/db';

// Database connection
connectDB(); 
// Run Server
app.listen(config.SERVER_PORT,()=>console.log(`Server running on http://localhost:${config.SERVER_PORT}`)); 