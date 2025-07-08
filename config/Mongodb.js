import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// database connection
const connectDb = async () => {
    try {

        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        })


        const uri = `${process.env.MONGODB_URL}MentorshipProject`;
        console.log(uri);
        await mongoose.connect(uri);
        console.log("database connected successfully");
    } catch (error) {
        console.log(error)

    }
}
export default connectDb;