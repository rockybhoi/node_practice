import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URL);
        const connectDBConfig = await mongoose.connect(`${process.env.MONGO_URL}${DB_NAME}`);
        console.log(`MongoDB connected: ${connectDBConfig.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;