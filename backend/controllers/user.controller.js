import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error getUserProfile ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const followunfollowUser = async (req, res)=>{
   
    try{
        const {id} =req.params;
        const userToModify = await User.findById(id)
        const currentuser = await User.findById(req.user._id);

        if(id === req.user._id.toString()){
            return res.status(400).json({ message: "You cannot follow/unfollow yourself " }); 
        }

        if(!userToModify || !currentuser){
            return res.status(400).json({ message: "User Not Found" }); 
        }

        const isFollowing = currentuser.followers.includes(id);

        if(isFollowing){
            //Unfollow the user
            await User.findByIdAndUpdate(id, {$pull :{ followers : req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$pull :{ following : id}});
            return res.status(200).json({ message: "User Unfollowed successfully" }); 
            
        }
        else{
            //follow the user
            await User.findByIdAndUpdate(id, {$push :{ followers : req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$push :{ following : id}});

            const newNotification = new Notification({
              type:"follow",
              from:req.user._id,
              to:userToModify._id
            });
            await newNotification.save();
            res.status(200).json("User Followed Successfully")
            


        }
    }
    catch(error){
        console.log(`Error in followunfollowuser ${error.message}`);
        res.status(500).json({ error: error.message });        
    }

}

export const getSuggestedUsers = async (req, res)=>{
  try{
    const userid = req.user._id;

    const usersFollowedByMe = await User.findById(userid).select("following")
    const  users = await User.aggregate([
      {
        $match:{
          _id:{$ne:userid}
        }
      },
      {$sample: {size:10}}
    ])
    const filterUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id))
    const suggestedUser = filterUsers.slice(0,4);

    suggestedUser.forEach((user)=>(user.password = null));

    res.status(200).json(suggestedUser);
  }
  catch(error){
    console.log(`Error in getsuggesteduser ${error.message}`);
    res.status(500).json({ error: error.message });        
    
  }
}

export const updateUser = async (req, res)=>{
  const {fullname ,email, username,currentPassword, newPassword, bio , link } = req.body;
  let {profileImg, coverImg} = req.body;

  const userId = req.user._id;

  try{
    let user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    if(!newPassword && !currentPassword || !currentPassword && !newPassword){
      return res.status(400).json({error:"Please provide both current and new password"})
    }

    if(currentPassword && newPassword){
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if(!isMatch){
        return res.status(400).json({error:"Current Password is Incorrect"})
      }
      if(newPassword.length <6){
      return res.status(400).json({error:"Password must be atleast 6 charecters long"})
        
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt)

    }

    if(profileImg){
      if(user.profileImg){
        await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
      }
     const uploadedResponse = await cloudinary.uploader.upload(profileImg)
     profileImg =uploadedResponse.secure_url;
    }

    if(coverImg){
      if(user.coverImg){
        await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverImg)
      coverImg =uploadedResponse.secure_url;      
    }

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg= coverImg || user.coverImg;

    await user.save();
     user.password =null
    return res.status(200).json(user);

  }
  catch(error){

  }
  
}