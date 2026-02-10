import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {

        const { MONGO_URI } = ENV;
        if (!MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }

        const conn = await mongoose.connect(ENV.MONGO_URI);

        console.log(`MongoDB Connection Success: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Hata: ${error.message}`);
        // Stop the application if the connection fails.
        process.exit(1);
    }
};

