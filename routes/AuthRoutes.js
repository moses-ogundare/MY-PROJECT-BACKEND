import express from "express";
import { register, login, logout, getUserData, editProfile }from "../controller/authController.js";

const AuthRoutes = express.Router();


// user registration
AuthRoutes.post("/register", register );
// user login
AuthRoutes.post("/login",login);
// user logout
AuthRoutes.post("/logout", logout);
// users data
AuthRoutes.get("/getUserData/:id",getUserData);
// edit user profile
AuthRoutes.put("/editProfile/:id", editProfile);


export default AuthRoutes;