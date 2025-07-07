import AuthModel from "../models/authSchema.js";
const getUserData = async(req, res)=>{
    try {
        const {id} = req.params;
        
        const UserData = await AuthModel.findById(id).select("-password");
        if (!UserData) {
          return res.status(404).json({message: "user not found"});
        }

        return res.status(200).json({UserData});
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "server error"});
        
    }
  } 

  const editProfile = async (req, res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message: "id is required"});
        }
        const {name, email, bio, skills, goal} = req.body;

        const user = await AuthModel.findById(id);
        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.skills = skills || user.skills;
        user.goal = goal || user.goal;

        await user.save();

        return res.status(200).json({message: "Profile updated successfully, user"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "server error"});
    }

}

export { getUserData, editProfile };
