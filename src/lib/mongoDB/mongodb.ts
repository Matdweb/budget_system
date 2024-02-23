import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || "");
        console.log("Successfully connected to MongoDB");
    } catch (e) {
        console.log("There was an error connecting to MongoDB: ", e);
    }
}