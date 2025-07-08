import express from "express";
import { getUserData, editProfile } from "../controller/profile.js";
import authMiddleware from "../middleware/authMiddleware.js";
const profile = express.Router();

profile.get("/getUserData/:id", authMiddleware, getUserData);
profile.put("/editProfile/:id", authMiddleware, editProfile);

export default profile;