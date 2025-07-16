import AuthModel from "../models/authSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// User registration controller
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existUser = await AuthModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user instance
    const user = new AuthModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const secretKey = process.env.JWT_SECRETKEY;
    if (!secretKey) {
      throw new Error("JWT_SECRETKEY is not defined in .env");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      secretKey,
      { expiresIn: "3d" }
    );

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    // Send success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// User login controller
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate fields
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Find user
      const user = await AuthModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRETKEY,
        { expiresIn: "3d" }
      );
  
      // Set cookie with token
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      });
  
      // Respond with user info
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  // user logout controller
  const logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
  
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Server error during logout" });
    }
  };
  // users data
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
  
const editProfile = async (req, res) => {
  try {
    const { bio, skills, goals, availability } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { profile: { bio, skills, goals, availability } },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

  

export { register, login,logout,getUserData, editProfile};
