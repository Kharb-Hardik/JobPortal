const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role } = req.body;
        if (!name || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                success: false,
                message: "Content is missing"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }

        const hashpass = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashpass,
            phoneNumber,
            role
        });

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

exports.login= async (req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email||!password||!role){
            return res.status(400).json({
                success:false,
                message:"Content is missing"
            })
        }

        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist"
            })
        }
        const ispasswordMatch= await bcrypt.compare(password,user.password);
        if(!ispasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Email or Password is invalid"
            })
        }
        if(role!==user.role){
            return res.status(400).json({
                success:false,
                message:"Account does not exist with current role"
            })
        }

        const tokenData={
            userId: user._id
        }

        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*100,sameSite:'Strict',httpsonly:true}).json({
            success:true,
            message:`Welcome ${user.name}`,
            user
        })
    }catch(err){
        console.log(err);
    }
}

exports.logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"Logged out Successfully"
        })
    }catch(err){
        console.log(err);
    }
}

exports.updateProfile = async (req, res) => {
    try {
      const { name, email, phoneNumber, bio, skills } = req.body;
      const userId = req.id; // Make sure req.id is correct
  
      let user = await User.findById(userId); // Fetch user by ID
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found"
        });
      }
  
      // Update fields if provided
      if (name) user.name = name;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skills) {
        user.profile.skills = skills.split(",");
      }
  
      await user.save(); // Save the updated user
  
      // Send response
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };
  