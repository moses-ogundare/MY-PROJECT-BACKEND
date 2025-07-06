// user registration controller
import AuthModel from "../models/authSchema.js";
import JsonWebTokenError from "jsonwebtoken";
import bcrypt from "bcryptjs";

// user registration controller
const register = async (req, res) =>{
    const salt = 10
    try {
        const {name,email,password,role} =req.body;

        if (!name ||!email||!password||!role) {
            return res.status(400).json({message:"All fields are required"});

        }
        // check if user already exixts
        const existUser = await AuthModel.findone(email)

        if(existUser){
            return res.status(400).json({message:"user already exists"});
        }
        // hash password

        const hashPassword = await bcrypt.hash(password, salt );

        // create user

        const user = new AuthModel({
            name,
            email,
            password:hashPassword,
            role
        })
        // save user to database
       await user.save();

       // generate token
       const token = jwt.sign ({id:user_id}, process.env.JWT_SECRETKEY, {
        expiresIn:"3d"

       })
       res.cookie("token",token, {
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
       })
       
    
       
       


        
    } catch (error) {
        console.log(error)

    }

}

// user registration controller
const login = async (req, res) =>{
    try {
        
    } catch (error) {
        console.log(error)

    }

}

export{register, login};