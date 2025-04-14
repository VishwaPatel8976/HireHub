import mongoose from "mongoose";
import dotenv from "dotenv";
import { EventEmitter } from "events";

dotenv.config();

// Increase the limit of listeners for the EventEmitter
EventEmitter.defaultMaxListeners = 20;

//Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);  
    }
}
export default connectDB;

