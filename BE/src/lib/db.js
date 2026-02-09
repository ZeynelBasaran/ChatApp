import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connection Success: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Hata: ${error.message}`);
        // Stop the application if the connection fails.
        process.exit(1);
    }
};

