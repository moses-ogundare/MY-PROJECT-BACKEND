import express from "express";
import { getUserData, editProfile } from "../controller/Profile.js";
const profileRoutes = express.Router();

profileRoutes.get("/getUserData/:id", getUserData);
profileRoutes.put("/editProfile/:id",  editProfile);

export default profileRoutes;