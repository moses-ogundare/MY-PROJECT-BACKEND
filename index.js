import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDb from "./config/Mongodb.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import profileRoutes from "./routes/profile.js";


const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", AuthRoutes)
app.use("/api/profile", profileRoutes)
// connecting to database

app.get("/", (req, res) => {
    res.send("Welcome to the Mentorship Platform API");
});

connectDb();

app.listen(8000, async () => {
    // connecting to database
    await connectDb();
    console.log("server is running")
});
