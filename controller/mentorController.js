import bcrypt from "bcryptjs";
import MentorModel from "../models/mentorSchema.js";

const addMentor = async (req, res) => {
    const salt = 10;


    try {
       const { name, email, availability, bio, topic, password} = req.body;
          const hashPassword = await bcrypt.hash(password, 10);
       const mentor = new MentorModel({
           name,
           email,
           password: hashPassword,
           availability, bio, topic,
       })
       
       await mentor.save()
       return res.status(200).json({
           message: "Mentor added successfully"
       });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}
const BookSession = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const getMentor = async (req, res) => {
    try {

        const Mentor = await MentorModel.find()
        res.status(200).json(Mentor)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}
 export {addMentor, BookSession, getMentor}