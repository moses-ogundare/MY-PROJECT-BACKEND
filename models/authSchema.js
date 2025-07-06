import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name:{type:String, require:true },
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true, unique:true},
    role:{type:String, require:true,
        enum:["admin","mentor","mentee"],
        default:"mentee"
    },

} , {timestamps:true},
    {minimize: false},

)

const AuthModel = mongoose.model.users||mongoose.model("user", authSchema);
export default AuthModel;
