import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDb from "./config/Mongodb.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import profileRoutes from "./routes/profile.js";
import mentorRoutes from "./routes/mentorRoutes.js";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
 

// Middlewares
app.use(express.json());
app.use(cookieParser())

const allowOrigin =["https://my-project-frontend-one.vercel.app","http://localhost:5173"]
app.use(cors({
  origin:allowOrigin,
  credentials:true,
  methods:["GET", "POST", "PUT", "DELETE"],
  allowedHeaders:["content-type", "Authorization"]
}))

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/", mentorRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Mentorship Platform API");
});

// Connect to DB 
connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server running on port ");
  });
}).catch((err) => {
  console.error(" MongoDB connection failed:", err.message);
});
