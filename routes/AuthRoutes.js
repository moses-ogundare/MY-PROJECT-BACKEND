import { register } from "../controller/authController.js";
import express from "express"
const AuthRoutes = express.gRoutes()

// user registration
AuthRoutes.post("/register", register )


export default AuthRoutes;