import { register ,login} from "../controller/authController.js";
import express from "express";
const AuthRoutes = express.Router();


// user registration
AuthRoutes.post("/register", register )


export default AuthRoutes;