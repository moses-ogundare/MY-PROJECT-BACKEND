import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// database connection
const connectDb = async () => {
    try {

        mongoose.connection.on("error" , (error)=>{
            console.error("MongoDB connection error:", error);
        })
        

        const url = `${process.env.MONGODB_URL}MentorshipProject`;
        console.log(url);
        await mongoose.connect(url);
        console.log("database connected successfully");
   }catch (error){
      console.log(error)

   }
}
export default connectDb;